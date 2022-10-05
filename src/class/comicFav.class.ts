import { jsonParse, arrChildSwap } from '@sorarain/utils'
import { ref } from 'vue'
import { StorageWatcherCling } from './storageWatcher.class'

const COMIC_FAV_STORE_KEY = 'COMIC_FAV_STORE'

export interface Comic {
  /** 动漫id */
  comicId: ComicId
  /** 动漫名称 */
  comicName: string
  /** 动漫封面 */
  comicCover: string
}

export type ComicFavItem = Comic & {
  /** 收藏时间 */
  favDate: number
}

class ComicFav extends StorageWatcherCling {
  constructor() {
    super(COMIC_FAV_STORE_KEY)
  }
  private fav_ = ref<ComicFavItem[]>([])
  public get fav() {
    return this.fav_.value
  }

  public getTime() {
    return new Date().getTime()
  }

  /**
   * 判断是否存在此集
   * @param comicId
   * @returns
   */
  public has(comicId: ComicFavItem['comicId']) {
    return !!~this.fav_.value.findIndex((item) => item.comicId === comicId)
  }

  public index(comicId: ComicFavItem['comicId']) {
    return this.fav_.value.findIndex((item) => item.comicId === comicId)
  }

  public favHandler(comic: Comic) {
    const removeIndex = this.index(comic.comicId)

    if (!!~removeIndex) {
      this.fav_.value.splice(removeIndex, 1)
    } else {
      this.fav_.value.unshift({
        ...comic,
        favDate: this.getTime()
      })
    }
  }

  public saveStore() {
    localStorage.setItem(COMIC_FAV_STORE_KEY, JSON.stringify(this.fav_.value))
  }

  public getStore() {
    const data = jsonParse<ComicFavItem[]>(
      localStorage.getItem(COMIC_FAV_STORE_KEY),
      []
    )
    if (data instanceof Array) {
      this.fav_.value = data
    }
  }

  public exChange(aIndex: number, bIndex: number) {
    arrChildSwap(this.fav_.value, aIndex, bIndex)
  }
}

let instance: ComicFav | null
export function createComicFav() {
  if (!instance) {
    instance = new ComicFav()
  }
  return instance
}
export function getComicFavInstance() {
  return instance!
}
