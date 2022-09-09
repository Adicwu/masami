// import {
//   computed,
//   CSSProperties,
//   defineComponent,
//   h,
//   KeepAlive,
//   onMounted,
//   PropType,
//   reactive,
//   ref
// } from 'vue'
// import { useChildren } from '@sorarain/use'
// import { AWVIRTUALLIST_KEY } from './utils'
// import AwVirtualListItem from './AwVirtualListItem'
// import * as Type from './type'

// function linkChild({
//   fakeHeight
// }: {
//   fakeHeight: Type.InjectProps['fakeHeight']
// }) {
//   const childIndex = ref(0)
//   const { children, linkChildren } = useChildren<
//     InstanceType<typeof AwVirtualListItem>,
//     Type.InjectProps
//   >(AWVIRTUALLIST_KEY)

//   const childStyleMap = reactive(
//     new Map<
//       Type.ChildId,
//       Type.ChildStyle & {
//         index: number
//       }
//     >()
//   )
//   const childStyleList = computed(() => [...childStyleMap])

//   const addChildStyle: Type.InjectProps['addChildStyle'] = (childId, style) => {
//     const hasIt = childStyleMap.has(childId)
//     if (!hasIt) {
//       childStyleMap.set(childId, {
//         ...style,
//         index: childIndex.value
//       })
//       childIndex.value++
//     } else {
//       const old = childStyleMap.get(childId)!
//       let offsetTop = style.offsetTop === 0 ? old.offsetTop : style.offsetTop
//       old.offsetTop < style.offsetTop && (offsetTop = old.offsetTop)
//       childStyleMap.set(childId, {
//         height: style.height,
//         index: old.index,
//         offsetTop
//       })
//     }
//   }

//   linkChildren({
//     fakeHeight,
//     addChildStyle
//   })

//   return {
//     children,
//     childStyleMap,
//     childStyleList
//   }
// }

// export default defineComponent({
//   name: 'AwVirtualList',
//   props: {
//     list: {
//       type: Array as PropType<any[]>,
//       default: () => []
//     },
//     target: {
//       type: [String, Element] as PropType<string | HTMLElement>,
//       default: null
//     },
//     fakeChildHeight: {
//       type: Number,
//       default: 0
//     },
//     size: {
//       type: Number,
//       default: 6
//     }
//   },
//   setup(props, { slots }) {
//     const scrollEl = ref<HTMLElement>()
//     const { childStyleList, childStyleMap } = linkChild({
//       fakeHeight: props.fakeChildHeight
//     })

//     const showRange = reactive({
//       start: 0,
//       offsetTop: 0
//     })
//     const selfStyle = computed<CSSProperties>(() => ({
//       paddingTop: `${showRange.offsetTop}px`
//       // transform: `translateY(${showRange.offsetTop}px)`
//     }))
//     const renderedList = computed(() => {
//       return props.list.slice(showRange.start, showRange.start + props.size)
//     })

//     const getTarget = (): HTMLElement | undefined => {
//       const { target } = props
//       if (!target) {
//         return undefined
//       } else {
//         return typeof target === 'string'
//           ? (document.querySelector(target) as HTMLElement)
//           : target
//       }
//     }

//     onMounted(() => {
//       scrollEl.value = getTarget()
//       scrollEl.value?.addEventListener('scroll', (e) => {
//         const { scrollTop, scrollHeight } = e.target as HTMLElement
//         let last = null
//         for (const i of childStyleMap) {
//           if (scrollTop <= i[1].offsetTop) {
//             const before = childStyleList.value[i[1].index - 1]
//             before && (last = before[1])
//             break
//           }
//         }
//         if (last) {
//           // console.log(childStyleMap)
//           showRange.start = last.index
//           showRange.offsetTop = last.offsetTop
//         }
//       })
//     })

//     return () =>
//       h(
//         'div',
//         {
//           style: {
//             width: '100%',
//             ...selfStyle.value
//           }
//         },
//         h(
//           KeepAlive,
//           {},
//           slots.content?.({
//             list: renderedList.value
//             // list: props.list
//           })
//         )
//       )
//   }
// })
