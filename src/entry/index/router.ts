import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getServerIp } from '@/stores/systemConfig.store'
import { ElNotification } from 'element-plus'
import {
  getRouteSCMInstance,
  createRouteSCM
} from '@/class/routeScrollCache.class'
import { WEB_NAME } from '@/common/static'
import { getToken } from '@/stores/user.store'

/**
 * 自动导入路由
 */
function loadRoutes(): RouteRecordRaw[] {
  const mods = import.meta.globEager('../../views/*/route.ts')
  return Object.values(mods).map((item) => item.default)
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Search/Index.vue'),
    meta: {
      title: WEB_NAME,
      dom: '#home'
    }
  },
  ...loadRoutes()
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createRouteSCM()
router.beforeEach((to, from, next) => {
  getRouteSCMInstance().addCache(from.path, from.meta)

  if (to.name !== 'Setting' && !getServerIp()) {
    ElNotification({
      type: 'error',
      title: '配置',
      message: '请先配置服务器地址'
    })
    next({ name: 'Setting' })
  }
  const token = getToken()
  if (!token) {
    location.href = '/'
  }
  next()
})
router.afterEach((to) => {
  getRouteSCMInstance().setScroll(to.path)
  document.title = String(to.meta.title) || WEB_NAME
})

export default router
