<template>
  <LazyBlock class="home-block-comic">
    <h2>
      <span>{{ title }}</span>
    </h2>
    <KeyframeTransition
      tag="div"
      appear
      :keframes="[
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ]"
      class="cards"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="card"
        :data-comicid="item.id"
        @click="toComicMain(item.id)"
      >
        <BaseImg :src="item.cover" />
        <div class="card-info">
          <b>{{ item.title }}</b>
          <p>{{ item.season }}</p>
        </div>
      </div>
    </KeyframeTransition>
  </LazyBlock>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { toComicMain } from '@/router/jump'
import { ComicPageList } from '@/api'
import LazyBlock from '@comps/Transition/LazyBlock.vue'
import KeyframeTransition from '@/components/Transition/KeyframeTransition.vue'

export default defineComponent({
  name: 'HomeBlockComic',
  components: {
    LazyBlock,
    KeyframeTransition
  },
  props: {
    list: {
      type: Array as PropType<ComicPageList[]>,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      toComicMain
    }
  }
})
</script>
<style lang="less" scoped>
@import '../style/home-child';

.home-block-comic {
  position: relative;
  width: 100%;
  max-width: 1800px;

  h2 {
    .home-child-title('OTHER ANIME');
  }

  .cards {
    width: 100%;
    display: flex;
    gap: 16px;
    margin-top: 20px;

    .card {
      position: relative;
      flex: 1;
      aspect-ratio: 2/1;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        img {
          transform: scale(1.2);
          filter: brightness(0.4);
        }

        .card-info {
          transform: translateY(100%);
        }
      }

      img {
        width: 100%;
        height: 100%;
        transition: all 0.25s;
      }

      &-info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20px 14px;
        box-sizing: border-box;
        transition: all 0.25s;

        &::before {
          .mask(1, linear-gradient(to top, #000, rgb(0 0 0 / 0%)));
        }

        p,
        b {
          position: relative;
          z-index: 3;
        }

        b {
          color: rgba(255, 255, 255, 0.9);
        }

        p {
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
