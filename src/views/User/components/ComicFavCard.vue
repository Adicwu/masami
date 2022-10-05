<template>
  <AwDrag
    v-if="detail"
    class="comic-fav-card"
    :draggable="true"
    :data-comicid="id"
    group-key="ComicFavCard"
    :self-key="id"
    @ex-change="posExchange"
  >
    <div class="cover">
      <BaseImg :src="detail.comicCover" />
      <Icon name="play" @click="toComicMain(detail!.comicId)" />
    </div>
    <div class="info">
      <el-tooltip effect="light" :content="detail.comicName">
        <p>{{ detail.comicName }}</p>
      </el-tooltip>
      <span>{{ comicUpdateInfo }}</span>
      <!-- <span>收藏时间：{{ showDate }}</span> -->
    </div>
    <div class="tools">
      <Icon
        class="tools-icon"
        name="icon_love_hover"
        title="取消收藏"
        @click="deleteFav"
      />
      <!-- 太卡了 -->
      <!-- <el-dropdown>
        <Icon class="tools-icon" name="more" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="deleteFav">取消收藏</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
  </AwDrag>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import moment from 'moment'

import { AwDrag, AwDragExchangeParam } from 'sorarain'

import { ComicFavItem } from '@/class/comicFav.class'
import { toComicMain } from '@/router/jump'
import { useFavStore } from '@/stores/fav.store'
import { useComicUpdate } from '@/stores/comicUpdate.store'

export default defineComponent({
  name: 'ComicFavCard',
  components: {
    AwDrag
  },
  props: {
    detail: {
      type: Object as PropType<null | ComicFavItem>,
      default: null
    },
    id: {
      type: [Number, String],
      default: -1
    }
  },
  setup(props) {
    const favStore = useFavStore()
    const comicUpdate = useComicUpdate()

    const showDate = computed(() =>
      moment(props.detail?.favDate).format('YYYY-MM-DD')
    )
    const comicUpdateInfo = computed(() => {
      const info = comicUpdate.getComicUpdateInfo(props.detail?.comicId || -1)
      return !info ? '' : `${info.updateTime}更新 - 已${info.status}`
    })

    const deleteFav = () => favStore.comicFav(props.detail!)
    const posExchange = ({ from, to }: AwDragExchangeParam) => {
      favStore.exChange(from, to)
    }

    return {
      showDate,
      toComicMain,
      posExchange,
      deleteFav,
      comicUpdateInfo
    }
  }
})
</script>
<style lang="less" scoped>
.comic-fav-card {
  position: relative;
  width: 100%;
  height: max-content;
  user-select: none;
  transform: perspective(800px);
  transform-style: preserve-3d;
  .cover {
    position: relative;
    width: 100%;
    aspect-ratio: 9/12.7;
    border-radius: var(--df-radius);
    overflow: hidden;
    transition: all 0.25s;
    img {
      width: 100%;
      height: 100%;
    }
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      text-shadow: 0 0 10px rgb(0 0 0 / 60%);
      cursor: pointer;
      color: rgba(255, 255, 255, 0.925);
      opacity: 0.3;
      transition: all 0.25s;
      z-index: 5;
    }
    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    &::before {
      .mask;
    }
  }

  .info {
    padding: 0 4px;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.25s;
    overflow: hidden;
    p {
      .p-truncate(1);
      margin-top: 8px;
      margin-bottom: 2px;
      color: var(--font-color);
    }
    span {
      font-size: 14px;
      color: var(--font-unactive-color);
    }
  }
  .tools {
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 3;
    .tools-icon {
      font-size: 32px;
      color: var(--warning-color);
      text-shadow: 0 0 14px rgb(0 0 0 / 44%);
      cursor: pointer;
    }
  }
  &:hover {
    .cover {
      transform: rotateX(10deg) translateY(-10px);
      i {
        opacity: 1;
      }
    }
    .info {
      transform: translateY(-6px);
    }
  }
}
</style>
