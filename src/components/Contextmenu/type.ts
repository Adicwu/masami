export interface Rect {
  x: number
  y: number
}
export interface Option {
  text: string
  event?: (e: MouseEvent) => void
}
export type InitPay = Rect & {
  options: Option[]
}
