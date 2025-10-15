<template>
  <a
    href="javascript:void(0)"
    class="flex items-center gap-12px h-full"
    :class="{
      'pl-12px': enablePaddingLeft,
      'justify-center': !enablePaddingLeft,
    }"
  >
    <img :src="logo" alt="logo" class="size-32px truncate" />
    <h1 class="truncate text-18px">{{ title }}</h1>
  </a>
</template>

<script setup lang="tsx">
import type { ProLayoutMode } from "@/layout/types";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import logo from "@/assets/images/logo.svg";
import { useAppStore } from "@/store/modules/app";
import { useThemeStore } from "@/store/modules/theme";

interface LogoProps {
  usingMobileSidebarDrawer?: boolean;
}

const { usingMobileSidebarDrawer = false } = defineProps<LogoProps>();

const title = import.meta.env.VITE_APP_TITLE;

const { layout, isMobile, sider } = storeToRefs(useThemeStore());
const data = storeToRefs(useThemeStore());
console.log("🚀 ~ data:", data);

const enablePaddingLeft = computed(() => {
  const layoutMode = layout.value.mode as ProLayoutMode;
  if (usingMobileSidebarDrawer) {
    return !sider.value.siderCollapse;
  }
  if (isMobile.value) {
    return true;
  }
  return (
    layoutMode === "horizontal" ||
    layoutMode === "sidebar" ||
    layoutMode === "mixed-sidebar" ||
    (layoutMode === "vertical" && !sider.value.siderCollapse)
  );
});

const showAppTitle = computed(() => {
  const layoutMode = layout.value.mode as ProLayoutMode;
  if (usingMobileSidebarDrawer) {
    return !sider.value.siderCollapse;
  }
  if (isMobile.value) {
    return false;
  }
  return (
    layoutMode === "sidebar" ||
    layoutMode === "horizontal" ||
    layoutMode === "mixed-sidebar" ||
    (layoutMode === "vertical" && !sider.value.siderCollapse)
  );
});
</script>
