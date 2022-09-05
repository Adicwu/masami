import { Option } from '@comps/Form/type'

function nameToOption(names: string[]): Option[] {
  return names.map((name) => ({
    name,
    value: name
  }))
}

export const SEARCH_FILTER: {
  [prop: string]: Option[]
} = {
  RELEASE_TIME: [
    {
      name: '全部',
      value: 0
    },
    ...Array(21)
      .fill(0)
      .map((item, index) => ({
        name: 2021 - index,
        value: 2021 - index
      }))
  ],
  // 97
  LETTER: [
    {
      name: '全部',
      value: ''
    },
    ...nameToOption(
      Array(26)
        .fill(0)
        .map((item, index) => String.fromCharCode(65 + index))
    )
  ],
  ORDER: [
    {
      name: '更新时间',
      value: 'time'
    },
    {
      name: '评分',
      value: 'score'
    },
    {
      name: '总排行',
      value: 'hits'
    }
  ]
}
