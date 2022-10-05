<template>
  <article class="home-article">
    <div class="home-article__inner">
      <h3>新番动态</h3>
      <AwRadio v-model="daysUpdate.active" :options="daysUpdate.list" />
      <ul>
        <li
          v-for="item in daysUpdate.current"
          :key="item.id"
          :data-comicid="item.id"
          @click="toComicMain(item.id)"
        >
          <p>{{ item.title }}</p>
          <span>{{ item.season }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue'
import { getVal } from '@sorarain/utils'

import AwRadio, { Option } from '@comps/Form/AwRadio.vue'
import * as SectionType from '../types/homeSection.type'
import { toComicMain } from '@/router/jump'

export default defineComponent({
  name: 'HomeArticle',
  components: {
    AwRadio
  },
  props: {
    perweek: {
      type: Array as PropType<SectionType.Comic['perweek']>,
      default: () => []
    }
  },
  setup(props) {
    const daysUpdate = reactive({
      active: String([6, 0, 1, 2, 3, 4, 5][new Date().getDay()]),
      list: computed<Option[]>(() =>
        props.perweek.map((item) => ({
          name: item.name,
          value: item.key
        }))
      ),
      get current() {
        return getVal(
          () => props.perweek.find((item) => item.key === this.active)!.value,
          []
        )
      }
    })
    return {
      daysUpdate,
      toComicMain
    }
  }
})
</script>
<style lang="less" scoped>
.home-article {
  flex: 1;
  height: 180px;
  background: var(--bg-color);
  border-radius: 18px;
  overflow: hidden;
  &__inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    h3 {
      padding-bottom: 12px;
    }
    ul {
      flex: 1;
      overflow-y: auto;
      display: flex;
      gap: 12px;
      margin-top: 14px;
      flex-wrap: wrap;
      align-content: flex-start;
      li {
        padding: 0 8px;
        height: 46px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: var(--box-bg-color);
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.25s;
        span {
          font-size: 12px;
          color: var(--font-unactive-color);
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
