<template>
  <Icon
    v-if="type === 'icon'"
    :name="isFav ? 'icon_love_hover' : 'icon_love'"
    class="comic-fav"
    @click="fav"
  />
  <button
    v-if="type === 'button'"
    class="comic-fav comic-fav__button"
    :class="{ active: isFav }"
    @click="fav"
  >
    <div class="comic-fav__button-icon">
      <transition
        enter-active-class="animate__rotateInDownLeft"
        leave-active-class="animate__rotateOutUpRight"
      >
        <Icon v-if="isFav" name="icon_love_hover" />
        <Icon v-else name="icon_love" />
      </transition>
    </div>
    {{ !isFav ? '追番' : '已追番' }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useFavStore, ComicFavInfo } from '@/stores/fav.store'
import Icon from './Icon.vue'
import { usePageOut } from '@/hooks/utils'
export default defineComponent({
  name: 'ComicFav',
  components: {
    Icon
  },
  props: {
    id: {
      type: String as PropType<ComicId>,
      default: ''
    },
    info: {
      type: Object as PropType<null | ComicFavInfo>,
      default: null
    },
    type: {
      type: String as PropType<'button' | 'icon'>,
      default: 'icon'
    },
    leaveSave: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const favStore = useFavStore()
    const isFav = computed(() => favStore.isFavComic(props.id))
    const fav = () => props.info && favStore.comicFav(props.info)
    props.leaveSave &&
      usePageOut(() => {
        favStore.saveComicFav()
      })
    return {
      isFav,
      fav
    }
  }
})
</script>
<style lang="less" scoped>
.comic-fav {
  cursor: pointer;
  user-select: none;
}
.comic-fav__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 48px;
  line-height: 18px;
  line-height: 48px;
  background-color: var(--primary-color);
  border-radius: 8px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  outline: none;
  border: 3px solid var(--primary-color);
  transition: all 0.25s;
  box-sizing: border-box;
  &.active {
    border-color: rgba(255, 255, 255, 0.275);
    background-color: #e080a087;
  }
  &-icon {
    position: relative;
    width: 24px;
    height: 24px;
    padding-right: 4px;

    i {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24px;
      line-height: 24px;
      animation-duration: 0.625s;
    }
  }
}
</style>
