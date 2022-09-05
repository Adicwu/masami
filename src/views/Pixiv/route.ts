import { WEB_NAME } from '@/common/static'

const Pixiv = () => import('./Index.vue')
const PixivMain = () => import('./Routes/PixivMain/Index.vue')
const PixivPainter = () => import('./Routes/PixivPainter/Index.vue')
export default {
  path: '/pixiv',
  name: 'Pixiv',
  component: Pixiv,
  meta: {
    title: WEB_NAME + '-Pixiv',
    elName: '.pixiv-content'
  },
  children: [
    {
      path: 'pixiv-main/:id',
      name: 'PixivMain',
      component: PixivMain,
      props: true,
      meta: {
        title: WEB_NAME + '-图片详情'
      }
    },
    {
      path: 'pixiv-painter/:id',
      name: 'PixivPainter',
      component: PixivPainter,
      props: true,
      meta: {
        title: WEB_NAME + '-画师'
      }
    }
  ]
}
