import { WEB_NAME } from '@/common/static'

const Home = () => import('@/views/Home/Index.vue')
export default {
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    title: WEB_NAME + '-首页',
    elName: '#home'
  },
  children: []
}
