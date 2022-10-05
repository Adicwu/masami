<template>
  <div class="app-main">
    <ComicMain :id="id" spa ref="comicMainComp" />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
import { useFavStore } from '@/stores/fav.store'
import ComicMain from '@/views/Main/Index.vue'
import { ref } from 'vue'

const comicMainComp = ref<InstanceType<typeof ComicMain> | null>(null)
const favStore = useFavStore()
const id = location.hash.match(/\#\/\w+/)?.[0]?.replace('#/', '')

window.addEventListener('beforeunload', () => {
  comicMainComp.value?.saveStores()
  favStore.saveComicFav()
})
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
