<template>
  <transition
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__slideOutRight"
  >
    <div v-show="visible" class="aw-video__episodes" @mouseleave="close">
      <ul ref="listEl" class="list">
        <li
          v-for="item in episodes"
          :key="item.name"
          :class="{
            active: currentEpisode === item.value
          }"
          @click="changeEpisode(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import * as Type from './type'

const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void
  (e: 'onChange', v: Type.Episode): void
}>()
const props = withDefaults(
  defineProps<{
    visible: boolean
    /** 集数列表 */
    episodes?: Type.Episode[]
    /** 当前播放集 */
    currentEpisode?: string
  }>(),
  {
    episodes: () => [],
    currentEpisode: ''
  }
)
const listEl = ref<HTMLElement>()

const close = () => {
  emit('update:visible', false)
}
const changeEpisode = (item: Type.Episode) => {
  close()
  emit('onChange', item)
}
const scrollToCurrentEpisode = async () => {
  await nextTick()
  const i = props.episodes.findIndex(
    (item) => item.value === props.currentEpisode
  )
  if (!~i) return
  const listElChild = listEl.value?.children || []
  listElChild[i]?.scrollIntoView(false)
}
watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      scrollToCurrentEpisode()
    }
  }
)
</script>
<style lang="less" scoped>
.aw-video__episodes {
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 100;
  background: rgba(51, 51, 51, 0.8);
  border-radius: 4px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation-duration: 0.25s;
  .list {
    width: 100%;
    max-height: 350px;
    overflow-y: auto;
    color: rgba(255, 255, 255, 0.872);
    user-select: none;
    cursor: pointer;
    li {
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 38px;
      box-sizing: border-box;
      &.active {
        color: crimson;
        font-weight: 800;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
