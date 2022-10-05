import { jsonParse } from '@sorarain/utils'
import { ref } from 'vue'
import { StorageWatcherCling } from './storageWatcher.class'

interface CacheItem {
  id: number
  cover: string
  name: string
  date: number
}

const PLAY_HISTORY_STORE_KEY = 'PLAY_HISTORY_STORE'

/**
 * 播放历史缓存
 */
class PlayHistory extends StorageWatcherCling {
  constructor() {
    super(PLAY_HISTORY_STORE_KEY)
  }
  /** 缓存列表 */
  private cache_ = ref<CacheItem[]>([])

  public get cache() {
    return this.cache_.value
  }

  /**
   * 添加历史数据
   * @param item 动漫信息
   */
  public add(item: Omit<CacheItem, 'date'>) {
    const index = this.cache_.value.findIndex((ch) => ch.id === item.id)
    if (!!~index) {
      this.cache_.value.splice(index, 1)
    }
    this.cache_.value.unshift({
      ...item,
      date: new Date().getTime()
    })
  }

  /**
   * 删除指定id数据
   * @param id 动漫id
   */
  public remove(id: CacheItem['id']) {
    const index = this.cache_.value.findIndex((ch) => ch.id === id)
    if (!!~index) {
      this.cache_.value.splice(index, 1)
    }
  }

  /**
   * 数据-本地保存
   */
  public saveStore() {
    localStorage.setItem(
      PLAY_HISTORY_STORE_KEY,
      JSON.stringify(this.cache_.value)
    )
  }

  /**
   * 数据-本地获取
   */
  public getStore() {
    const data = jsonParse<CacheItem[]>(
      localStorage.getItem(PLAY_HISTORY_STORE_KEY),
      []
    )
    if (data instanceof Array) {
      this.cache_.value = data
    }
  }

  /**
   * 数据-本地清空
   */
  public clearStore() {
    this.cache_.value.splice(0)
    localStorage.removeItem(PLAY_HISTORY_STORE_KEY)
  }
}

let instance: PlayHistory | null
export function createPlayHistory() {
  if (!instance) {
    instance = new PlayHistory()
  }
  return instance
}
export function getPlayHistoryInstance() {
  return instance!
}
