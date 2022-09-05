<template>
  <transition-group name="list-complete" :tag="tag" @before-leave="beforeLeave">
    <slot />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListVueTransition',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup() {
    const beforeLeave = (el: Element) => {
      const realEl = el as HTMLElement
      const { width, height } = realEl.getBoundingClientRect()
      realEl.style.width = `${width}px`
      realEl.style.height = `${height}px`
    }
    return {
      beforeLeave
    }
  }
})
</script>
<style lang="less">
.list-complete {
  &-enter-from,
  &-leave-to {
    opacity: 0 !important;
    transform: translateY(30px);
  }

  &-leave-active {
    position: absolute !important;
    // opacity: 0;
  }

  &-move {
    transition: all 0.25s;
  }
}
</style>
