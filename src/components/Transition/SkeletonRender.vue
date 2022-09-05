<template>
  <template v-if="!isInit">
    <slot key="fake" name="fake" />
  </template>
  <template v-else>
    <slot key="content" name="content" />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SkeletonRender',
  props: {
    isInit: {
      type: Boolean,
      default: false
    }
  }
})
</script>
