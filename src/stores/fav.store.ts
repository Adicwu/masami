import { defineStore } from 'pinia'
import { getComicFavInstance, Comic } from '@/class/comicFav.class'

export type ComicFavInfo = Comic

export const useFavStore = defineStore('favStore', {
  getters: {
    comicFavs() {
      return getComicFavInstance().fav
    }
  },
  actions: {
    comicFav(comic: Comic) {
      getComicFavInstance().favHandler(comic)
    },
    isFavComic(id: ComicId) {
      return getComicFavInstance().has(id)
    },
    saveComicFav() {
      getComicFavInstance().saveStore()
    },
    exChange(aId: ComicId, bId: ComicId) {
      let aIndex = 0,
        bIndex = 0
      this.comicFavs.forEach((item, index) => {
        if (aId === item.comicId) {
          aIndex = index
        }
        if (bId === item.comicId) {
          bIndex = index
        }
      })
      getComicFavInstance().exChange(aIndex, bIndex)
    }
  }
})
