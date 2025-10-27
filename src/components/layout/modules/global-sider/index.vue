<template>
  <n-menu
    class="pro-menu"
    :class="[mergedCollapsed && collapsedShowTitle && 'pro-menu--collapsed-show-title']"
    v-bind="nMenuProps"
  />
</template>

<script setup lang="ts">
import { computed, inject, toValue } from 'vue';

import { proMenuProps } from './props';

defineOptions({
  name: 'ProMenu',
});

const props = defineProps(proMenuProps);
const { collapsedRef } = inject('n-layout-sider') as any;

const mergedCollapsed = computed(() => {
  return props.collapsed ?? toValue(collapsedRef) ?? false;
});

const nMenuProps = computed(() => {
  const { collapsedShowTitle, menuItemHeightWhenCollapsedShowTitle, ...rest } = props;
  if (!collapsedShowTitle || !mergedCollapsed.value) {
    return rest;
  }
  const itemHeight = menuItemHeightWhenCollapsedShowTitle ?? 64;
  console.log({
    ...rest,
    builtinThemeOverrides: {
      ...(rest.builtinThemeOverrides ?? {}),
      itemHeight: `${itemHeight}px`,
    },
  });

  return {
    ...rest,
    builtinThemeOverrides: {
      ...(rest.builtinThemeOverrides ?? {}),
      itemHeight: `${itemHeight}px`,
    },
  };
});
</script>

<style scoped>
.pro-menu.pro-menu--collapsed-show-title {
  :deep(.n-menu-item-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }

  :deep(.n-menu-item-content) {
    padding-left: 0 !important;
    padding-right: 0;
    transition: height 0.3s var(--n-bezier);
  }

  :deep(.n-menu-item-content__icon) {
    margin-right: 0px !important;
  }

  :deep(.n-menu-item-content-header) {
    opacity: 1;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
    text-align: center;
  }

  :deep(.n-menu-item-content__arrow) {
    display: none;
  }
}

.pro-menu.n-menu.n-menu--collapsed {
  * {
    transition: none;
  }

  :deep(.n-menu-item-content) {
    transition: height 0.3s var(--n-bezier);
  }
}
</style>
