import { jsonParse } from '@sorarain/utils'
import { useElementRect } from '@sorarain/use'
import {
  computed,
  CSSProperties,
  DefineComponent,
  defineComponent,
  h,
  onMounted,
  reactive,
  ref,
  Teleport
} from 'vue'

type Key = string | number
interface AwDragProps {
  draggable: boolean
  groupKey: Key
  selfKey: Key
}
type DargTransferData = Omit<AwDragProps, 'draggable'>
export type ExchangeParam = Record<'from' | 'to', Key>

export const AwDrag = defineComponent({
  name: 'AwDrag',
  props: {
    /**
     * 是否可拖动，否则相当于此组件无效
     */
    draggable: {
      type: Boolean,
      require: true
    },
    /**
     * 可互相拖动组的公共key
     */
    groupKey: {
      type: [String, Number],
      default: Math.random()
    },
    /**
     * 组件自身的key，用于拖拽完成后区分变化
     */
    selfKey: {
      type: [String, Number],
      default: Math.random()
    }
  },
  emits: {
    /** 交换事件 */
    exChange: (e: ExchangeParam) => e
  },
  setup(props, ctx) {
    const selfEl = ref<HTMLElement>()

    const selfElRect = useElementRect(selfEl)
    const state = reactive({
      draging: false,
      dragEntering: false,
      isSameDrag: false
    })
    const move = reactive({
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0
    })

    const selfStyle = computed<CSSProperties>(() => ({
      transition: state.dragEntering ? 'opacity 0.25s' : '',
      opacity: (() => {
        if (state.isSameDrag && state.draging) {
          return 0
        }
        if (state.dragEntering) {
          return 0.2
        }
        return 1
      })()
    }))
    const innerOrgRectStyle = computed<CSSProperties>(() => ({
      width: `${selfElRect.width}px`,
      height: `${selfElRect.height}px`
    }))
    const innerOrgStyle = computed<CSSProperties>(() => {
      return {
        ...innerOrgRectStyle.value,
        transform: `translate(${move.x - move.offsetX}px,${
          move.y - move.offsetY
        }px)`
      }
    })

    const getDargTransferData = (e: DragEvent) => {
      return jsonParse<DargTransferData | null, null>(
        e.dataTransfer?.getData('aw-drag'),
        null
      )
    }
    const ondragstart = (e: DragEvent) => {
      move.offsetX = e.offsetX
      move.offsetY = e.offsetY
      ondrag(e)
      state.draging = true

      // e.dataTransfer?.setDragImage(fakeImg, 0, 0) // 设置拖动时为透明

      e.dataTransfer?.setData(
        'aw-drag',
        JSON.stringify({
          groupKey: props.groupKey,
          selfKey: props.selfKey
        } as DargTransferData)
      )
    }
    // drag事件有毫秒级的节流，故建议在dragstart中在执行一次
    const ondrag = (e: DragEvent) => {
      // console.log(e.clientX, e.offsetX, e.pageX)
      // todo firefox兼容问题，其无pageX
      move.x = e.pageX
      move.y = e.pageY
    }
    const ondragend = () => {
      state.draging = false
    }
    const ondrop = (e: DragEvent) => {
      e.preventDefault() // 阻止默认动作（如打开一些元素的链接）
      state.dragEntering = false
      const data = getDargTransferData(e)
      if (
        data &&
        data.groupKey === props.groupKey &&
        props.selfKey !== data.selfKey
      ) {
        ctx.emit('exChange', {
          from: props.selfKey,
          to: data.selfKey
        })
      }
    }
    const ondragover = (e: DragEvent) => {
      e.preventDefault() // 阻止默认动作以启用 drop事件

      if (state.dragEntering) return
      state.dragEntering = true
    }
    const ondragleave = () => {
      state.dragEntering = false
    }
    const ondragenter = (e: DragEvent) => {
      state.isSameDrag = !!selfEl.value?.contains(e.target as HTMLElement)
    }
    const styleInit = () => {
      move.x = selfElRect.x
      move.y = selfElRect.y
    }

    onMounted(styleInit)

    return () =>
      h(
        'div',
        {
          ref: selfEl,
          draggable: props.draggable,
          ondragstart,
          ondragend,
          ondrag,
          ondragover,
          ondrop,
          ondragleave,
          ondragenter,
          style: {
            ...selfStyle.value
          }
        },
        [
          h(
            Teleport,
            {
              to: 'body',
              disabled: !state.draging
            },
            state.draging
              ? h(
                  'div',
                  {
                    ...ctx.attrs,
                    style: {
                      position: 'fixed',
                      zIndex: 3333,
                      top: 0,
                      left: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.25s',
                      opacity: 0.6,
                      ...innerOrgStyle.value
                    }
                  },
                  ctx.slots.default!()
                )
              : ctx.slots.default!()
          ),
          state.draging &&
            h('div', {
              style: innerOrgRectStyle.value
            })
        ]
      )
  }
}) as DefineComponent<AwDragProps>
