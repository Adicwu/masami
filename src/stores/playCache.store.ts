import { defineStore } from 'pinia'
import moment from 'moment'

import { sToMs } from '@sorarain/utils'
import { getPlayHistoryInstance } from '@/class/playHistory.class'
import { getPlayProgressInstance } from '@/class/playProgress.class'

export const usePlayCacheStore = defineStore('playCache', {
  getters: {
    playProgressMap() {
      return getPlayProgressInstance().cache
    },
    playHistory() {
      return getPlayHistoryInstance().cache.map((item) => {
        const cache = getPlayProgressInstance().getLatestCache(item.id)
        return {
          ...item,
          playProgress: sToMs(cache?.progress || 0),
          playEpisode: cache?.name || false,
          date: moment(item.date).format('YYYY-MM-DD hh:mm')
        }
      })
    }
  },
  actions: {
    clearHistory() {
      getPlayHistoryInstance().clearStore()
    },
    saveHistory() {
      getPlayHistoryInstance().saveStore()
    },
    removeHistoryById(id: number) {
      getPlayHistoryInstance().remove(id)
    }
  }
})
