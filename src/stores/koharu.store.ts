import { defineStore } from 'pinia'

export const useKoharu = defineStore('koharu', {
  state: () => ({
    visible: true
  }),
  actions: {
    toggle(visible: boolean) {
      this.visible = visible
    },
    say(text: string) {
      //
    }
  }
})
