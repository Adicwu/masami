<template>
  <div
    ref="selfEl"
    :data-comicid="detail.id"
    class="comic-card"
    @click="toComicMain(detail.id)"
  >
    <div class="cover">
      <BaseImg :src="detail.cover" />
    </div>
    <AttachedContainer
      v-if="attachedVisible"
      ref="acttachedContainerComp"
      :offset-x="12"
      :width="240"
    >
      <ComicCardInfo :detail="detail" />
    </AttachedContainer>
  </div>
</template>

<script lang="ts" setup>
import * as Api from '@/api'
import { toComicMain } from '@/router/jump'

import AttachedContainer from '@/components/Container/AttachedContainer.vue'
import ComicCardInfo from './ComicCardInfo.vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    detail: Api.SearchComicReturn['data'][0]
  }>(),
  {}
)

const selfEl = ref<HTMLElement>()
const acttachedContainerComp = ref<InstanceType<typeof AttachedContainer>>()
const attachedVisible = ref(false)

const activeAttached = (e: MouseEvent) => {
  attachedVisible.value = true
  removeEvent()
  nextTick(() => {
    acttachedContainerComp.value?.onMouseEnter(e)
  })
}
const addEvent = () => {
  selfEl.value?.addEventListener('mouseover', activeAttached)
}
const removeEvent = () => {
  selfEl.value?.removeEventListener('mouseover', activeAttached)
}
onMounted(addEvent)
onBeforeUnmount(removeEvent)
</script>
<style lang="less" scoped>
.comic-card {
  position: relative;
  width: 100%;
  cursor: pointer;
  aspect-ratio: 1/1.4;

  .cover {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
}
</style>
