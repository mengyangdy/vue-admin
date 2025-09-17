import type {
  RouteLocationNormalizedGeneric,
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from "vue-router";
import { ProRouterPlugin } from "../types";
import {
  ensureRouteName,
  generateRouteComponentName,
  isRouteName,
} from "../utils/route";
import { ROUTE_NAME } from "../constant";

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
        route?: RouteRecordRaw
      ) {
        return isRouteName(parentOrRoute)
          ? originalAddRoute(parentOrRoute, normalizeRoutes([route!])[0])
          : originalAddRoute(normalizeRoutes([parentOrRoute])[0]);
      };
      router.beforeResolve((to) => {
        const namespace = "default";
        const normalizedComponent = normalizeRouteResolvedComponent(
          to,
          namespace
        );
      });
    },
  };
}

function normalizeRoutes(
  routes: RouteRecordRaw[],
  parents: RouteRecordRaw[] = []
) {
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
      newRoute.children = normalizeRoutes(newRoute.children, [
        ...parents,
        newRoute,
      ]);
    }
    return newRoute;
  });
}

function normalizeRouteResolvedComponent(
  route: RouteLocationNormalizedGeneric,
  namespace: string = "default"
) {
  const currentRoute = route.matched[route.matched.length - 1];
  const currentRouteComponent = currentRoute?.components?.[namespace];
  if (!currentRouteComponent) {
    return;
  }
  if (
    currentRouteComponent.name &&
    currentRouteComponent.name !== (currentRouteComponent as any).__namne
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
