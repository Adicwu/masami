<template>
  <transition
    enter-active-class="anm animate__fadeIn"
    leave-active-class="anm animate__fadeOutDown"
  >
    <slot v-if="!pending" />
  </transition>
  <div v-show="pending" class="aw-search-loading"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = withDefaults(
  defineProps<{
    pending: boolean
  }>(),
  {
    pending: false
  }
)
</script>
<style lang="less" scoped>
.anm {
  animation-duration: 0.625s;
}
.aw-search-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .fake {
    //
  }
  button {
    position: fixed;
    right: 100px;
    top: 100px;
  }
}
</style>
