import { ElNotification } from 'element-plus'

/**
 * 对象自动赋值（两者需要相同的类型依赖）
 * @param a
 * @param b
 */
export function autoObjAssign<
  T extends {
    [props: string]: any
  },
  U extends T
>(a: T, b: U) {
  Object.keys(a).forEach((k: keyof T) => {
    if (typeof b[k] !== 'undefined') {
      a[k] = b[k]
    }
  })
}

/**
 * 节点事件节流，基于requestAnimationFrame，常用于scroll
 * @param cb
 * @returns
 */
export function eventThrottle<T extends unknown[]>(cb: (...args: T) => void) {
  let bool = false
  return function (this: unknown, ...args: T) {
    if (bool) return
    bool = true
    window.requestAnimationFrame(() => {
      cb.apply(this, args)
      bool = false
    })
  }
}

/**
 * 将内容复制到粘贴板
 * @param text
 */
export function copyText(text: string | number) {
  const save = (e: ClipboardEvent) => {
    e.clipboardData!.setData('text/plain', text.toString())
    e.preventDefault()
  }
  document.addEventListener('copy', save)
  document.execCommand('copy')
  document.removeEventListener('copy', save)
  ElNotification({
    title: '内容复制',
    message: '内容已经成功复制到粘贴板~',
    type: 'success'
  })
}
