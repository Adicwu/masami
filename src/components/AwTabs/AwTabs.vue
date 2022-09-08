<template>
  <div class="aw-tabs">
    <div class="aw-tabs__wrap">
      <div class="aw-tabs__nav">
        <div
          v-for="nav in tabsList"
          :key="nav.name"
          class="aw-tabs__nav-item"
          :class="{ active: active === nav.name }"
          @click="changeNav(nav.name)"
        >
          {{ nav.title }}
        </div>
      </div>
    </div>
    <div class="aw-tabs__content">
      <div class="aw-tabs__panel" :style="panelStyle">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  CSSProperties,
  computed
} from 'vue'

import AwTab from './AwTab.vue'

import { useChildren } from '@sorarain/use'
import { AWTABS_KEY } from './static'

export default defineComponent({
  name: 'AwTabs',
  props: {
    active: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:active'],
  setup(props, { emit }) {
    const { children, linkChildren } =
      useChildren<InstanceType<typeof AwTab>>(AWTABS_KEY)
    linkChildren()
    const tabs = reactive<{
      child: InstanceType<typeof AwTab>[]
    }>({
      child: []
    })

    const tabsList = computed(() =>
      tabs.child.map((item) => ({
        name: item.name,
        title: item.title
      }))
    )
    const panelStyle = computed(() => {
      let activeIndex = tabsList.value.findIndex(
        (item) => item.name === props.active
      )
      if (!~activeIndex) activeIndex = 0
      return {
        width: `${tabsList.value.length * 100}%`,
        transform: `translateX(-${
          +(activeIndex / tabs.child.length).toFixed(4) * 100
        }%)`
      } as CSSProperties
    })

    const init = () => {
      tabs.child = children
      tabs.child[0]?.changeLoaded(true)
    }
    const changeNav = (name: typeof tabsList.value[0]['title']) => {
      emit('update:active', name)
      tabs.child.find((item) => item.name === name)?.changeLoaded(true)
    }

    onMounted(() => {
      init()
    })
    return {
      tabs,
      tabsList,
      panelStyle,
      changeNav
    }
  }
})
</script>
<style lang="less" scoped>
.aw-tabs {
  position: relative;
  width: 100%;
  overflow: hidden;
  &__warp {
    width: 100%;
  }
  &__nav {
    display: flex;
    height: 40px;
    width: 100%;
    &-item {
      display: flex;
      align-items: center;
      height: 100%;
      color: rgba(255, 255, 255, 0.7);
      margin-right: 40px;
      cursor: pointer;
      user-select: none;
      font-weight: 800;
      &.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
      }
    }
  }
  &__content {
    width: 100%;
  }
  &__panel {
    padding-top: 20px;
    width: 100%;
    display: flex;
    overflow: hidden;
    transition: transform 0.625s;
  }
}
</style>
