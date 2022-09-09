<!-- <template>
  <div ref="selfEl" class="aw-waterfall" :style="selfStyle">
    <slot name="content" :column="column" :org-data="reList.data" />
  </div>
</template>

<script lang="ts" setup>
import {
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
  computed,
  onBeforeUnmount,
  CSSProperties
} from 'vue'
import { arrayAverag, WATERFALL_KEY } from './utils'
import * as Type from './type'
import WaterfallColumn from './WaterfallColumn.vue'
import { useEventListener, useChildren } from '@sorarain/use'
import { throttle } from '@sorarain/utils'

const props = withDefaults(
  defineProps<{
    /** 滚动节点 */
    target: string | HTMLElement
    /** 新数据请求 */
    requset: Type.RequsetFn
    /** 是否激活滚动监听 */
    isBind?: boolean
    /** 滚底阈值差 */
    offsetY?: number
    /** 列的总数 */
    column?: number
    /** 每列下的数量 */
    columnSize?: number
    /** 列和列元素的间隙 */
    gap?: number
  }>(),
  {
    target: '',
    requset: () =>
      Promise.resolve({
        total: 0,
        list: []
      }),
    isBind: true,
    offsetY: 100,
    column: 3,
    columnSize: 10,
    gap: 16
  }
)

const selfEl = ref<HTMLElement>()

const reList = reactive({
  isPending: false,
  tpage: 1,
  total: 0,
  hasMore: true,
  data: [] as any[]
})
const splitData = computed(() => arrayAverag(reList.data, props.column))
const requestSize = computed(() => props.column * props.columnSize)
const selfStyle = computed<CSSProperties>(() => ({
  gap: `${props.gap}px`
}))

/** 子组件链接 */
const {
  childrenInit,
  childrenUpdate,
  childrenResize,
  minFakeheightOfChildren,
  childrenRealListCount
} = (() => {
  const { children, linkChildren } = useChildren<
    InstanceType<typeof WaterfallColumn>,
    Type.InjectProps
  >(WATERFALL_KEY)

  linkChildren({
    getData: () => splitData.value,
    columnSize: props.columnSize,
    column: props.column,
    gap: props.gap
  })

  const childrenInit = () => {
    children.forEach((child) => {
      child.init()
    })
  }
  const childrenResize = () => {
    children.forEach((child) => {
      child.resize()
    })
  }
  const childrenUpdate = (scrollTop: number) => {
    children.forEach(async (child) => {
      child.resize()
      if (scrollTop > child.fakeHeight - props.offsetY) {
        child.add()
      }
    })
  }
  const minFakeheightOfChildren = computed(() =>
    Math.min(...children.map((item) => item.fakeHeight))
  )
  const childrenRealListCount = computed(() =>
    children.reduce((totol, item) => totol + item.state.realList.length, 0)
  )

  return {
    childrenInit,
    childrenUpdate,
    childrenResize,
    minFakeheightOfChildren,
    childrenRealListCount
  }
})()

/** 滚动模块 */
const { onIsBindChanged, loadMore, removeEvent } = (() => {
  const scrollStyle = reactive({
    height: 0
  })
  // todo 如何实现每列内容高度相差不大（idea: 返回数据包含高宽，在放入时按高宽大小放）
  const loadMore = async () => {
    if (reList.isPending) return
    reList.isPending = true
    const { list, total } = await props.requset(reList.tpage, requestSize.value)
    if (list.length < requestSize.value) {
      reList.hasMore = false
    }
    reList.tpage++
    reList.data.push(...Object.freeze(list))
    reList.total = total
    reList.isPending = false
  }
  const mainScroll = throttle((e: Event) => {
    if (!reList.hasMore) return

    const el = e.target as HTMLElement
    const sctop = el.scrollTop + scrollStyle.height
    const isNoMoreData = childrenRealListCount.value === reList.data.length

    childrenUpdate(sctop)
    if (sctop > minFakeheightOfChildren.value - props.offsetY && isNoMoreData) {
      loadMore()
    }
  }, 100)
  const getTarget = (): HTMLElement | null => {
    const { target } = props
    if (!target) {
      return selfEl.value!
    } else {
      return typeof target === 'string'
        ? document.querySelector(target)
        : target
    }
  }
  const addEvent = async () => {
    await nextTick()
    getTarget()?.addEventListener('scroll', mainScroll)
  }
  const removeEvent = () => {
    const target = getTarget()
    if (!target) return
    target.removeEventListener('scroll', mainScroll)
  }
  const onIsBindChanged = (bind: boolean) => {
    bind ? addEvent() : removeEvent()
  }
  const styleInit = () => {
    scrollStyle.height = getTarget()?.clientHeight || 0
  }

  useEventListener('resize', () => {
    styleInit()
    childrenResize()
  })
  onMounted(styleInit)

  return {
    onIsBindChanged,
    removeEvent,
    loadMore
  }
})()

watch(() => props.isBind, onIsBindChanged, {
  immediate: true
})
onMounted(async () => {
  await loadMore()
  childrenInit()
})
onBeforeUnmount(removeEvent)
</script>
<style lang="less" scoped>
.aw-waterfall {
  position: relative;
  width: 100%;
  display: flex;
}
</style> -->
