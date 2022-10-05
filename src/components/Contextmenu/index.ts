import { mountComponent } from '@sorarain/use'
import { ComponentPublicInstance } from 'vue'
import ContextmenuItx from './Index.vue'
import * as Type from './type'

// eslint-disable-next-line @typescript-eslint/ban-types
let instance: ComponentPublicInstance<{}, any>

function initInstance() {
  ;({ instance } = mountComponent(ContextmenuItx))
}
const Contextmenu = (options: Type.InitPay) => {
  !instance && initInstance()
  instance.init(options)
  return instance
}
export { Contextmenu }
