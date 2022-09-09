<template>
  <div v-lazy-backgroudImg="detail.cover" class="comic-card__info">
    <header>{{ detail.title }}</header>
    <footer>
      <p>{{ detail.season }}</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import * as Api from '@/api'
import { lazyBackgroudImg } from '@sorarain/use'

export default defineComponent({
  name: 'ComicCardInfo',
  directives: {
    lazyBackgroudImg
  },
  props: {
    detail: {
      type: Object as PropType<Api.SearchComicReturn['data'][0]>,
      default: null
    }
  }
})
</script>
<style lang="less" scoped>
.comic-card__info {
  @padding: 12px;
  position: relative;
  width: 100%;
  aspect-ratio: 5/6;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
  header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: @padding;
    box-sizing: border-box;
    color: #fff;
    font-size: 16px;
    line-height: 18px;
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(14px);
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }
  footer {
    position: relative;
    width: 100%;
    padding: 20px @padding @padding @padding;
    box-sizing: border-box;
    &::before {
      .mask(2,rgba(255, 255, 255, 0.2));
      backdrop-filter: blur(14px);
    }
    &::after {
      .mask(1,rgba(255, 255, 255, 0.6));
      height: 50%;
      transform: translateY(-50%) scale(1.2);
      filter: blur(4px);
    }
    p {
      position: relative;
      z-index: 3;
      color: #eee;
      font-size: 14px;
    }
  }
}
</style>
