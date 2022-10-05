import { Contextmenu } from '@/components/Contextmenu'
import { openNewMain } from '@/router/jump'

class ComicMouseright {
  constructor() {
    this.addEvent()
  }
  findComicId(e: HTMLElement) {
    let id = null
    while (e && e.tagName !== 'BODY' && !id) {
      id = e.getAttribute('data-comicid')
      e = e.parentNode as HTMLElement
    }
    return id
  }
  addEvent() {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      const id = this.findComicId(e.target as HTMLElement)
      if (!id) return
      Contextmenu({
        x: e.clientX,
        y: e.clientY,
        options: [
          {
            text: '在新标签中打开视频',
            event() {
              openNewMain(id)
            }
          }
        ]
      })
    })
  }
}

let instance: ComicMouseright | null
export function createComicMouseright() {
  if (!instance) {
    instance = new ComicMouseright()
  }
  return instance
}
export function getComicMouserightInstance() {
  return instance!
}
