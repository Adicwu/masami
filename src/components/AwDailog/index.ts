import AwDailogVue from './AwDailog.vue'
import { mountComponent } from '@sorarain/use'
import { ComponentPublicInstance, Plugin } from 'vue'
import * as Type from './type'

// eslint-disable-next-line @typescript-eslint/ban-types
type ComponentInstance = ComponentPublicInstance<{}, any>
let instance: ComponentInstance

function initInstance() {
  ;({ instance } = mountComponent(AwDailogVue))
}
const AwDailog = (options: Type.Props) => {
  !instance && initInstance()
  return instance.init(options)
}
const AwDailogPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$awDailog = AwDailog
  }
}
export { AwDailog, AwDailogPlugin }
