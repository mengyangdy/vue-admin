import { inject, MaybeRef } from 'vue';
import { EmptyConfig } from '../../types';
import { createInjectionKey } from '../composables/create-injection-key';

interface GlobalConfig {
  mergedEmpty: MaybeRef<Required<EmptyConfig>>;
  mergedPropOverrides: MaybeRef<Record<string, object>>;
}
const globalConfigInjectionKey = createInjectionKey<GlobalConfig>('global-config');

export function useInjectGlobalConfig() {
  return inject(globalConfigInjectionKey, {
    mergedEmpty: {
      form: '-',
      tags: '-',
      table: '-',
      images: '-',
      dateText: '-',
      copyableText: '-',
    },
    mergedPropOverrides: {},
  });
}
