import { ComputedRef, Ref } from 'vue'
import { ComponentPublicInstance } from 'vue'

type Img = string

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentInstance = ComponentPublicInstance<{}, any>
export interface Options {
  images: Img[]
  current: Img
  // rect?: {
  //   width: number
  //   height: number
  //   x: number
  //   y: number
  //   path: string
  // }
}

export type ImgIndex = Ref<number>
export interface Self {
  scale: number
  rotate: number
  startX: number
  startY: number
  finalX: number
  finalY: number
  oldX: number
  oldY: number
  isDown: boolean
  mode: 'horizontal' | 'portrait'
}
export interface ModeArgs {
  currentImg: ComputedRef<Img>
  imgLength: ComputedRef<number>
  open: () => void
  close: () => void
  init?: (options: Options) => void
}
export interface ImagePreviewProps {
  current: Img
  visible: boolean
  list: Img[]
}
