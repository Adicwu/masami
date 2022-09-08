<!-- <template>
  <div ref="selfEl" class="aw-virtual-waterfall">
    <div class="vw-content" :style="contentStyle">
      <keep-alive>
        <AwVirtualWaterfallItem
          v-for="{ item, style } in renderedData"
          :key="item.id"
          :style="style"
          @resize="(e) => addAwItem(item.id, e)"
        >
          <slot name="item" :item="item" />
        </AwVirtualWaterfallItem>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  CSSProperties,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'
import * as Type from '../../components/AwVirtualWaterfall/type'
import AwVirtualWaterfallItem from '../../components/AwVirtualWaterfall/AwVirtualWaterfallItem.vue'
import { deepCopy } from '@sorarain/utils'
import { throttle } from '@/utils/adLoadsh'

const props = withDefaults(
  defineProps<{
    /** 滚动节点 */
    target: string | HTMLElement
    /** 新数据请求 */
    requset: Type.RequsetFn
    /** 滚底阈值差 */
    offsetY?: number
    /** 列的总数 */
    column?: number
    /** 每列最小数量 */
    columnItemCount?: number
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
    offsetY: 100,
    column: 3,
    columnItemCount: 6,
    gap: 16
  }
)
const selfEl = ref<HTMLElement>()

const reList = reactive({
  isPending: false,
  tpage: 1,
  total: 0,
  hasMore: true,
  data: [] as any[],
  get map() {
    return this.data.reduce((totol, item) => {
      totol.set(item.id, item)
      return totol
    }, new Map<string | number, any>())
  }
})
const awItem = reactive(new Map<string | number, Type.AwItemRect>())
const columns = reactive({
  queue: Array(props.column)
    .fill(0)
    .map(
      () =>
        ({
          list: [],
          get height() {
            return this.list.reduce((totol, { item }) => {
              const hei = awItem.get(item.id)?.height || 0
              return totol + hei
            }, 0)
          }
        } as {
          list: {
            item: any
            index: number
            before: any | null
          }[]
          height: number
        })
    ),
  dataLen: 0,
  get maxHeight() {
    return Math.max(...columns.queue.map((item) => item.height))
  },
  tasks: [] as (() => void)[]
})

const renderedData = computed(() =>
  columns.queue
    .map((q, i) => {
      let beforeOffsetY = 0
      let beforeHei = 0
      return q.list.map((item, index) => {
        if (index === 1) {
          beforeHei = awItem.get(item.item?.id)?.height || 0
          beforeOffsetY = awItem.get(item.before?.item?.id)?.height || 0
        } else if (index !== 0) {
          beforeOffsetY += beforeHei
          beforeHei = awItem.get(item.item?.id)?.height || 0
        }
        return {
          ...item,
          style: {
            width: `${100 / props.column}%`,
            transform: `translate3d(${i * 100}%,${beforeOffsetY}px,0)`
          } as CSSProperties
        }
      })
    })
    .flat(2)
)

const requestSize = computed(() => props.column * props.columnItemCount)
const contentStyle = computed<CSSProperties>(() => {
  return {
    height: `${columns.maxHeight}px`
  }
})

const addAwItem = (id: number, item: Type.AwItemRect) => {
  awItem.set(id, item)
}
const { onIsBindChanged, loadMore } = (() => {
  const loadMore = async () => {
    if (reList.isPending) return
    reList.isPending = true
    const { list, total } = await props.requset(reList.tpage, requestSize.value)
    if (list.length < requestSize.value) {
      reList.hasMore = false
    }
    reList.tpage++
    reList.data.push(...list.map((item) => Object.freeze(item)))
    reList.total = total
    reList.isPending = false
  }
  const mainScroll = (e: Event) => {
    // console.log(e)
  }
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
  return {
    onIsBindChanged,
    loadMore
  }
})()

const initColumns = async () => {
  reList.data.slice(0, props.column).forEach((item, index) => {
    pushToQueue(index, item)
  })
  columns.dataLen = props.column
}
const pushToQueue = (index: number, item: any) => {
  const q = columns.queue[index]
  const listLen = q.list.length
  q.list.push({
    item,
    index: listLen,
    before: q.list[listLen - 1] || null
  })
}
const addToQueue = () => {
  const minHeiQueue = Math.min(...columns.queue.map((item) => item.height))
  const minHeiQueueIndex = columns.queue.findIndex(
    (item) => item.height === minHeiQueue
  )
  pushToQueue(minHeiQueueIndex, reList.data[++columns.dataLen])
}

watch(
  computed(() => columns.queue.map((item) => item.height)),
  throttle(async () => {
    columns.tasks.shift()?.()
  }, 300)
)

onMounted(async () => {
  onIsBindChanged(true)
  await loadMore()
  initColumns()
  for (const _ of Array(reList.data.length - props.column)) {
    columns.tasks.push(addToQueue)
  }
})

defineExpose({
  Type
})
</script>
<style lang="less" scoped>
.aw-virtual-waterfall {
  position: relative;
  width: 100%;

  .vw {
    &-content {
      position: relative;
      width: 100%;
      background: crimson;
    }
  }
}
</style> -->
