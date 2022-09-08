import { numLimit } from '@sorarain/utils'
import { ObjectDirective } from 'vue'

/**
 * 元素拖动，默认限制在窗口内
 */
const moveable: ObjectDirective<
  HTMLElement & {
    /** 是否正在移动中 */
    moveing: boolean
    offsetX: number
    offsetY: number
    resizeObserver: ResizeObserver
    onmovestart: (e: MouseEvent) => void
    onmoveing: (e: MouseEvent) => void
    onmoveend: (e: MouseEvent) => void
  },
  boolean
> = {
  mounted(el, binding) {
    const initSelfSize = {
      x: 0,
      y: 0
    }
    const offsetLimit = {
      x: {
        min: 0,
        max: 0
      },
      y: {
        min: 0,
        max: 0
      }
    }

    el.moveing = false
    el.onmovestart = ({ offsetX, offsetY }) => {
      el.moveing = true
      ;[el.offsetX, el.offsetY] = [offsetX, offsetY]
    }
    el.onmoveing = (e) => {
      if (!el.moveing) return
      const { pageX, pageY } = e
      const x = pageX - initSelfSize.x - el.offsetX
      const y = pageY - initSelfSize.y - el.offsetY
      el.style.transform = `translate(${numLimit(
        x,
        offsetLimit.x.min,
        offsetLimit.x.max
      )}px,${numLimit(y, offsetLimit.y.min, offsetLimit.y.max)}px)`
    }
    el.onmoveend = () => {
      el.moveing = false
    }
    const styleInit = () => {
      const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      const selfSize = el.getBoundingClientRect()
      initSelfSize.x = selfSize.x
      initSelfSize.y = selfSize.y
      offsetLimit.x.min = -selfSize.x
      offsetLimit.x.max = windowSize.width - selfSize.width - selfSize.x
      offsetLimit.y.min = -selfSize.y
      offsetLimit.y.max = windowSize.height - selfSize.height - selfSize.y
    }

    el.resizeObserver = new ResizeObserver(styleInit)
    el.resizeObserver.observe(el)

    el.addEventListener('mousedown', el.onmovestart)
    el.addEventListener('mouseup', el.onmoveend)
    document.body.addEventListener('mousemove', el.onmoveing)
  },
  unmounted(el) {
    if (!el.onmovestart) return
    el.resizeObserver.unobserve(el)
    el.removeEventListener('mousedown', el.onmovestart)
    el.removeEventListener('mouseup', el.onmoveend)
    document.body.removeEventListener('mousemove', el.onmoveing)
  }
}
export default moveable
