import { SetupStoreId } from "@/constants";
import { defineStore } from "pinia";
import { computed, effectScope, ref, toRefs, watch } from "vue";
import { initThemeSettings } from "./shared";
import type { Ref } from "vue";
import {
  useBreakpoints,
  breakpointsTailwind,
  usePreferredColorScheme,
} from "@vueuse/core";
import { localStg } from "@/utils/storage";
import useBoolean from "@/hooks/common/use-boolean";

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope();
  const osTheme = usePreferredColorScheme();
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings());
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller("sm");
  const showMobileSidebarDrawer = ref(false);
  const darkMode = computed(() => {
    if (settings.value.themeScheme) {
      return osTheme.value === "dark";
    }
    return settings.value.themeScheme === "dark";
  });
  const {
    bool: themeDrawerVisible,
    setTrue: openThemeDrawer,
    setFalse: closeThemeDrawer,
  } = useBoolean();

  scope.run(() => {
    watch(
      () => darkMode.value,
      (val) => {
        localStg.set("darkMode", val);
      },
      {
        immediate: true,
      }
    );
  });

  return {
    isMobile,
    darkMode,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    ...toRefs(settings.value),
    showMobileSidebarDrawer,
  };
});
