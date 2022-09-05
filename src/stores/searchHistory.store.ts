import { defineStore } from 'pinia'
import BaseList from '@/class/baseList.class'

export interface SearchHistory {
  date: number
  value: string
}

type SearchHistoryValue = SearchHistory['value']

export const useSearchHistory = defineStore('searchHistory', {
  state: () => ({
    handler: new BaseList<SearchHistoryValue, SearchHistory>(
      'SEARCH_HISTORY',
      'value'
    )
  }),
  getters: {
    list(state) {
      return [...state.handler.list].sort((a, b) => b.date - a.date)
    }
  },
  actions: {
    add(text: SearchHistoryValue) {
      const date = new Date().getTime()
      this.handler.addItem(text, {
        value: text,
        date
      })
    },
    delete(text: SearchHistoryValue) {
      return this.handler.removeItem(text)
    },
    save() {
      this.handler.saveStore()
    },
    clear() {
      this.handler.clear()
    }
  }
})
