<template>
  <div class="pl-8px flex items-center h-full gap-4px">
    <ButtonIcon
      v-if="showSidebarHiddenButton"
      quaternary
      size="small"
      icon="icon-menu"
      @click="toggleSidebar"
    />
    <breadcrumbs v-if="showBreadcrumbs" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/store/modules/theme";
import breadcrumbs from "./modules/breadcrumbs.vue";

const themeStore = useThemeStore();

const showBreadcrumbs = computed(() => {
  const layoutMode = themeStore.layout.mode;
  if (themeStore.isMobile) {
    return false;
  }
  return (
    layoutMode === "vertical" ||
    layoutMode === "two-column" ||
    layoutMode === "sidebar"
  );
});
const toggleSidebar = () => {
  if (themeStore.isMobile) {
    themeStore.showMobileSidebarDrawer = !themeStore.showMobileSidebarDrawer;
    return;
  }
  themeStore.sider.visible = !themeStore.sider.visible;
};
const showSidebarHiddenButton = computed(() => {
  const layoutMode = themeStore.layout.mode;
  if (themeStore.isMobile) {
    return true;
  }
  return layoutMode !== "horizontal";
});
</script>
