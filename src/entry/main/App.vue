<template>
  <div class="app-main">
    <ComicMain :id="id" spa />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
import ComicMain from '@/views/Main/Index.vue'
// const emit = defineEmits<{}>()
// const props = withDefaults(defineProps<{}>(), {})
const id = location.hash.match(/\#\/\w+/)?.[0]?.replace('#/', '')
</script>
<style lang="less">
@import '~styles/common';
@import '~styles/app';
</style>
<style lang="less" scoped>
.app-main {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
