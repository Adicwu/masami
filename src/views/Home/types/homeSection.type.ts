import * as Api from '@apis/index'

export type Comic = Api.GetHomeMixData

export interface Tabs<T> {
  active: T
  list: {
    name: string
    key: T
    index?: number
  }[]
}
