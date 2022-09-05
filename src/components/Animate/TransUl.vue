<template>
  <transition-group
    ref="selfComp"
    class="trans-ul"
    tag="ul"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <slot v-if="!isActive" />
  </transition-group>
</template>

<script lang="ts">
import { useDomObserver } from '@/hooks/utils'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'TransUl',
  props: {
    duration: {
      type: Number,
      default: 0.25
    }
  },
  setup(props) {
    const selfComp = ref<any>()
    const isActive = ref(true)

    const beforeEnter = (el: Element) => {
      ;(el as HTMLElement).style.opacity = '0'
      ;(el as HTMLElement).style.transform = 'translateX(100%)'
    }
    const enter = (el: Element, done: () => void) => {
      const brother = [...el.parentElement!.childNodes]
      const elIndex = brother.indexOf(el)

      ;(el as HTMLElement).style.transition = `all ${props.duration}s ease ${
        elIndex * props.duration
      }s`
      setTimeout(() => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'translateX(0)'
        done()
      }, 100)
    }
    useDomObserver(selfComp.value?.$el, () => (isActive.value = false))
    return {
      beforeEnter,
      selfComp,
      isActive,
      enter
    }
  }
})
</script>
