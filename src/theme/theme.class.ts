import { jsonParse } from '@sorarain/utils'
import { ref } from 'vue'
import { DF_SYSTEM_COLOR, THEME_DARK } from './static'
import { ThemeColorVar } from './type'

const THEMECOLOR_STORE_KEY = 'THEMECOLOR_STORE'

/**
 * 主题类
 */
class Theme {
  constructor() {
    this.init()
  }

  private current_ = ref<ThemeColorVar[]>([])
  public get current() {
    return this.current_
  }

  /**
   * 主题样式初始化
   */
  private init() {
    this.colorVarInit(this.getLocalColor())
  }

  /**
   * 预设主题初始化
   * @param preset 预设颜色集
   */
  // public colorPresetInit(preset: string[]) {
  //   DF_SYSTEM_COLOR.forEach((item, index) => {
  //     document.documentElement.style.setProperty(
  //       item.var,
  //       preset[index] || '#000'
  //     )
  //   })
  // }

  /**
   * 颜色初始化
   * @param editedVar 颜色配置列表
   */
  public colorVarInit(editedVar?: ThemeColorVar[]) {
    if (editedVar?.length === 0) return
    this.current_.value =
      editedVar ||
      DF_SYSTEM_COLOR.map((item, index) => ({
        ...item,
        value: THEME_DARK[index] || '#000'
      }))
    this.current_.value.forEach((item) => {
      document.documentElement.style.setProperty(item.var, item.value)
      ;(item.elementPlusVars || []).forEach((el) => {
        document.documentElement.style.setProperty(el, item.value, 'important')
      })
    })
  }

  /**
   * 获取本地信息
   * @returns
   */
  public getLocalColor() {
    return jsonParse<ThemeColorVar[]>(
      localStorage.getItem(THEMECOLOR_STORE_KEY),
      []
    )
  }

  /**
   * 保存配置到本地
   * @param editedVar
   */
  public saveLocalColor(editedVar: ThemeColorVar[]) {
    localStorage.setItem(THEMECOLOR_STORE_KEY, JSON.stringify(editedVar))
  }

  public clearLocalColor() {
    localStorage.removeItem(THEMECOLOR_STORE_KEY)
    this.colorVarInit()
  }
}
/**
 * 主题实例
 */
let themeInstance: Theme | null
export function createTheme() {
  if (!themeInstance) {
    themeInstance = new Theme()
  }
  return themeInstance
}
export function getThemeInstance() {
  return themeInstance
}
