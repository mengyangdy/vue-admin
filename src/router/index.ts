import type { App } from "vue";

import { createRouter, rbacAccessPlugin } from "./pro-router";
import type {
  RbacAccessPluginBaseServiceReturned,
  RbacAccessPluginRouteRecordRawWithStringComponent,
} from "./pro-router";
import { createWebHistory } from "vue-router";

import {
  rootRoute,
  ignoreAccessRoutes,
  notFoundRoute,
  LOGIN_ROUTE_PATH,
  ROOT_ROUTE_NAME,
  accessRoutes,
  pageMap,
} from "./routes";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";

export async function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [rootRoute, ...ignoreAccessRoutes, notFoundRoute],
    plugins: [
      rbacAccessPlugin({
        service: async () => {
          const appStore = useAppStore();
          const userStore = useUserStore();
          if (userStore.user.token && userStore.user.roles.length <= 0) {
            await userStore.fetchUpdateUserInfo();
          }
          const baseInfo: RbacAccessPluginBaseServiceReturned = {
            logined: !!userStore.user.token,
            homePath: userStore.homePath,
            loginPath: LOGIN_ROUTE_PATH,
            parentNameForAddRoute: ROOT_ROUTE_NAME,
            onRoutesBuilt: (routes) => {
              userStore.routes = routes;
            },
          };

          if (import.meta.env.VITE_AUTH_ROUTE_MODE === "static") {
            return {
              ...baseInfo,
              mode: "frontend",
              routes: accessRoutes,
              roles: userStore.user.roles,
            };
          }
          return {
            ...baseInfo,
            mode: "backend",
            fetchRoutes: async () => {
              await userStore.getMenuAll(); // 获取菜单
              // 将 RouteRecordRaw[] 转换为 RouteRecordRawWithStringComponent[]
              return userStore.routes as RbacAccessPluginRouteRecordRawWithStringComponent[];
            },
            resolveComponent: (component) => {
              let dynamicComponent = pageMap[component];
              if (!dynamicComponent) {
                dynamicComponent = () =>
                  import("@/views/demos/fallback/404.vue");
                if (__DEV__) {
                  console.warn(
                    `[Router] 未找到组件: ${component}，替换成 404 页面`
                  );
                }
              }
              return dynamicComponent;
            },
          };
        },
      }),
    ],
  });
  app.use(router);
  await router.isReady();
}
