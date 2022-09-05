import { WEB_NAME } from '@/common/static'

export default {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/Error/404.vue'),
  meta: {
    title: WEB_NAME + '-404not found'
  }
}
