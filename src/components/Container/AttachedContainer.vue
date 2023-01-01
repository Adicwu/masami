<template>
  <div
    ref="selfEl"
    v-el-teleport="'#app'"
    class="attached-container"
    :style="selfStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { useWindowSize } from '@sorarain/use'
import {
  CSSProperties,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref
} from 'vue'
import ElTeleport from '@/directs/elTeleport.direct'

/**
 * todo 初始化位置导致的左上角错误显示
 */
export default defineComponent({
  name: 'AttachedContainer',
  directives: {
    ElTeleport
  },
  props: {
    offsetX: {
      type: Number,
      default: 8
    },
    offsetY: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 200
    }
  },
  setup(props) {
    const selfEl = ref<HTMLElement>()
    const selfRealFatherEl = ref<HTMLElement | null>(null)
    const isActive = ref(false)
    const windowSize = useWindowSize()
    const selfStyle = reactive<CSSProperties>({
      transform: 'translate(0,0)',
      get width() {
        return `${props.width}px`
      },
      get zIndex() {
        return isActive.value ? 9999 : -1000
      },
      get opacity() {
        return isActive.value ? '1' : '0'
      }
    })

    const onMouseEnter = (e: MouseEvent) => {
      const elRect = (e.target as HTMLElement).getBoundingClientRect()
      const selfElSize = [
        selfEl.value!.clientWidth || 0,
        selfEl.value!.clientHeight || 0
      ]

      isActive.value = true

      // y计算
      const asideX = elRect.left + selfRealFatherEl.value!.clientWidth
      const offsetX =
        asideX + props.width < windowSize.width.value
          ? asideX + props.offsetX
          : elRect.left - selfElSize[0] - props.offsetX

      // x计算
      let offsetY = elRect.top + props.offsetY
      if (elRect.top <= 0) {
        offsetY = 0
      } else if (elRect.top > windowSize.height.value - selfElSize[1]) {
        offsetY = windowSize.height.value - selfElSize[1]
      }

      selfStyle.transform = `translate(${offsetX}px,${offsetY}px)`
    }
    const onMouseOut = () => {
      isActive.value = false
    }

    onMounted(() => {
      selfRealFatherEl.value = selfEl.value!.parentNode as HTMLElement
      if (selfRealFatherEl.value) {
        selfRealFatherEl.value!.addEventListener('mouseover', onMouseEnter)
        selfRealFatherEl.value!.addEventListener('mouseout', onMouseOut)
        selfRealFatherEl.value!.addEventListener('click', onMouseOut)
      }
    })
    onBeforeUnmount(() => {
      if (selfRealFatherEl.value) {
        selfRealFatherEl.value!.removeEventListener('mouseover', onMouseEnter)
        selfRealFatherEl.value!.removeEventListener('mouseout', onMouseOut)
        selfRealFatherEl.value!.removeEventListener('click', onMouseOut)
      }
    })

    return {
      selfEl,
      onMouseEnter,
      isActive,
      selfStyle
    }
  }
})
</script>

<style lang="less" scoped>
.attached-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1111;
  opacity: 0;
  transition: opacity 0.25s;
}
</style>
