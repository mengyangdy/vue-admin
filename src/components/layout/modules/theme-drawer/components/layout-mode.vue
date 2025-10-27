<template>
  <n-divider>布局模式</n-divider>
  <layout-mode-card v-model:mode="themeStore.layout.mode" :disabled="themeStore.isMobile">
    <template #vertical>
      <div class="layout-sider h-full w-18px"></div>
      <div class="vertical-wrapper">
        <div class="layout-header"></div>
        <div class="layout-main"></div>
      </div>
    </template>
    <template #vertical-mix>
      <div class="layout-sider h-full w-8px"></div>
      <div class="layout-sider h-full w-16px"></div>
      <div class="vertical-wrapper">
        <div class="layout-header"></div>
        <div class="layout-main"></div>
      </div>
    </template>
    <template #horizontal>
      <div class="layout-header"></div>
      <div class="horizontal-wrapper">
        <div class="layout-main"></div>
      </div>
    </template>
    <template #horizontal-mix>
      <div class="layout-header"></div>
      <div class="horizontal-wrapper">
        <div class="layout-sider w-18px"></div>
        <div class="layout-main"></div>
      </div>
    </template>
  </layout-mode-card>
  <setting-item
    v-if="themeStore.layout.mode === 'horizontal-mix'"
    label="一级菜单与子级菜单位置反转"
    class="mt-16px"
  >
    <n-switch
      :value="themeStore.layout.reverseHorizontalMix"
      @update:value="handleReverseHorizontalMixChange"
    />
  </setting-item>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme';

import LayoutModeCard from './layout-mode-card.vue';
import SettingItem from './setting-item.vue';

defineOptions({
  name: 'LayoutMode',
});

const themeStore = useThemeStore();

function handleReverseHorizontalMixChange(value: boolean) {
  themeStore.setLayoutReverseHorizontalMix(value);
}
</script>

<style scoped>
.layout-header {
  --uno: h-16px bg-primary rd-4px;
}

.layout-sider {
  --uno: bg-primary-300 rd-4px;
}

.layout-main {
  --uno: flex-1 bg-primary-200 rd-4px;
}

.vertical-wrapper {
  --uno: flex-1 flex-col gap-6px;
}

.horizontal-wrapper {
  --uno: flex-1 flex gap-6px;
}
</style>
