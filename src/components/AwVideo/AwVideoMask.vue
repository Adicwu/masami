<template>
  <div ref="maskEl" class="aw-video__mask">
    <Icon
      v-show="status === Type.PlayerStatus.Paused"
      class="aw-video__play"
      name="player-fill"
    />
  </div>
  <transition
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOut"
  >
    <div v-show="loading || waiting" class="aw-video__loading">
      <LoadingBlockRun />
    </div>
  </transition>
  <div v-show="status === Type.PlayerStatus.Failed" class="aw-video__bad">
    <img src="~static/img/video-bad.png" />
    <span>加载失败了，好耶！</span>
  </div>
  <div v-if="!src && !waiting" class="aw-video__bad">
    <img src="~static/img/video-empty.png" />
    <span>暂无播放内容~</span>
  </div>
</template>

<script lang="ts" setup>
import useMixClick from '@/hooks/useMixClick'
import { useLongtimePendingRef } from '@/hooks/utils'
import LoadingBlockRun from '@comps/Loading/LoadingBlockRun.vue'
import { computed, ref } from 'vue'
import type { NotifyItem } from './AwVideoMsg.vue'
import * as Type from './type'

const props = withDefaults(
  defineProps<{
    status: Type.Player['status']
    src: string
    waiting: boolean
  }>(),
  {
    status: Type.PlayerStatus.None,
    src: '',
    waiting: false
  }
)
const emits = defineEmits<{
  (e: 'notify', item: NotifyItem): void
  (e: 'click'): void
  (e: 'dblclick'): void
}>()

const maskEl = ref<HTMLElement>()

const loading = useLongtimePendingRef(
  computed(() => props.status === Type.PlayerStatus.Loading),
  {
    initPending: true,
    onPending() {
      emits('notify', {
        content: '电波获取中，请稍后~',
        duration: 3000
      })
    },
    onFulled() {
      emits('notify', {
        content: '电波获取完成~',
        duration: 3000
      })
    }
  }
)

useMixClick(maskEl, {
  click() {
    emits('click')
  },
  dblclick() {
    emits('dblclick')
  }
})
</script>
<style lang="less" scoped>
.aw-video {
  .mask(@height: 100%) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: @height;
  }
  &__mask {
    .mask(calc(100% - var(--control-height) - 10px));
    z-index: 2;
  }
  &__play {
    position: absolute;
    right: 30px;
    bottom: 16px;
    font-size: 50px;
    cursor: pointer;
    text-shadow: 0 4px 16px rgb(0 0 0 / 40%);
  }
  &__bad {
    .mask;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
    background: #000;
    img {
      width: 100px;
    }
    span {
      font-weight: 600;
      font-size: 20px;
      margin-top: 30px;
    }
    &::after {
      content: '';
      .mask;
    }
  }
  &__loading {
    .mask;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
    // background: rgb(0 0 0 / 10%);
    animation-duration: 0.25s;
    span {
      margin-top: 30px;
    }
  }
}
</style>
