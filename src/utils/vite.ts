/**
 * 文件引入
 * @param src 文件相当于使用地方的路径
 * @returns
 */
export function importFile(src: string, base = window.location.host) {
  try {
    return new URL(src, base).href
  } catch (e) {
    console.error(e)
    return ''
  }
}
