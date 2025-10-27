import { computed, effectScope, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';

import { getPaletteColorByNumber } from '@dylanjs/utils';
import { breakpointsTailwind, useBreakpoints, usePreferredColorScheme } from '@vueuse/core';
import { defineStore } from 'pinia';

import { SetupStoreId } from '@/constants';
import useBoolean from '@/hooks/common/use-boolean';
import { localStg } from '@/utils/storage';

import { addThemeVarsToGlobal, createThemeToken, getNaiveTheme, initThemeSettings } from './shared';

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope();
  const osTheme = usePreferredColorScheme();
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings());
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller('sm');
  const showMobileSidebarDrawer = ref(false);
  const darkMode = computed(() => {
    if (settings.value.themeScheme) {
      return osTheme.value === 'dark';
    }
    return settings.value.themeScheme === 'dark';
  });
  const {
    bool: themeDrawerVisible,
    setTrue: openThemeDrawer,
    setFalse: closeThemeDrawer,
  } = useBoolean();

  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value;
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info,
    };
    return colors;
  });

  const grayscaleMode = computed(() => settings.value.grayscale);

  const colourWeaknessMode = computed(() => settings.value.colourWeakness);

  /**
   * vaive 主题
   */
  const naiveTheme = computed(() =>
    getNaiveTheme(themeColors.value, settings.value.recommendColor),
  );

  /**
   * 设置JSON
   * 用于复制设置
   */
  const settingsJson = computed(() => JSON.stringify(settings.value));

  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto'];
    const index = themeSchemes.findIndex((item) => item === settings.value.themeScheme);
    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;
    const nextThemeScheme = themeSchemes[nextIndex];
    setThemeScheme(nextThemeScheme);
  }

  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme;
  }
  function resetStore() {
    const themeStore = useThemeStore();
    themeStore.$reset();
  }

  function setGrayscale(isGrayscale: boolean) {
    settings.value.grayscale = isGrayscale;
  }

  function setColourWeakness(isColourWeakness: boolean) {
    settings.value.colourWeakness = isColourWeakness;
  }

  function setLayoutReverseHorizontalMix(reverse: boolean) {
    settings.value.layout.reverseHorizontalMix = reverse;
  }

  /**
   * 更新主题颜色
   *
   * @param key 主题颜色键
   * @param color 主题颜色
   */
  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    let colorValue = color;

    if (settings.value.recommendColor) {
      // 通过提供的颜色和颜色名称获取调色板，并使用合适的颜色

      colorValue = getPaletteColorByNumber(color, 500, true);
    }

    if (key === 'primary') {
      settings.value.themeColor = colorValue;
    } else {
      settings.value.otherColor[key] = colorValue;
    }
  }
  /** 设置主题变量到全局 */
  function setupThemeVarsToGlobal() {
    const { themeTokens, darkThemeTokens } = createThemeToken(
      themeColors.value,
      settings.value.tokens,
      settings.value.recommendColor,
    );
    addThemeVarsToGlobal(themeTokens, darkThemeTokens);
  }

  // 监听store
  scope.run(() => {
    // 监听深色模式
    watch(
      () => darkMode.value,
      (val) => {
        localStg.set('darkMode', val);
      },
      {
        immediate: true,
      },
    );
    watch(
      themeColors,
      (val) => {
        setupThemeVarsToGlobal();
        localStg.set('themeColor', val.primary);
      },
      {
        immediate: true,
      },
    );
  });

  return {
    isMobile,
    darkMode,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    toggleThemeScheme,
    settingsJson,
    resetStore,
    showMobileSidebarDrawer,
    setThemeScheme,
    setGrayscale,
    setColourWeakness,
    setLayoutReverseHorizontalMix,
    themeColors,
    grayscaleMode,
    colourWeaknessMode,
    naiveTheme,
    updateThemeColors,
    ...toRefs(settings.value),
  };
});
