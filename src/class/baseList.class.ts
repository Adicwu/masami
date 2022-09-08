import { reactive } from 'vue'
import { jsonParse } from '@sorarain/utils'

export default class BaseList<K = string, V = any> {
  /**
   * 仓库名称
   */
  private storeKey = ''
  /**
   * 列表子项key名称
   */
  private listItemKey: string | null = null

  constructor(storeKey: string, listItemKey: string) {
    this.storeKey = storeKey
    this.listItemKey = listItemKey
    this.getStore()
  }

  private state = reactive({
    list: new Map<K, V>()
  })

  public get list() {
    return [...this.state.list].map(([_, v]) => v)
  }

  public addItem(key: K, value: V) {
    this.state.list.set(key, value)
  }

  public removeItem(key: K) {
    return this.state.list.delete(key)
  }

  public clear() {
    this.state.list.clear()
    localStorage.removeItem(this.storeKey)
  }

  public saveStore() {
    localStorage.setItem(this.storeKey, JSON.stringify(this.list))
  }

  public getStore() {
    const data = jsonParse<V[]>(localStorage.getItem(this.storeKey), [])
    if (!(data instanceof Array)) return
    data.forEach((item: any) => {
      if (this.listItemKey && item[this.listItemKey]) {
        this.addItem(item[this.listItemKey], item)
      }
    })
  }
}
