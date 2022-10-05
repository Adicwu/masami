/**
 * storage监听者
 */
class StorageWatcher {
  private deps: Map<string, Set<() => void>> = new Map()
  constructor() {
    this.watch()
  }
  public addDep(storageKey: string, cb: () => void) {
    const dep = this.deps.get(storageKey)
    if (dep) {
      dep.add(cb)
    } else {
      this.deps.set(storageKey, new Set([cb]))
    }
  }
  private notify(storageKey: string) {
    const dep = this.deps.get(storageKey)
    if (!dep) return
    dep.forEach((cb) => cb())
  }
  private watch() {
    window.addEventListener('storage', (e) => {
      if (e.url.includes('main.html#')) {
        this.notify(e.key || '')
      }
    })
  }
}
const watcher = new StorageWatcher()

/**
 * 方便storage存储类的扩展继承类
 * @param key storage的键
 */
export class StorageWatcherCling {
  constructor(key: string) {
    watcher.addDep(key, () => {
      this.getStore()
    })
  }
  /** 需要在子类中重写此方法 */
  public getStore() {
    //
  }
}

export default watcher
