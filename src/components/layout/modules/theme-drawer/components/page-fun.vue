<template>
  <n-divider> 页面功能 </n-divider>
  <transition-group
    tag="div"
    name="setting-list"
    class="flex-col-stretch gap-12px"
  >
    <setting-item key="0" label="重置缓存策略">
      <n-select
        v-model:value="themeStore.resetCacheStrategy"
        :options="translateOptions(resetCacheStrategyOptions)"
        size="small"
        class="w-120px"
      />
    </setting-item>
    <setting-item key="1" label="滚动模式">
      <n-select
        v-model:value="themeStore.layout.scrollMode"
        :options="translateOptions(themeScrollModeOptions)"
        size="small"
        class="w-120px"
      />
    </setting-item>
    <setting-item key="1-1" label="页面切换动画">
      <n-switch v-model:value="themeStore.page.animate" />
    </setting-item>
    <setting-item
      v-if="themeStore.page.animate"
      key="1-2"
      label="页面切换动画类型"
    >
      <n-select
        v-model:value="themeStore.page.animateMode"
        :options="translateOptions(themePageAnimationModeOptions)"
        size="small"
        class="w-120px"
      />
    </setting-item>
    <setting-item v-if="isWrapperScrollMode" key="2" label="固定头部">
      <n-switch v-model:value="themeStore.header.fixed" />
    </setting-item>
    <setting-item key="5" label="显示标签栏">
      <n-switch v-model.value="themeStore.tab.visible" />
    </setting-item>
    <setting-item v-if="isWrapperScrollMode" key="2" label="固定标签栏">
      <n-switch v-model:value="themeStore.tab.fixed" />
    </setting-item>
    <setting-item key="3" label="头部高度">
      <n-input-number
        v-model:value="themeStore.header.height"
        size="small"
        :step="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item key="4" label="显示面包屑">
      <n-switch v-model:value="themeStore.header.breadcrumb.visible" />
    </setting-item>
    <setting-item
      v-if="themeStore.header.breadcrumb.visible"
      key="4-1"
      label="显示面包屑图标"
    >
      <n-switch v-model:value="themeStore.header.breadcrumb.showIcon" />
    </setting-item>

    <setting-item
      label="标签栏信息缓存"
      key="5-1"
      v-if="themeStore.tab.visible"
    >
      <n-switch v-model:value="themeStore.tab.cache" />
    </setting-item>
    <setting-item label="标签栏高度" key="5-2" v-if="themeStore.tab.visible">
      <n-input-number
        v-model:value="themeStore.tab.height"
        size="small"
        :setp="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item label="标签栏风格" key="5-3" v-if="themeStore.tab.visible">
      <n-select
        v-model:value="themeStore.tab.mode"
        :options="translateOptions(themeTabModeOptions)"
        size="small"
        class="w-120px"
      />
    </setting-item>
    <setting-item label="侧边栏宽度" v-if="layoutMode === 'vertical'" key="6-1">
      <n-input-number
        v-model:value="themeStore.sider.width"
        size="small"
        :step="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item
      label="侧边栏折叠宽度"
      v-if="layoutMode === 'vertical'"
      key="6-2"
    >
      <n-input-number
        v-model:value="themeStore.sider.collapsedWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item
      label="混合布局侧边栏折叠宽度"
      key="6-4"
      v-if="isMixLayoutMode"
    >
      <n-input-number
        v-model:value="themeStore.sider.mixCollapsedWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item
      label="混合布局子菜单宽度"
      key="6-5"
      v-if="layoutMode === 'vertical-mix'"
    >
      <n-input-number
        v-model:value="themeStore.sider.mixChildMenuWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item label="显示底部" key="7">
      <n-switch v-model:value="themeStore.footer.visible" />
    </setting-item>
    <setting-item
      v-if="themeStore.footer.visible && isWrapperScrollMode"
      key="7-1"
      label="固定底部"
    >
      <n-switch v-model:value="themeStore.footer.fixed" />
    </setting-item>
    <setting-item label="底部高度" key="7-2" v-if="themeStore.footer.visible">
      <n-input-number
        v-model:value="themeStore.footer.height"
        size="small"
        :step="1"
        class="w-120px"
      />
    </setting-item>
    <setting-item
      label="底部居右"
      key="7-3"
      v-if="themeStore.footer.visible && layoutMode === 'horizontal-mix'"
    >
      <n-switch v-model:value="themeStore.footer.right" />
    </setting-item>
    <setting-item label="显示全屏水印" key="8">
      <n-switch v-model:value="themeStore.watermark.visible" />
    </setting-item>
    <setting-item
      label="启用用户名水印"
      key="8-1"
      v-if="themeStore.watermark.visible"
    >
      <n-switch v-model:value="themeStore.watermark.enableUserName" />
    </setting-item>
    <setting-item
      v-if="themeStore.watermark.visible"
      key="8-2"
      label="水印文本"
    >
      <n-input
        v-model:value="themeStore.watermark.text"
        autosize
        type="text"
        size="small"
        class="w-120px"
        placeholder="DylanjsAdmin"
      />
    </setting-item>
    <setting-item label="显示多语言按钮" key="9">
      <n-switch v-model:value="themeStore.header.multilingual.visible" />
    </setting-item>
    <setting-item key="10" label="显示全局搜索按钮">
      <n-switch v-model:value="themeStore.header.globalSearch.visible" />
    </setting-item>
  </transition-group>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/modules/theme";
import SettingItem from "./setting-item.vue";
import { computed } from "vue";
import { translateOptions } from "@/utils/common";
import {
  resetCacheStrategyOptions,
  themeScrollModeOptions,
  themePageAnimationModeOptions,
  themeTabModeOptions,
} from "@/constants/app";

const themeStore = useThemeStore();
const layoutMode = computed(() => themeStore.layout.mode);
const isMixLayoutMode = computed(() => layoutMode.value.includes("mix"));
const isWrapperScrollMode = computed(
  () => themeStore.layout.scrollMode === "wrapper"
);
</script>

<style scoped>
.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  --uno: transition-all-300;
}

.setting-list-enter-from,
.setting-list-leave-to {
  --uno: opacity-0 -translate-x-30px;
}

.setting-list-leave-active {
  --uno: absolute;
}
</style>
