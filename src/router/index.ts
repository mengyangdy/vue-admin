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

import { useAuthStore } from "@/store/modules/auth";

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
              console.log("🚀 ~ index.ts:40 ~ setupRouter ~ routes:", routes);
              // userStore.routes = routes;
            },
          };

          if (import.meta.env.VITE_AUTH_ROUTE_MODE === "static") {
            return {
              ...baseInfo,
              mode: "frontend",
              routes: accessRoutes,
              roles: [],
            };
          }
          return {
            ...baseInfo,
            mode: "backend",
            fetchRoutes: async () => {
              // await userStore.getMenuAll(); // 获取菜单
              // // 将 RouteRecordRaw[] 转换为 RouteRecordRawWithStringComponent[]
              // return userStore.routes as RbacAccessPluginRouteRecordRawWithStringComponent[];
              return [];
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
