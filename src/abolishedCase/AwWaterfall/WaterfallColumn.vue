<!-- <template>
  <div ref="selfEl" class="aw-waterfall__column" :style="selfStyle">
    <slot name="content" :data="state.realList" />
  </div>
</template>

<script lang="ts">
import { useParent } from '@sorarain/use'
import {
  computed,
  defineComponent,
  reactive,
  ref,
  nextTick,
  CSSProperties
} from 'vue'
import { WATERFALL_KEY } from './utils'
import * as Type from './type'

export default defineComponent({
  name: 'WaterfallColumn',
  setup() {
    const selfEl = ref<HTMLElement>()
    const { parent, index } = useParent<Type.InjectProps>(WATERFALL_KEY)
    const state = reactive({
      realList: [] as any[],
      tpage: 0,
      pageSize: parent?.columnSize || 0,
      adding: false
    })
    const selfRect = reactive({
      width: 0
    })
    const fakeHeight = ref(0)
    const orgList = computed(() => (parent?.getData() || [])[index.value] || [])
    const selfStyle = computed<CSSProperties>(() => ({
      gap: `${parent?.gap || 0}px`
    }))

    /** 组件初始化 */
    const init = () => {
      state.realList.push(...orgList.value.slice(0, state.pageSize))
      state.tpage++
      setTimeout(() => {
        // 处理后面滚动条出来后的宽度变化
        selfRect.width = selfEl.value?.clientWidth || 0
        resize()
      })
    }
    /** 重新加载 */
    const resize = () => {
      fakeHeight.value = selfEl.value?.clientHeight || 0
    }
    /** 列表增加 */
    const add = async () => {
      if (state.adding) return
      state.adding = true

      const list = orgList.value.slice(
        state.tpage * state.pageSize,
        (state.tpage + 1) * state.pageSize
      )
      if (list.length > 0) {
        state.tpage++
        state.realList.push(...list)
        resize()
      }

      await nextTick()
      state.adding = false
    }

    return {
      resize,
      init,
      add,
      fakeHeight,
      state,
      selfEl,
      selfStyle,
      columnSize: parent?.column || 0
    }
  }
})
</script>
<style lang="less" scoped>
.aw-waterfall__column {
  display: flex;
  flex-direction: column;
  flex: v-bind(1 / columnSize);
  height: max-content;
}
</style> -->
