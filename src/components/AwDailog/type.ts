export interface Props {
  /** 标题 */
  title?: string
  /** 内容 */
  content: string
  /** 关闭前事件，返回的bool决定是否关闭 */
  beforeClose?: () => boolean | Promise<boolean>
  /** 渲染根节点 */
  to?: string
}
