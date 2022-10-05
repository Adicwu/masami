import { App } from 'vue'
import moment from 'moment'
import { createComicFav } from '@/class/comicFav.class'
import { createPlayHistory } from '@/class/playHistory.class'
import { createPlayProgress } from '@/class/playProgress.class'
import { createPreloadCdn } from '@/plugins/preloadCdn.class'
import { createTheme } from '@/theme/theme.class'
import { createPinia } from 'pinia'

export function baseLoader(app: App<Element>) {
  const pinia = createPinia()

  app.config.globalProperties.$moment = moment

  createPreloadCdn()
  createTheme()
  createPlayProgress().getStore()
  createPlayHistory().getStore()
  createComicFav().getStore()

  app.use(pinia)

  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault()
  })
}
