<template>
  <button-icon
    icon="majesticons:color-swatch-line"
    tooltip-content="主题设置"
    @click="themeStore.openThemeDrawer"
  />
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/modules/theme";
defineOptions({
  name: "ThemeButton",
});
const themeStore = useThemeStore();
</script>
