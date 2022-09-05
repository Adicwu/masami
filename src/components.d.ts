import BaseImg from '@/components/Global/BaseImg.vue'
import ComicFav from '@/components/Global/ComicFav.vue'
import Icon from '@/components/Global/Icon.vue'
import AdBreakTop from '@/components/Global/AdBreakTop.vue'

// 全局组件定义，此项需配合volar插件使用
declare module 'vue' {
  export interface GlobalComponents {
    BaseImg: typeof BaseImg
    ComicFav: typeof ComicFav
    Icon: typeof Icon
    AdBreakTop: typeof AdBreakTop
  }
}
