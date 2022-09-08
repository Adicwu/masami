<template>
  <div v-if="loaded" class="aw-tab" :style="styleStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, onMounted, ref, computed } from 'vue'
import { useParent } from '@sorarain/use'
import { AWTABS_KEY } from './static'
export default defineComponent({
  name: 'AwTab',
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup() {
    const { parent } = useParent(AWTABS_KEY)
    const loaded = ref(false)
    const broLength = ref(0)

    const styleStyle = computed(
      () =>
        ({
          width: `${(100 / broLength.value).toFixed(2)}%`
        } as CSSProperties)
    )
    const changeLoaded = (res: boolean) => {
      loaded.value = res
    }
    onMounted(() => {
      broLength.value = parent!.children.length
    })

    return {
      loaded,
      changeLoaded,
      styleStyle
    }
  }
})
</script>
<style lang="less" scoped>
.aw-tab {
  height: 100%;
  overflow: hidden;
}
</style>
