import { defineStore } from 'pinia'
import * as FnReturns from '@/api/type'
import { getComicFavInstance } from '@/class/comicFav.class'
import { useFavStore } from './fav.store'
import { ElNotification } from 'element-plus'
import { toComicMain } from '@/router/jump'

type ComicUpdateInfo = FnReturns.GetHomeMixData['perweek']

/**
 * 由于目前接口特性，故只有在首页home.vue中才会获取数据
 */
export const useComicUpdate = defineStore('comicUpdate', {
  state() {
    return {
      comic: new Map<
        ComicId,
        {
          updateTime: string
          status: string
          day: number
        }
      >()
    }
  },
  actions: {
    setComic(comic: ComicUpdateInfo) {
      comic.forEach(({ name, value, key }) => {
        value.forEach((item) => {
          this.comic.set(item.id, {
            updateTime: name,
            status: item.season,
            day: +key + 1
          })
        })
      })
    },
    /**
     * 获取动漫更新信息
     * @param comicId
     * @returns
     */
    getComicUpdateInfo(comicId: ComicId) {
      return this.comic.get(comicId)
    },
    /**
     * 当日更新提示
     */
    notify() {
      const fav = useFavStore()
      const today = new Date().getDay()
      fav.comicFavs.forEach((comic) => {
        const update = this.comic.get(comic.comicId)
        if (!update) return
        if (today === update.day) {
          window.requestAnimationFrame(() => {
            const notify = ElNotification({
              message: `<strong style="font-size: 20px;color: var(--font-color)">${comic.comicName}</strong> <br/> 你的订阅更新辣，点击前往！`,
              duration: 10000,
              dangerouslyUseHTMLString: true,
              onClick() {
                toComicMain(comic.comicId, undefined, {
                  latest: 1
                })
                notify.close()
              }
            })
          })
        }
      })

      // getComicFavInstance().comicUpdateNotify()
    }
  }
})
