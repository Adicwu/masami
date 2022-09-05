import { WEB_NAME } from '@/common/static'

const Main = () => import('@/views/Main/Index.vue')
export default {
  path: '/comicmain/:id',
  name: 'ComicMain',
  component: Main,
  meta: {
    title: WEB_NAME + '-详情'
  },
  props: true,
  children: []
}
