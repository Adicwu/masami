/**
 * 主题-颜色变量类别
 */
export type ThemeColorCate = 'deep' | 'light' | 'marked' | 'blue' | 'red'
/**
 * 主题-颜色变量配置
 */
export interface ThemeColorVar {
  /** 形参或key */
  prop: string
  /** 十六进制颜色值 */
  value: string
  /** css变量名称 */
  var: string
  /** 描述 */
  descr: string
  /** elementPlus主题变量 */
  elementPlusVars?: string[]
}
