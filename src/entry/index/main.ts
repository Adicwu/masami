import moment from 'moment'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { createComicFav } from '@/class/comicFav.class'
import { createPlayHistory } from '@/class/playHistory.class'
import { createPlayProgress } from '@/class/playProgress.class'
import { elementPlusInit } from '@/plugins/elementPlus'
import { createPreloadCdn } from '@/plugins/preloadCdn.class'
import { createTheme } from '@/theme/theme.class'
import { createVueInit } from '@/utils/vue/index'
import { createComicMouseright } from '@/class/comicMouseright.class'

const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$moment = moment

createPreloadCdn()
createTheme()
createPlayProgress().getStore()
createPlayHistory().getStore()
createComicFav().getStore()
createComicMouseright()

app.use(pinia).use(elementPlusInit).use(createVueInit).use(router)
app.mount('#app')

window.addEventListener('unhandledrejection', (e) => {
  e.preventDefault()
})
