import { domObserver } from '@/utils/dom'
import { useEventListener } from '@sorarain/use'
import {
  customRef,
  getCurrentInstance,
  inject,
  InjectionKey,
  isRef,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUnmounted,
  provide,
  Ref,
  ref,
  unref
} from 'vue'

/**
 * 节点入屏监听
 * @param el 节点
 * @param callback 执行方法
 */
export function useDomObserver(
  el: Ref<HTMLElement | undefined> | HTMLElement,
  callback: () => void
) {
  onMounted(() => {
    const isV = isRef(el)
    if (!el || (isV && !el.value)) return
    domObserver(isV ? el.value! : el, callback)
  })
}

/**
 * 样式计算
 * @param callback
 */
export function useReStyle(callback: () => void) {
  onMounted(callback)
  useEventListener('resize', callback)
}

/**
 * 延时批渲染
 * @param maxStep 最大步数
 */
export function useDeferredRender(maxStep: number) {
  const deferredRenderStep = ref(0)
  /**
   * 渲染批次顺序
   * @param step 第几步，需小于传入的总步数
   * @returns 是否渲染
   */
  const defer = (step: number) => deferredRenderStep.value > step
  /**
   * 开始渲染
   */
  const runDeferredRender = () => {
    requestAnimationFrame(() => {
      deferredRenderStep.value++
      if (deferredRenderStep.value < maxStep) {
        runDeferredRender()
      }
    })
  }

  return {
    defer,
    runDeferredRender
  }
}

/**
 * 节点重绘监听
 * @param el
 * @param callback
 */
export function useResizeListener(
  el: HTMLElement | Ref<HTMLElement | undefined> | (() => HTMLElement | null),
  callback: () => void
) {
  let ob: ResizeObserver | null

  const add = () => {
    const element = typeof el === 'function' ? el() : unref(el)

    if (element && !ob) {
      ob = new ResizeObserver(callback)
      ob.observe(element)
    }
  }

  const remove = () => {
    const element = typeof el === 'function' ? el() : unref(el)

    if (element && ob) {
      ob.disconnect()
      ob = null
    }
  }

  onUnmounted(remove)
  onDeactivated(remove)
  usePageIn(add)
}

/**
 * 页面/组件 进入
 * @param hook
 */
export function usePageIn(hook: () => void) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}

/**
 * 页面/组件 离开
 * @param hook
 */
export function usePageOut(hook: () => void) {
  onBeforeUnmount(hook)
  onDeactivated(hook)
}

export const IS_DEV_PROVIDE_KEY = Symbol() as InjectionKey<boolean>
export function useIsDev() {
  const isDev = import.meta.env.MODE === 'development'
  provide(IS_DEV_PROVIDE_KEY, isDev)
  const get = () => inject(IS_DEV_PROVIDE_KEY)
  return {
    get,
    isDev
  }
}

// expose public api
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance() as any
  if (instance) {
    Object.assign(instance.proxy, apis)
  }
}

export function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: NodeJS.Timeout | null = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
