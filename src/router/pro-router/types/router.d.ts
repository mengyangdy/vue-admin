import type { App, EffectScope } from "vue";
import {
  ProRouterPluginCleanupHandler,
  ProRouterPluginRunWithAppHandler,
  ProRouterPluginUnmountHandler,
} from ".";
import {
  ALREADY_INSTALLED,
  APP,
  EFFECT_SCOPE,
  RUN_WITH_APP_HANDLERS,
  UNMOUNT_HANDLERS,
} from "../constant";
/**
 * 扩展 Vue Router 的 Router 接口
 * 添加 @pro/router 插件系统需要的属性和方法
 */
declare module "vue-router" {
  export interface Router {
    /**
     * Vue 实例
     */
    [APP]?: App;
    /**
     * vueInstance.effectScope
     */
    [EFFECT_SCOPE]?: EffectScope;
    /**
     * 插件的 onUnmount 钩子集合
     */
    [UNMOUNT_HANDLERS]?: ProRouterPluginUnmountHandler[];
    /**
     * 插件的 runWithApp 钩子集合
     */
    [RUN_WITH_APP_HANDLERS]?: ProRouterPluginRunWithAppHandler[];
    /**
     * 是否已经安装
     */
    [ALREADY_INSTALLED]?: boolean;
    /**
     * 运行所有已注册的插件中返回的 onCleanup 钩子
     */
    runPluginsCleanup?: ProRouterPluginCleanupHandler;
  }
}
