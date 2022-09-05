<template>
  <div class="pixiv-painter">
    <PixivCircleBack right="80px" />
    <transition enter-active-class="animate__fadeIn">
      <div v-if="!pending" class="pixiv-painter__content">
        <div class="cover">
          <BaseImg :src="painter.avatar" />
        </div>
        <div class="user">
          <BaseImg class="user-avatar" :src="painter.avatar" />
          <div class="user-info">
            <h1>{{ painter.name }}</h1>
            <p>{{ painter.desc }}</p>
          </div>
        </div>
        <PixivGridBooth :request="fetchPainterOpus" class="booth" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import * as Api from '@apis/index'
import { onActivated, onDeactivated, reactive, ref } from 'vue'
import PixivCircleBack from '../../component/PixivCircleBack.vue'
import PixivGridBooth from '../../component/PixivGridBooth.vue'

// const emit = defineEmits<{}>()
const props = withDefaults(
  defineProps<{
    id: string
  }>(),
  {}
)

const pending = ref(true)

const painter: Api.VilipixerInfo = reactive({
  avatar: '',
  name: '',
  desc: ''
})

const fetchPainterOpus = async (tpage: number, size: number) => {
  const { list, total } = await Api.vilipixerSearch({
    painterId: props.id,
    limit: size,
    offset: --tpage * size
  })
  return {
    list: list.map((item) => ({
      cover: item.preurl,
      id: item.id,
      w: item.w,
      h: item.h
    })),
    total
  }
}

onActivated(async () => {
  const data = await Api.getVilipixerInfo(props.id)
  if (data) {
    painter.avatar = data.avatar
    painter.name = data.name
    painter.desc = data.desc
    pending.value = false
  }
})
onDeactivated(() => {
  pending.value = true
})
</script>
<style lang="less" scoped>
.pixiv-painter {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 666;
  border-top-left-radius: var(--df-radius);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 90vh;
    background: var(--box-bg-color);
    border-radius: var(--df-radius);
    overflow: hidden;
    animation-duration: 0.25s;

    .cover {
      width: 100%;
      aspect-ratio: 7/1;
      overflow: hidden;
      box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.399);

      img {
        width: 100%;
        height: 100%;
        filter: blur(3px);
      }
    }

    .user {
      @pad: 20px;
      width: 100%;
      padding: 0 100px;
      display: flex;
      box-sizing: border-box;
      gap: @pad;

      &-avatar {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        transform: translateY(-30%);
        border: 3px solid var(--box-bg-color);
      }

      &-info {
        flex: 1;
        padding-top: @pad;
        overflow: hidden;

        h1 {
          font-size: 24px;
          line-height: 28px;
        }

        p {
          padding-top: 12px;
          font-size: 14px;
          color: var(--font-unactive-color);
        }
      }
    }

    .booth {
      flex: 1;
      padding: 20px 40px;
      box-sizing: border-box;
    }
  }
}
</style>
