import type { App } from 'vue';

import type { Router, RouterOptions } from 'vue-router';

export type ProRouterPluginRunWithAppHandler = (app: App) => void;
export type ProRouterPluginUnmountHandler = () => void;
export type ProRouterPluginCleanupHandler = () => void;

export interface ProRouterPluginContext {
  router: Router;
  runWithApp: (handler: ProRouterPluginRunWithAppHandler) => void;
  onUnmount: (handler: ProRouterPluginUnmountHandler) => void;
}

export interface ProRouterPluginReturned {
  onCleanup?: () => void;
}

export interface ProRouterObjectPlugin {
  install?: (ctx: ProRouterPluginContext) => void | ProRouterPluginReturned;
  resolveOptions?: (options: RouterOptions) => RouterOptions;
}

export interface ProRouterFunctionPlugin {
  (ctx: ProRouterPluginContext): void | ProRouterPluginReturned;
  resolveOptions?: (options: RouterOptions) => RouterOptions;
}

export type ProRouterPlugin = ProRouterObjectPlugin | ProRouterFunctionPlugin;

export interface ProRouterOptions extends RouterOptions {
  plugins?: ProRouterPlugin[];
}

export type {
  BackendServiceReturned as RbacAccessPluginBackendServiceReturned,
  BaseServiceReturned as RbacAccessPluginBaseServiceReturned,
  FrontendServiceReturned as RbacAccessPluginFrontendServiceReturned,
  RouteRecordRawWithStringComponent as RbacAccessPluginRouteRecordRawWithStringComponent,
} from '../plugins/rbac-access-plugin';
