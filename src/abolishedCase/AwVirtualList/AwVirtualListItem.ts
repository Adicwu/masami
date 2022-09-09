// import { useExpose, useResizeListener } from '@/hooks/utils'
// import { useParent } from '@sorarain/use'
// import { defineComponent, h, reactive, ref } from 'vue'
// import * as Type from './type'
// import { AWVIRTUALLIST_KEY } from './utils'

// function linkParent() {
//   return useParent<Type.InjectProps>(AWVIRTUALLIST_KEY)
// }

// export default defineComponent({
//   name: 'AwVirtualListItem',
//   props: {
//     id: {
//       type: [Number, String],
//       default: Math.random()
//     }
//   },
//   setup(props, { slots, attrs }) {
//     const { parent } = linkParent()
//     const selfEl = ref<HTMLElement>()

//     const selfStyle: Type.ChildStyle = reactive({
//       height: parent?.fakeHeight || 0,
//       offsetTop: 0
//     })

//     useResizeListener(selfEl, () => {
//       selfStyle.height = selfEl.value?.clientHeight || 0
//       selfStyle.offsetTop = selfEl.value?.offsetTop || 0
//       parent?.addChildStyle(props.id, selfStyle)
//     })

//     useExpose({
//       selfStyle
//     })

//     return () =>
//       h(
//         'div',
//         {
//           ref: selfEl,
//           ...attrs
//         },
//         slots.default?.()
//       )
//   }
// })
