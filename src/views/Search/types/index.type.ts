import { Option } from '@/components/Form/type'

export interface FilterConfig<T> {
  label: string
  key: keyof T
  options: Option[]
  rightCancle: boolean
}
