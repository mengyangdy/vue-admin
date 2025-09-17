import { ComputedRef, nextTick, ref, watch } from "vue";
import { ProLayoutMode } from "@/layout/types";

export function useDisabledTransitionWhenModeChange(
  mode: ComputedRef<ProLayoutMode>
) {
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
