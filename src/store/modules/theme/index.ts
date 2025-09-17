import { SetupStoreId } from "@/enum";
import { defineStore } from "pinia";
import { effectScope, ref, toRefs } from "vue";
import { initThemeSettings } from "./shared";
import type { Ref } from "vue";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope();
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings());
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller("sm");

  return {
    isMobile,
    ...toRefs(settings.value),
  };
});
