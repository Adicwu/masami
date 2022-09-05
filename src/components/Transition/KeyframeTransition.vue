<template>
  <transition-group
    v-bind="$attrs"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts" setup>
import { domObserver } from '@/utils/dom'
import { getCurrentInstance, onMounted, ref } from 'vue'

const instance = getCurrentInstance()
const props = withDefaults(
  defineProps<{
    max?: number
    duration?: number
    observer?: boolean
    keframes?: Keyframe[]
  }>(),
  {
    max: 5,
    duration: 525,
    observer: false,
    keframes: () => [
      {
        opacity: 0,
        transform: `translateY(${-40}%)`
      },
      {
        opacity: 1,
        transform: `translateY(0)`
      }
    ]
  }
)
const emit = defineEmits<{
  (e: 'visible'): void
}>()

const childEls = ref<Element[]>([])

const onBeforeEnter = (el: Element) => {
  if (childEls.value.length < props.max) {
    ;(el as HTMLElement).style.opacity = '0'
  }
  childEls.value.push(el)
}

const onEnter = (el: Element, done: () => void) => {
  const index = childEls.value.indexOf(el)
  if (index >= props.max) {
    return done()
  }
  el.animate(props.keframes, {
    delay: (index + 1) * (props.duration / 2),
    duration: props.duration
  }).onfinish = () => {
    ;(el as HTMLElement).style.opacity = '1'
    done()
  }
}

onMounted(() => {
  const $el: HTMLElement | null = instance?.proxy?.$el
  if ($el && props.observer) {
    domObserver($el, () => {
      emit('visible')
    })
  }
})
</script>
