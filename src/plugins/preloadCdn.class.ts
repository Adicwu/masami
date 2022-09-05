import { DF_CDNS } from '@/common/cdns'

export type PreloadRels = 'stylesheet' | 'font' | 'javascript'
export interface PreloadCDN {
  name?: string
  link: string
  rel: PreloadRels
  unable?: boolean
}
/**
 * link cdn挂载
 */
export default class PreloadCdn {
  private preloadCdns: PreloadCDN[] = [...DF_CDNS]
  private preloadMap: Record<PreloadRels, { as: string }> = {
    stylesheet: {
      as: 'style'
    },
    font: {
      as: 'font'
    },
    javascript: {
      as: 'script'
    }
  }
  constructor() {
    this.preload()
  }
  private preload() {
    // 不要合并下列循环

    // 预加载挂载
    this.preloadCdns.forEach(({ link, rel }) => {
      const el = document.createElement('link')
      el.rel = 'preload'
      el.as = this.preloadMap[rel].as
      el.href = link
      document.head.appendChild(el)
    })
    // 使用挂载
    this.preloadCdns.forEach(({ link, rel, unable }) => {
      if (unable && unable === true) return
      if (rel === 'javascript') {
        const el = document.createElement('script')
        el.type = 'text/javascript'
        el.src = link
        document.body.append(el)
      } else {
        const el = document.createElement('link')
        el.rel = rel
        el.href = link
        document.head.appendChild(el)
      }
    })
  }
}

/**
 * cdn挂载
 * @returns
 */
export function createPreloadCdn() {
  return new PreloadCdn()
}
