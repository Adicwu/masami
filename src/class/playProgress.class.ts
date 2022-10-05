import { jsonParse } from '@sorarain/utils'
import { ref } from 'vue'
import { StorageWatcherCling } from './storageWatcher.class'

interface BaseCacheItem {
  /** 动漫id */
  comicId: number
  /** 播放源id */
  orgId: string
  /** 播放级数 */
  name: string
  /** 播放进度 */
  progress: number
}
type CacheItem = BaseCacheItem & {
  /** 创建时间 */
  date: number
}

const PLAY_PROGRESS_STORE_KEY = 'PLAY_PROGRESS_STORE'

class PlayProgress extends StorageWatcherCling {
  constructor() {
    super(PLAY_PROGRESS_STORE_KEY)
  }
  private cache_ = ref<CacheItem[]>([])
  public get cache() {
    return this.cache_.value
  }

  private get cacheMap() {
    return this.cache_.value.reduce<{ [cacheKey: string]: CacheItem }>(
      (totol, item) => {
        totol[this.cacheItemToName(item)] = item
        return totol
      },
      {}
    )
  }

  private get latestCacheMap() {
    return this.cache_.value.reduce<{ [comicId: string]: CacheItem }>(
      (totol, item) => {
        if (!totol[item.comicId]) {
          totol[item.comicId] = item
        } else if (item.date > totol[item.comicId].date) {
          totol[item.comicId] = item
        }
        return totol
      },
      {}
    )
  }

  private createDate() {
    return new Date().getTime()
  }

  private cacheItemToName(item: BaseCacheItem) {
    return `${item.comicId}-${item.orgId}-${item.name}`
  }

  /**
   * 判断是否存在此集
   * @param name
   * @returns
   */
  public has(name: string) {
    return typeof this.cacheMap[name] !== 'undefined'
  }

  /**
   * 添加集数缓存，如果存在，则会被更新
   * @param item
   */
  public add(item: BaseCacheItem) {
    if (!item.orgId) return
    const name = this.cacheItemToName(item)
    const cacheItem = {
      ...item,
      date: this.createDate()
    }
    if (!this.has(name)) {
      this.cache_.value.push(cacheItem)
    } else {
      const index = this.cache_.value.findIndex(
        (ca) => this.cacheItemToName(ca) === this.cacheItemToName(item)
      )
      this.cache_.value.splice(index, 1, cacheItem)
    }
  }

  /**
   * 删除指定集数缓存
   * @param item
   */
  public remove(item: BaseCacheItem) {
    const index = this.cache_.value.findIndex(
      (ca) => this.cacheItemToName(ca) === this.cacheItemToName(item)
    )
    if (index !== -1) {
      this.cache_.value.splice(index, 1)
    }
  }

  /**
   * 获取指定缓存进度
   * @param name
   * @returns
   */
  public get(name: string) {
    if (this.has(name)) {
      return this.cacheMap[name].progress
    } else {
      return 0
    }
  }

  public saveStore() {
    localStorage.setItem(
      PLAY_PROGRESS_STORE_KEY,
      JSON.stringify(this.cache_.value)
    )
  }

  public getStore() {
    const data = jsonParse<CacheItem[]>(
      localStorage.getItem(PLAY_PROGRESS_STORE_KEY),
      []
    )
    if (data instanceof Array) {
      this.cache_.value = data
    }
  }

  /**
   * 获取指定动漫最后一次记录
   * @param comicId
   * @returns
   */
  public getLatestCache(comicId: BaseCacheItem['comicId']): CacheItem | null {
    return this.latestCacheMap[comicId]
  }
}

let instance: PlayProgress | null
export function createPlayProgress() {
  if (!instance) {
    instance = new PlayProgress()
  }
  return instance
}
export function getPlayProgressInstance() {
  return instance!
}
