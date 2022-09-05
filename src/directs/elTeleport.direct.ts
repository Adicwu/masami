import { ObjectDirective } from 'vue'

/**
 * 节点迁移
 */
export default {
  mounted(el, binding) {
    const father = document.querySelector(binding.value)
    if (!father) return
    el.renderEl = father as HTMLElement
    setTimeout(() => {
      father.appendChild(el)
    }, 1000)
  },
  unmounted(el) {
    if (!el.renderEl) return
    el.renderEl.removeChild(el)
  }
} as ObjectDirective<HTMLElement & { renderEl: HTMLElement }, string>
