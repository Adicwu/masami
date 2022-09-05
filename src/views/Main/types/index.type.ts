import * as Api from '@apis/index'

export type Playlist = Api.GetComicMainReturn['playlist']
export type ComicName = Api.GetComicMainReturn['title']
export interface Anthology {
  /** 当前选中的集的地址 */
  current: string
  /** 错误集的集合 */
  bads: string[]
  /** 播放源及其地址集 */
  readonly list: {
    /** 源名称 */
    name: string
    /** 源key */
    orgId: string
    /** 集列表 */
    values: {
      /** 集名称 */
      name: string
      /** 集地址 */
      value: string
    }[]
  }[]
}
