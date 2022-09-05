import { WEB_NAME } from '@/common/static'

const Setting = () => import('@/views/Setting/Index.vue')

export default {
  path: '/setting',
  name: 'Setting',
  component: Setting,
  meta: {
    title: WEB_NAME + '-系统设置'
  },
  children: []
}
