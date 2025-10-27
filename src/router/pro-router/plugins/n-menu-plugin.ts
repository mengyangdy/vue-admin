import { VNodeChild, computed, h } from 'vue';

import type { MenuOption } from 'naive-ui';
import type { Merge } from 'type-fest';
import type { RouteLocationNormalizedGeneric, RouteRecordRaw, Router } from 'vue-router';

import { useSvgIcon } from '@/hooks/common/icon';

import type { ProRouterPlugin } from '../types';

const { SvgIconVNode } = useSvgIcon();

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 菜单标题
     */
    title?: string;
    /**
     * 菜单图标
     */
    icon?: string;
    /**
     * 是否不在菜单中显示
     * @default false
     */
    hideInMenu?: boolean;
    /**
     * 菜单排序，越小越靠前
     */
    order?: number;
  }

  interface Router {
    /**
     * 根据路由数据构建菜单
     */
    buildMenus?: () => MenuOption[];
  }
}

type ServiceRoute = Merge<RouteRecordRaw, { component?: any; children?: any[] }>;

interface NMenuPluginOptions {
  service: () => {
    routes: ServiceRoute[];
    /**
     * 处理菜单项
     * @param item 处理后的菜单项
     * @param rawItem 原始菜单项
     */
    resolveMenuItem: (item: MenuOption, rawItem: ServiceRoute) => MenuOption;
  };
}

export function nMenuPlugin({ service }: NMenuPluginOptions): ProRouterPlugin {
  return ({ router, onUnmount }) => {
    router.afterEach((to) => {
      if (!router.buildMenus) {
        const finalMenus = computed(() => {
          const { routes, resolveMenuItem } = service();
          return covertRoutesToMenus(routes, {
            to,
            router,
            resolveMenuItem,
          });
        });
        router.buildMenus = () => {
          return finalMenus.value;
        };
      }
    });
    onUnmount(() => {
      delete router.buildMenus;
    });
  };
}

function builtinResolveIcon(icon: string): VNodeChild {
  if (!icon) {
    const iconVNode = SvgIconVNode({
      icon: 'ant-design:menu-outlined',
      fontSize: 20,
    });
    return iconVNode ? iconVNode() : null;
  }
  if (isExternalIcon(icon)) {
    return h('img', {
      src: icon,
      style: {
        width: '18px',
        height: '18px',
        'object-fit': 'contain',
      },
    });
  }
  const iconVNode = SvgIconVNode({
    icon,
    fontSize: 20,
  });
  return iconVNode ? iconVNode() : null;
}

function sortRoutesByMetaOrder(routes: ServiceRoute[]) {
  return routes.sort((a, b) => {
    return (a.meta?.order ?? Number.MAX_SAFE_INTEGER) - (b.meta?.order ?? Number.MAX_SAFE_INTEGER);
  });
}

function isRelativePath(path: string) {
  return !path.startsWith('/');
}

function isExternalIcon(icon: string) {
  return icon.startsWith('http://') || icon.startsWith('https://');
}

function buildRouteFullPath(route: ServiceRoute, parents: ServiceRoute[]) {
  const matches = [...parents, route];
  const fullPathList: string[] = [];
  while (matches.length > 0) {
    const record = matches.pop();
    if (!record) {
      break;
    }
    fullPathList.unshift(record.path);
    if (!isRelativePath(record.path)) {
      fullPathList[0] = fullPathList[0].slice(1);
      break;
    }
  }
  return [''].concat(fullPathList).join('/');
}

function covertRoutesToMenus(
  routes: ServiceRoute[],
  {
    router,
    to,
    resolveMenuItem,
  }: {
    router: Router;
    to: RouteLocationNormalizedGeneric;
    resolveMenuItem: (item: MenuOption, rawItem: ServiceRoute) => MenuOption;
  },
) {
  routes = sortRoutesByMetaOrder(routes);
  const traverse = (routes: ServiceRoute[], parents: ServiceRoute[] = []) => {
    return routes.map((route) => {
      const { icon, title, hideInMenu = false } = route.meta ?? {};
      const routeFullPath = buildRouteFullPath(route, parents);
      const resolvedRoute = router.resolve(routeFullPath, to);
      const menu: MenuOption = {
        label: title,
        show: !hideInMenu,
        key: resolvedRoute.fullPath,
      };
      menu.icon = () => {
        return builtinResolveIcon(icon ?? 'ant-design:menu-outlined');
      };
      if (route.children && route.children.filter((item) => !item.meta?.hideInMenu).length > 0) {
        menu.children = traverse(sortRoutesByMetaOrder([...route.children]), [...parents, route]);
      }
      return resolveMenuItem ? resolveMenuItem(menu, route) : menu;
    });
  };
  return traverse(routes, []);
}
