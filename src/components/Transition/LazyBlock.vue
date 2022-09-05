<template>
  <div ref="selfEl" class="lazy-block">
    <slot v-if="visible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDomObserver } from '@/hooks/utils'

export default defineComponent({
  name: 'LazyBlock',
  setup() {
    const selfEl = ref<HTMLElement>()
    const visible = ref(false)
    useDomObserver(selfEl, () => {
      visible.value = true
    })

    return {
      visible,
      selfEl
    }
  }
})
</script>
