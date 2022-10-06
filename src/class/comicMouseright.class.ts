import { Contextmenu } from '@/components/Contextmenu'
import { createNewMainPath, openNewMain } from '@/router/jump'
import { copyText } from '@/utils/adLoadsh'
import { useFavStore } from '@/stores/fav.store'
import { getComicMain } from '@/api'
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
      const id = this.findComicId(e.target as HTMLElement)
      if (id) {
        e.preventDefault()
        const favStore = useFavStore()
        const isFav = favStore.isFavComic(id)
        Contextmenu({
          x: e.clientX,
          y: e.clientY,
          options: [
            {
              text: '在新标签中打开视频',
              icon: 'player',
              event() {
                openNewMain(id)
              }
            },
            {
              text: '复制播放地址',
              icon: 'details',
              event() {
                copyText(createNewMainPath(id))
              }
            },
            {
              text: isFav ? '取消追番' : '追番',
              icon: isFav ? 'icon_love_hover' : 'icon_love',
              async event() {
                const info = await getComicMain(id)
                if (!info) return
                favStore.comicFav({
                  comicId: id,
                  comicCover: info?.cover,
                  comicName: info?.title
                })
                favStore.saveComicFav()
              }
            }
          ]
        })
      }
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
