import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';

import { router as globalRouter } from '@/router';

// 路由缓存
const routeCache = new Map<RouteKey, any>();

/**
 * 路由跳转
 *
 * 跳转到指定路由，可以替换函数router.push
 *
 *
 * @param inSetup 是否再vue script setup中
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const route = globalRouter.currentRoute;

  const routerPush = router.push;
  const routerBack = router.back;

  // 错误处理包装器
  const safeNavigate = async (navigateFn: () => Promise<any>) => {
    try {
      return await navigateFn();
    } catch (error) {
      if (import.meta.env.DEV) {
        window.$message?.error('页面跳转失败');
      }
      throw error;
    }
  };

  async function routerPushByKey(key: RouteKey, options?: App.Global.RouterPushOptions) {
    return safeNavigate(async () => {
      const { query, params } = options || {};

      const routeLocation: RouteLocationRaw = {
        name: key,
      };

      if (query && Object.keys(query).length) {
        routeLocation.query = query;
      }

      if (params && Object.keys(params).length) {
        routeLocation.params = params;
      }

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(`[Router] Navigating to: ${key}`, options);
      }

      return routerPush(routeLocation);
    });
  }

  function routerPushByKeyWithMetaQuery(key: RouteKey) {
    return safeNavigate(async () => {
      // 使用缓存避免重复获取路由信息
      if (!routeCache.has(key)) {
        const allRoutes = router.getRoutes();
        const meta = allRoutes.find((item) => item.name === key)?.meta || null;
        routeCache.set(key, meta);
      }

      const meta = routeCache.get(key);
      const query: Record<string, string> = {};

      meta?.query?.forEach((item: any) => {
        query[item.key] = item.value;
      });

      return routerPushByKey(key, { query });
    });
  }

  async function toHome() {
    return safeNavigate(async () => {
      return routerPushByKey('root');
    });
  }

  /**
   * Navigate to login page
   *
   * @param loginModule The login module
   * @param redirectUrl The redirect url, if not specified, it will be the current route fullPath
   */
  async function toLogin(redirectUrl?: string) {
    return safeNavigate(async () => {
      const options: App.Global.RouterPushOptions = {};
      console.log(route, 'route');

      const redirect = redirectUrl || route.value.fullPath;
      options.query = {
        redirect,
      };
      return routerPushByKey('login', options);
    });
  }

  /**
   * Redirect from login
   *
   * @param [needRedirect=true] Whether to redirect after login. Default is `true`
   */
  async function redirectFromLogin(needRedirect = true) {
    return safeNavigate(async () => {
      const redirect = getCurrentRoute().query?.redirect as string;

      if (needRedirect && redirect) {
        await routerPush(redirect);
      } else {
        await toHome();
      }
    });
  }

  /**
   * Go back specified steps
   *
   * @param steps Number of steps to go back
   */
  async function goBack(steps = 1) {
    return safeNavigate(async () => {
      for (let i = 0; i < steps; i++) {
        routerBack();
      }
    });
  }

  /**
   * Refresh current page
   */
  async function refreshCurrentPage() {
    return safeNavigate(async () => {
      const currentRoute = getCurrentRoute();
      await routerPushByKey(currentRoute.name as RouteKey, {
        query: currentRoute.query as Record<string, string>,
        params: currentRoute.params as Record<string, string>,
      });
    });
  }

  /**
   * Replace current route
   *
   * @param key Route key
   * @param options Route options
   */
  async function replaceCurrentRoute(key: RouteKey, options?: App.Global.RouterPushOptions) {
    return safeNavigate(async () => {
      const routeLocation: RouteLocationRaw = {
        name: key,
        ...options,
      };
      return router.replace(routeLocation);
    });
  }

  /**
   * Batch navigate to multiple routes
   *
   * @param routes Array of route configurations
   */
  async function batchNavigate(
    routes: Array<{
      key: RouteKey;
      delay?: number;
      options?: App.Global.RouterPushOptions;
    }>,
  ) {
    return safeNavigate(async () => {
      for (const { key, delay = 0, options } of routes) {
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        await routerPushByKey(key, options);
      }
    });
  }

  return {
    routerPush,
    routerBack,
    routerPushByKey,
    routerPushByKeyWithMetaQuery,
    toLogin,
    redirectFromLogin,
    goBack,
    refreshCurrentPage,
    replaceCurrentRoute,
    batchNavigate,
  };
}
