import { cloneDeep } from '@dylanjs/utils';
import { PiniaPluginContext } from 'pinia';

import { SetupStoreId } from '@/constants';

/**
 * 使用 setup 语法定义的 store 默认没有 $reset 方法
 * 为特定的 store 添加了重置到初始状态的功能
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[];
  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;
    const defaultStore = cloneDeep($state);
    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}
