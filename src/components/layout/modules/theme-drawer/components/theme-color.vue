<template>
  <n-divider> 主题颜色 </n-divider>
  <div class="flex-col-stretch gap-12px">
    <n-tooltip placement="top-start">
      <template #trigger>
        <setting-item key="recommend-color" label="应用推荐算法的颜色">
          <n-switch v-model:value="themeStore.recommendColor" />
        </setting-item>
      </template>
      <p>
        <span class="pr-12px">推荐颜色的算法参照</span>
        <br />
        <n-button
          text
          tag="a"
          href="https://uicolors.app/create"
          target="_blank"
          ref="noopener noreferrer"
          class="text-gray"
        >
          https://uicolors.app/create
        </n-button>
      </p>
    </n-tooltip>
    <setting-item
      v-for="(_, key) in themeStore.themeColors"
      :key="key"
      label="111"
    >
      <template v-if="key === 'info'" #suffix>
        <n-checkbox v-model:checked="themeStore.isInfoFollowPrimary">
          信息颜色跟随主题颜色
        </n-checkbox>
      </template>
      <n-color-picker
        class="w-90px"
        :value="themeStore.themeColors[key]"
        :disabled="key === 'info' && themeStore.isInfoFollowPrimary"
        :show-alpha="false"
        :swatches="swatches"
        @update:value="handleUpdateColor($event, key)"
      />
    </setting-item>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/modules/theme";
defineOptions({
  name: "ThemeColor",
});

const themeStore = useThemeStore();
function handleUpdateColor(color: string, key: App.Theme.ThemeColorKey) {
  themeStore.updateThemeColors(key, color);
}
const swatches: string[] = [
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#0ea5e9",
  "#06b6d4",
  "#f43f5e",
  "#ef4444",
  "#ec4899",
  "#d946ef",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
];
</script>

<style scoped></style>
