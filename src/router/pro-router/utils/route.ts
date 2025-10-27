import type { App } from 'vue';

import type { Router } from 'vue-router';
import type {
  RouteLocationNormalizedGeneric,
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from 'vue-router';

import {
  ALREADY_INSTALLED,
  APP,
  EFFECT_SCOPE,
  ROUTER_PLUGIN_AUTO_GENERATED,
  RUN_WITH_APP_HANDLERS,
  UNMOUNT_HANDLERS,
} from '../constant';
import { normalizeRoutesPlugin } from '../plugins/normalize-routes-plugin';
import {
  ProRouterObjectPlugin,
  ProRouterOptions,
  ProRouterPlugin,
  ProRouterPluginCleanupHandler,
} from '../types';

let uid = 0;

export function ensureRouteName(route: RouteRecordRaw) {
  return route.name ? route.name : generateRouteName();
}

export function generateRouteName() {
  return `${++uid}${ROUTER_PLUGIN_AUTO_GENERATED}`;
}

export function isRouteName(name: any): name is RouteRecordNameGeneric {
  return typeof name === 'string' || typeof name === 'symbol';
}

export function generateRouteComponentName(route: RouteLocationNormalizedGeneric) {
  return `${route.fullPath}${ROUTER_PLUGIN_AUTO_GENERATED}`;
}

export function resolveOptions(options: ProRouterOptions) {
  const pluginCleanups: ProRouterPluginCleanupHandler[] = [];

  const { plugins = [], ...vueRouterOptions } = options;
  const builtinPlugins = [normalizeRoutesPlugin()];
  const objectPlugins = [...builtinPlugins, ...plugins].map((plugin) =>
    convertToObjectPlugin(plugin, pluginCleanups),
  );

  const finalVrOptions = objectPlugins.reduce((p, c) => {
    if (c.resolveOptions) {
      return c.resolveOptions(p);
    }
    return p;
  }, vueRouterOptions);

  return {
    vrOptions: finalVrOptions,
    plugins: objectPlugins,
    pluginCleanups,
  };
}

export function convertToObjectPlugin(
  plugin: ProRouterPlugin,
  pluginCleanups: ProRouterPluginCleanupHandler[],
): ProRouterObjectPlugin {
  if (typeof plugin === 'function') {
    return {
      install: (...args) => {
        const exposed = plugin(...args);
        if (exposed && exposed.onCleanup) {
          pluginCleanups.push(exposed.onCleanup);
        }
      },
    };
  }
  return plugin;
}

export function prepareInstall(app: App, router: Router) {
  if (router[ALREADY_INSTALLED]) {
    return;
  }
  router[APP] = app;
  router[ALREADY_INSTALLED] = true;
  app.onUnmount(() => {
    router[EFFECT_SCOPE]?.stop();
    router[UNMOUNT_HANDLERS]?.forEach((handler) => handler());
    delete router[APP];
    delete router[EFFECT_SCOPE];
    delete router[UNMOUNT_HANDLERS];
    delete router[ALREADY_INSTALLED];
    delete router[RUN_WITH_APP_HANDLERS];
    delete router.runPluginsCleanup;
  });
}

export function setupPlugin({ router, plugin }: { router: Router; plugin: ProRouterObjectPlugin }) {
  router[EFFECT_SCOPE]?.run(() => {
    plugin.install?.({
      router,
      onUnmount(handler) {
        const handlers = (router[UNMOUNT_HANDLERS] ??= []);
        handlers.push(handler);
      },
      runWithApp(handler) {
        if (router[APP]) {
          handler(router[APP]);
          return;
        }
        const handlers = (router[RUN_WITH_APP_HANDLERS] ??= []);
        handlers.push(handler);
      },
    });
  });
}

export function getRouteComponentName(
  route: RouteLocationNormalizedGeneric,
  namespace: string = 'default',
): string | undefined {
  const currentRoute = route.matched[route.matched.length - 1];
  const currentRouteComponent = currentRoute?.components?.[namespace];
  return (currentRouteComponent as any)?.__name;
}
