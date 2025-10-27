<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
      <n-watermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { NConfigProvider, darkTheme } from 'naive-ui';

import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useThemeStore } from '@/store/modules/theme';

import { naiveDateLocales, naiveLocales } from './locales/naive';

const themeStore = useThemeStore();
const authStore = useAuthStore();
const appStore = useAppStore();
const watermarkProps = computed(() => {
  const content =
    themeStore.watermark.enableUserName && authStore.userInfo.userName
      ? authStore.userInfo.userName
      : themeStore.watermark.text;
  return {
    content,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999,
  };
});

const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined));

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});
</script>

<style scoped></style>
