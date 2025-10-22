import type { LayoutMenuReturn, SharedLayoutOptions } from './index';
import { computed } from 'vue';

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
