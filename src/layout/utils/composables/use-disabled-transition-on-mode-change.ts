import { ComputedRef, nextTick, ref, watch } from 'vue';

export function useDisabledTransitionWhenModeChange(mode: ComputedRef<UnionKey.ThemeLayoutMode>) {
  const disabled = ref(false);
  watch(mode, () => {
    disabled.value = true;
    nextTick(() => {
      disabled.value = false;
    });
  });
  return {
    disabled,
  };
}
