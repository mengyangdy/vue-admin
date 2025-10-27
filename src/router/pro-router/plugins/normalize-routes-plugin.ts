import type {
  RouteLocationNormalizedGeneric,
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from 'vue-router';

import { ROUTE_COMPONENT_NAME, ROUTE_NAME } from '../constant';
import { ProRouterPlugin } from '../types';
import { ensureRouteName, generateRouteComponentName, isRouteName } from '../utils/route';

declare module 'vue-router' {
  interface RouteMeta {
    [ROUTE_NAME]?: string | symbol;
    [ROUTE_COMPONENT_NAME]?: string | undefined;
  }
}

export function normalizeRoutesPlugin(): ProRouterPlugin {
  return {
    resolveOptions: (options) => {
      return {
        ...options,
        routes: normalizeRoutes(options.routes as RouteRecordRaw[]),
      };
    },
    install: ({ router }) => {
      const originalAddRoute = router.addRoute;

      router.addRoute = function addRoute(
        parentOrRoute: NonNullable<RouteRecordNameGeneric> | RouteRecordRaw,
        route?: RouteRecordRaw,
      ) {
        return isRouteName(parentOrRoute)
          ? originalAddRoute(parentOrRoute, normalizeRoutes([route!])[0])
          : originalAddRoute(normalizeRoutes([parentOrRoute])[0]);
      };

      router.beforeResolve((to) => {
        const namespace = 'default';
        const normalizedComponent = normalizeRouteResolvedComponent(to, namespace);
        if (normalizedComponent) {
          const currentRoute = to.matched[to.matched.length - 1];
          if (currentRoute.components) {
            currentRoute.components[namespace] = { ...normalizedComponent };
          }
          currentRoute.meta = {
            ...currentRoute.meta,
            [ROUTE_COMPONENT_NAME]: normalizedComponent.__name,
          };
        }
      });
    },
  };
}

function normalizeRoutes(routes: RouteRecordRaw[], parents: RouteRecordRaw[] = []) {
  return routes.map((route) => {
    const routeName = ensureRouteName(route);
    const newRoute: RouteRecordRaw = {
      ...route,
      name: routeName,
      meta: {
        ...(route.meta ?? {}),
        [ROUTE_NAME]: routeName,
      },
    };
    if (newRoute.children && newRoute.children.length > 0) {
      newRoute.children = normalizeRoutes(newRoute.children, [...parents, newRoute]);
    }
    return newRoute;
  });
}

function normalizeRouteResolvedComponent(
  route: RouteLocationNormalizedGeneric,
  namespace: string = 'default',
) {
  const currentRoute = route.matched[route.matched.length - 1];
  const currentRouteComponent = currentRoute?.components?.[namespace];
  if (!currentRouteComponent) {
    return;
  }
  if (
    currentRouteComponent.name &&
    currentRouteComponent.name !== (currentRouteComponent as any).__name
  ) {
    return {
      ...currentRouteComponent,
      __name: currentRouteComponent.name,
    };
  }
  const newRouteComponentName = generateRouteComponentName(route);
  if (
    !currentRouteComponent.name &&
    (currentRouteComponent as any).__name !== newRouteComponentName
  ) {
    return {
      ...currentRouteComponent,
      __name: newRouteComponentName,
    };
  }
}
