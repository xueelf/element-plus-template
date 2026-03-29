import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { useAppStore } from '@/stores/app';
import { getPageTitle } from '@/utils/app';

export const PATH_LOGIN = '/login';
export const PATH_NOT_FOUND = '/error/404';
export const PATH_SERVER_ERROR = '/error/500';
export const PATH_NETWORK_ERROR = '/error/network';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: PATH_NOT_FOUND,
    },
  ],
});

// 白名单
export const whiteList = [PATH_LOGIN];

// 检查路径是否在白名单中（支持前缀匹配，如 '/auth' 会匹配 '/auth/login' 等子路由）
const isInWhiteList = (path: string) => {
  return whiteList.some((white) => path === white || path.startsWith(`${white}/`));
};

router.beforeEach((to) => {
  const appStore = useAppStore();

  if (appStore.token) {
    if (to.path === PATH_LOGIN) {
      return '/';
    }
  } else if (!isInWhiteList(to.path)) {
    return {
      path: PATH_LOGIN,
      query: { redirect: to.path },
    };
  }
});

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title);
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
