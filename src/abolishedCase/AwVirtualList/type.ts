export interface InjectProps {
  fakeHeight: number
  addChildStyle: (childId: ChildId, style: ChildStyle) => void
}
export interface ChildStyle {
  height: number
  offsetTop: number
}
export type ChildId = string | number
