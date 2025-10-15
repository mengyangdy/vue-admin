<template>
  <div class="h-full flex-y-center justify-end">
    <GlobalSearch />
    <FullScreen
      v-if="!themeStore.isMobile"
      :full="isFullscreen"
      @click="toggle"
    />
    <theme-schema-switch
      :theme-schema="themeStore.themeScheme"
      :is-dark="themeStore.darkMode"
      @switch="themeStore.toggleThemeScheme"
    />
    <ThemeButton />
    <UserAvatar />
  </div>
</template>

<script setup lang="ts">
import GlobalSearch from "../global-search/index.vue";

import { useThemeStore } from "@/store/modules/theme";
const themeStore = useThemeStore();
</script>
