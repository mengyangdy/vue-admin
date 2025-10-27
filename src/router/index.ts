import type { App } from 'vue';

import { createWebHistory } from 'vue-router';

import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';

import {
  autoRedirectPlugin,
  createRouter,
  nMenuPlugin,
  rbacAccessPlugin,
  refreshPlugin,
} from './pro-router';
import type {
  RbacAccessPluginBaseServiceReturned,
  RbacAccessPluginRouteRecordRawWithStringComponent,
} from './pro-router';
import {
  LOGIN_ROUTE_PATH,
  ROOT_ROUTE_NAME,
  accessRoutes,
  ignoreAccessRoutes,
  notFoundRoute,
  pageMap,
  rootRoute,
} from './routes';

export async function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [rootRoute, ...ignoreAccessRoutes, notFoundRoute],
    plugins: [
      rbacAccessPlugin({
        service: async () => {
          const authStore = useAuthStore();
          // && userStore.user.roles.length <= 0
          // if (authStore.token) {
          //   await authStore.getUserInfo();
          // }
          const baseInfo: RbacAccessPluginBaseServiceReturned = {
            logined: !!authStore.token,
            homePath: import.meta.env.VITE_ROUTE_HOME,
            loginPath: LOGIN_ROUTE_PATH,
            parentNameForAddRoute: ROOT_ROUTE_NAME,
            onRoutesBuilt: (routes) => {
              authStore.routes = routes;
            },
          };

          if (import.meta.env.VITE_AUTH_ROUTE_MODE === 'static') {
            return {
              ...baseInfo,
              mode: 'frontend',
              routes: accessRoutes,
              roles: [],
            };
          }
          return {
            ...baseInfo,
            mode: 'backend',
            fetchRoutes: async () => {
              // await userStore.getMenuAll(); // 获取菜单
              // // 将 RouteRecordRaw[] 转换为 RouteRecordRawWithStringComponent[]
              // return userStore.routes as RbacAccessPluginRouteRecordRawWithStringComponent[];
              return [];
            },
            resolveComponent: (component) => {
              let dynamicComponent = pageMap[component];
              if (!dynamicComponent) {
                dynamicComponent = () => import('@/views/demos/fallback/404.vue');
                if (__DEV__) {
                  console.warn(`[Router] 未找到组件: ${component}，替换成 404 页面`);
                }
              }
              return dynamicComponent;
            },
          };
        },
      }),
      /**
       * 自动重定向到目标路由插件
       */
      autoRedirectPlugin({
        homePath: () => import.meta.env.VITE_ROUTE_HOME,
      }),
      /**
       * 菜单插件，将数据转换成n-menu菜单数据
       */
      nMenuPlugin({
        service: () => {
          const authStore = useAuthStore();
          return {
            routes: authStore.routes,
            resolveMenuItem(item, rawItem) {
              const { titleI18nKey } = rawItem.meta ?? {};
              return {
                ...item,
                label: titleI18nKey ? $t(titleI18nKey) : item.label,
              };
            },
          };
        },
      }),
      /**
       * 刷新插件
       */
      refreshPlugin(),
    ],
  });
  app.use(router);
  await router.isReady();
}
