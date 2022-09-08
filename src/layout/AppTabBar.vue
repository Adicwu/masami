<template>
  <div class="app-tab__bar">
    <InvertSwitch
      v-model="daytimeType"
      class="daytime"
      @change="onDaytimeTypeChanged"
    >
      <template #icon="{ active }">
        <Icon :name="!active ? 'sun' : 'moon'" />
      </template>
    </InvertSwitch>
    <div v-click-outside="() => (comiclistVisible = false)" class="comiclist">
      <Icon
        class="tool"
        :class="{ active: comiclistVisible }"
        name="history"
        @click="comiclistVisible = !comiclistVisible"
      />
      <AppTabBarComiclist v-model:visible="comiclistVisible" />
    </div>
    <div class="avatar">
      <BaseImg src="https://api.adicw.cn/uploads/UserAvatar/default.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import InvertSwitch from '@/components/Form/InvertSwitch.vue'
import { computed, defineComponent, ref } from 'vue'
import AppTabBarComiclist from './AppTabBarComiclist.vue'
import { getThemeInstance } from '@/theme/theme.class'
import { DF_SYSTEM_COLOR, THEME_DARK, THEME_PINK } from '@/theme/static'
import { debounce } from '@sorarain/utils'

function daytimeModule() {
  const daytimeType = ref(true)
  const theme = computed(() =>
    DF_SYSTEM_COLOR.map((item, index) => ({
      ...item,
      value: daytimeType.value ? THEME_DARK[index] : THEME_PINK[index]
    }))
  )
  const onDaytimeTypeChanged = debounce(() => {
    getThemeInstance()?.colorVarInit(theme.value)
    getThemeInstance()?.saveLocalColor(theme.value)
  }, 300)
  return {
    daytimeType,
    onDaytimeTypeChanged
  }
}

export default defineComponent({
  name: 'AppTabBar',
  components: {
    AppTabBarComiclist,
    InvertSwitch
  },
  setup() {
    const comiclistVisible = ref(false)
    return {
      comiclistVisible,
      ...daytimeModule()
    }
  }
})
</script>
<style lang="less" scoped>
.app-tab__bar {
  position: fixed;
  right: 40px;
  top: 10px;
  display: flex;
  align-items: center;
  z-index: 8;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tool {
    position: relative;
    display: flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-right: 14px;
    cursor: pointer;
    color: var(--font-color);
    &::after {
      .mask(-1,var(--aside-bg-color));
      border-radius: 50%;
      opacity: 0.8;
    }
    &.active {
      color: var(--primary-color);
    }
  }
  .comiclist {
    position: relative;
    user-select: none;
  }
  .daytime {
    margin-right: 14px;
  }
}
</style>
