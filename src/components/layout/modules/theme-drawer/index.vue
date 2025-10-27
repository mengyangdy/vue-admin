<template>
  <n-drawer
    v-model:show="themeStore.themeDrawerVisible"
    display-directive="show"
    :width="360"
    placement="right"
  >
    <n-drawer-content title="主题配置" :native-scrollbar="false" closeable>
      <dark-mode />
      <layout-mode />
      <theme-color />
      <page-fun />
      <template #footer>
        <config-operation />
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme';

import ConfigOperation from './components/config-operation.vue';
import DarkMode from './components/dark-mode.vue';
import LayoutMode from './components/layout-mode.vue';
import PageFun from './components/page-fun.vue';
import ThemeColor from './components/theme-color.vue';

defineOptions({
  name: 'ThemeDrawer',
});
const themeStore = useThemeStore();
</script>
