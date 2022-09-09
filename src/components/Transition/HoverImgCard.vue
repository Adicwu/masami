<template>
  <div
    ref="selfEl"
    class="hover-img-card"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="card" :style="cardStyle">
      <div
        v-lazy-backgroudImg="src"
        class="card-bg"
        :style="cardBgTransform"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'

import { lazyBackgroudImg } from '@sorarain/use'
import { debounce } from '@sorarain/utils'
import { useEventListener } from '@sorarain/use'

export default defineComponent({
  name: 'HoverImgCard',
  directives: {
    lazyBackgroudImg
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  setup() {
    const selfEl = ref<HTMLElement>()
    const self = reactive({
      width: 0,
      height: 0,
      x: 0,
      y: 0
    })
    const mouse = reactive({
      x: 0,
      y: 0,
      leaveDelay: null as NodeJS.Timeout | null
    })

    const mousePX = computed(() => mouse.x / self.width)
    const mousePY = computed(() => mouse.y / self.height)

    const cardStyle = computed(() => {
      const rX = mousePX.value * 30
      const rY = mousePY.value * -30
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      }
    })
    const cardBgTransform = computed(() => {
      const tX = mousePX.value * -40
      const tY = mousePY.value * -40
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.offsetX - self.width / 2
      mouse.y = e.offsetY - self.height / 2
    }
    const handleMouseEnter = () => {
      mouse.leaveDelay && clearTimeout(mouse.leaveDelay)
    }
    const handleMouseLeave = () => {
      mouse.leaveDelay = setTimeout(() => {
        mouse.x = 0
        mouse.y = 0
      }, 1000)
    }

    const styleInit = () => {
      const { x, y, width, height } = selfEl.value!.getBoundingClientRect()
      self.width = width
      self.height = height
      self.x = x
      self.y = y
    }

    onMounted(styleInit)
    useEventListener('resize', debounce(styleInit, 800))

    return {
      selfEl,
      styleInit,
      mousePX,
      mousePY,
      cardStyle,
      cardBgTransform,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>
<style lang="less" scoped>
@hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
@returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);
.hover-img-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  &:hover {
    .card-bg {
      transition: 0.6s @hoverEasing, opacity 5s @hoverEasing;
    }
    .card {
      transition: 0.6s @hoverEasing, box-shadow 2s @hoverEasing;
      // box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
      //   rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
      //   inset white 0 0 0 6px;
    }
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 1s @returnEasing;
    border-radius: 8px;
  }

  .card-bg {
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #def;
    transition: 1s @returnEasing, opacity 5s 1s @returnEasing;
    pointer-events: none;
  }
}
</style>
