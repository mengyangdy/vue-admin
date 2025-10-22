<template>
  <n-divider> 主题模式 </n-divider>
  <div class="flex-col-stretch gap-16px">
    <div class="i-flex-center">
      <n-tabs
        :key="themeStore.themeScheme"
        type="segment"
        size="small"
        class="relative w-214px"
        :value="themeStore.themeScheme"
        @update:value="handleSegmentChange"
      >
        <n-tab v-for="(_, key) in themeSchemaRecord" :key="key" :name="key">
          <svg-icon :icon="icons[key]" class="h-23px text-icon-small" />
        </n-tab>
      </n-tabs>
    </div>
    <Transition name="sider-inverted">
      <setting-item v-if="showSiderInverted" label="深色侧边栏">
        <n-switch v-model:value="themeStore.sider.inverted" />
      </setting-item>
    </Transition>
    <setting-item label="灰度模式">
      <n-switch
        v-model:value="themeStore.grayscale"
        @update:value="handleGrayscaleChange"
      />
    </setting-item>
    <setting-item label="色弱模式">
      <n-switch
        :value="themeStore.colourWeakness"
        @update:value="handleColourWeaknessChange"
      />
    </setting-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SettingItem from "./setting-item.vue";
import { useThemeStore } from "@/store/modules/theme";
import { themeSchemaRecord } from "@/constants/app";
defineOptions({
  name: "DarkMode",
});

const themeStore = useThemeStore();

const icons: Record<UnionKey.ThemeScheme, string> = {
  light: "material-symbols:sunny",
  dark: "material-symbols:nightlight-rounded",
  auto: "material-symbols:hdr-auto",
};

function handleSegmentChange(value: string | number) {
  themeStore.setThemeScheme(value as UnionKey.ThemeScheme);
}

function handleGrayscaleChange(value: boolean) {
  themeStore.setGrayscale(value);
}

function handleColourWeaknessChange(value: boolean) {
  themeStore.setColourWeakness(value);
}
const showSiderInverted = computed(
  () => !themeStore.darkMode && themeStore.layout.mode.includes("vertical")
);
</script>

<style scoped>
.sider-inverted-enter-active,
.sider-inverted-leave-active {
  --uno: h-22px transition-all-300;
}

.sider-inverted-enter-from,
.sider-inverted-leave-to {
  --uno: translate-x-20px opacity-0 h-0;
}
</style>
