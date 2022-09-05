<template>
  <i class="iconfont" :class="fullName">
    <slot />
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const fullName = computed(() => `icon-${props.name}`)
    return {
      fullName
    }
  }
})
</script>
