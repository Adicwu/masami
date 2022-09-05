export type RequsetFn = (
  tpage: number,
  size: number
) => Promise<{ list: any[]; total: number }>

export interface InjectProps {
  getData: () => any[][]
  columnSize: number
  column: number
  gap: number
}
