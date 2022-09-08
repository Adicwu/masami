import { mountComponent } from '@sorarain/use'
import ImagePreviewComponent from './ImagePreview.vue'
import { ComponentInstance, Options } from './type'
let instance: ComponentInstance
function initInstance() {
  ;({ instance } = mountComponent(ImagePreviewComponent))
}
const ImagePreview = (options: Options) => {
  !instance && initInstance()
  instance.init(options)
  return instance
}
export { ImagePreview }
