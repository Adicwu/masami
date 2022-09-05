import { CSSProperties } from 'vue'

export type RequsetFn = (
  /** 第几页 */
  tpage: number,
  /** 每页大小 */
  size: number
) => Promise<{
  /** 返回列表 */
  list: DataItem[]
  /** 全列表总数 */
  total: number
}>

export interface AwItemRect {
  width: number
  height: number
}

/** 请求返回数据的具体项 */
export type DataItem = {
  w: number
  h: number
  id: number | string
} & any

export interface ColumnsQueue {
  /** 当前列内item */
  list: {
    /** 数据源 */
    item: DataItem
    /** 渲染上偏移 */
    y: number
    /** 自身实际渲染高度 */
    h: number
    /*** 样式集 */
    style: CSSProperties
  }[]
  /** 当前列高度 */
  height: number
}
