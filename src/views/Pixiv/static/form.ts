import * as ApiReturns from '@/api/api.type'

export const PIXIV_SEARCH_SORT: {
  name: string
  value: ApiReturns.VilipixSearchSort
}[] = [
  {
    name: '热门',
    value: 'hot'
  },
  {
    name: '最新',
    value: 'new'
  }
]
