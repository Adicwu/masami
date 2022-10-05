import { Plugin } from 'vue'

import {
  ElTabs,
  ElTabPane,
  ElSelect,
  ElOption,
  ElNotification,
  ElSlider,
  ElTooltip
} from 'element-plus'
const comps = [ElTabs, ElTabPane, ElSelect, ElOption, ElSlider, ElTooltip]

const plugins = [ElNotification]
export const elementPlusInit: Plugin = {
  install(app) {
    comps.forEach((comp) => {
      app.component(comp.name, comp)
    })
    plugins.forEach((plugin) => {
      app.use(plugin)
    })
  }
}
