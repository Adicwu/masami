import { WEB_NAME } from '@/common/static'

const Search = () => import('@/views/Search/Index.vue')
export default {
  path: '/search',
  name: 'Search',
  component: Search,
  meta: {
    title: WEB_NAME + '-搜索',
    elName: '#search .search-main'
  },
  children: []
}
