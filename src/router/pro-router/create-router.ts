import { effectScope } from 'vue';

import { Router, RouterOptions as _RouterOptions, createRouter as _createRouter } from 'vue-router';

import { EFFECT_SCOPE, RUN_WITH_APP_HANDLERS } from './constant';
import { ProRouterOptions } from './types';
import { prepareInstall, resolveOptions, setupPlugin } from './utils/route';

export function createRouter(options: ProRouterOptions): Router {
  const { vrOptions, plugins = [], pluginCleanups } = resolveOptions(options);
  const router = _createRouter(vrOptions);
  const scope = (router[EFFECT_SCOPE] ??= effectScope(true));

  const { install, onError, afterEach, beforeEach, beforeResolve } = router;

  router.install = (...args) => {
    const [app] = args;
    prepareInstall(app, router);
    install.call(router, ...args);
    const runWithAppHandlers = (router[RUN_WITH_APP_HANDLERS] ??= []);
    runWithAppHandlers.forEach((handler) => handler(app));
    runWithAppHandlers.length = 0;
  };
  router.beforeEach = (guard, ...rest) => {
    return beforeEach(
      (...args) => {
        return scope.run(() => {
          return guard.call(undefined, ...args);
        });
      },
      ...rest,
    );
  };
  router.beforeResolve = (guard, ...rest) => {
    return beforeResolve(
      (...args) => {
        return scope.run(() => {
          return guard.call(undefined, ...args);
        });
      },
      ...rest,
    );
  };

  router.afterEach = (guard, ...rest) => {
    return afterEach(
      (...args) => {
        return scope.run(() => {
          return guard.call(undefined, ...args);
        });
      },
      ...rest,
    );
  };

  router.onError = (handler, ...rest) => {
    return onError(
      (...args) => {
        return scope.run(() => {
          return handler.call(undefined, ...args);
        });
      },
      ...rest,
    );
  };
  router.runPluginsCleanup = () => {
    pluginCleanups.forEach((cleanup) => cleanup());
  };
  plugins.forEach((plugin) => {
    setupPlugin({ router, plugin });
  });
  return router;
}
