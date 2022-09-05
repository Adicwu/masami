import clickOutside from '@/directs/clickOutside.direct'
import { Directive } from 'vue'
export const directs: Record<string, Directive> = {
  /**
   * 节点重绘监听
   */
  domResize: {
    beforeMount(el, binding) {
      el.observer = new window.ResizeObserver(binding.value)
      el.observer.observe(el)
    },
    unmounted(el) {
      el.observer.unobserve(el)
      el.observer = null
    }
  },
  /**
   * 外部点击
   */
  clickOutside
}
