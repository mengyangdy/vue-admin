import { computed } from 'vue';

import type { LayoutMenuReturn, SharedLayoutOptions } from './index';

export function useFullContentLayoutMenu(_: SharedLayoutOptions) {
  const layout = computed<LayoutMenuReturn>(() => {
    return {
      horizontalMenuProps: {},
      verticalMenuProps: {},
      verticalExtraMenuProps: {},
    };
  });

  return {
    layout,
  };
}
