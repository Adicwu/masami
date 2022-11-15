<template>
  <div class="comic-favlist">
    <AwListModifyTransition
      v-if="favs.length > 0"
      class="comic-favlist__content"
    >
      <ComicFavCard
        v-for="comic in favs"
        :id="comic.comicId"
        :key="comic.comicId"
        :detail="comic"
      />
    </AwListModifyTransition>
    <EmptyImgBlock
      v-else
      class="comic-favlist__empty"
      content="冷酷无情啊！"
      width="400px"
      height="max-content"
    >
      <img src="~static/img/history-empty.png" style="width: 100%" />
    </EmptyImgBlock>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import EmptyImgBlock from '@comps/Block/EmptyImgBlock.vue'
import ComicFavCard from '../../components/ComicFavCard.vue'
import { AwListModifyTransition } from 'sorarain'

import { usePageOut } from '@/hooks/utils'
import { useFavStore } from '@/stores/fav.store'

export default defineComponent({
  name: 'ComicFavlist',
  components: {
    ComicFavCard,
    AwListModifyTransition,
    EmptyImgBlock
  },
  setup() {
    const favStore = useFavStore()
    const favs = computed(() => favStore.comicFavs)
    usePageOut(() => {
      favStore.saveComicFav()
    })
    return {
      favs
    }
  }
})
</script>
<style lang="less" scoped>
.comic-favlist {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(var(--favcomic-col-count), 1fr);
    gap: 30px;
  }

  &__empty {
    margin: 0 auto;
    margin-top: 100px;
    position: relative;
  }
}
</style>
