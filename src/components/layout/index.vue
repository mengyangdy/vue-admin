<template>
  <ProLayout
    v-model:collapsed="themeStore.sider.siderCollapse"
    :mode="themeStore.layout.mode"
    :is-mobile="themeStore.isMobile"
    :show-nav="themeStore.header.visible"
    :show-logo="themeStore.logo.visible"
    :nav-fixed="themeStore.header.fixed"
    :nav-height="themeStore.header.height"
    :show-footer="themeStore.footer.visible"
    :show-tabbar="themeStore.tab.visible"
    :footer-fixed="themeStore.footer.fixed"
    :footer-height="themeStore.footer.height"
    :sidebar-width="themeStore.sider.width"
    :tabbar-height="themeStore.tab.height"
    :show-sidebar="themeStore.sider.visible"
    :show-sidebar-extra="themeStore.sider.sidebarExtra"
    content-class="pro-layout__content--embedded p-16px"
    :sidebar-collapsed-width="themeStore.sider.collapsedWidth"
  >
    <template #logo>
      <GlobalLogo />
    </template>
    <template #nav-left>
      <NavLeft />
      <!-- <mobile-sidebar-drawer :collapsed-width="finalSidebarCollapsedWidth">
        <n-scrollbar class="flex-[1_0_0]">
          <pro-menu
            v-bind="verticalLayout.verticalMenuProps"
            :indent="18"
            :collapsed-width="finalSidebarCollapsedWidth"
            :collapsed-show-title="sidebarCollapsedShowMenuTitle"
            :options="
              handleMenuGroupAndDivider(
                verticalLayout.verticalMenuProps.options
              )
            "
            @update:value="pushTo"
          />
        </n-scrollbar>
      </mobile-sidebar-drawer> -->
    </template>
    <template #nav-center>
      <!-- <div v-show="!mobile" class="flex items-center h-full">
        <pro-menu
          v-bind="layout.horizontalMenuProps"
          :indent="18"
          @update:value="pushTo"
        />
      </div> -->
    </template>
    <template #nav-right>
      <NavRight />
    </template>
    <template #tabbar>
      <GlobalTabbar />
    </template>
    <template #sidebar>
      <div class="flex flex-col h-full">
        <!-- <n-scrollbar class="flex-[1_0_0]">
          <pro-menu
            v-bind="layout.verticalMenuProps"
            :indent="18"
            :collapsed-width="finalSidebarCollapsedWidth"
            :collapsed-show-title="sidebarCollapsedShowMenuTitle"
            :options="
              handleMenuGroupAndDivider(layout.verticalMenuProps.options)
            "
            @update:value="pushTo"
          />
        </n-scrollbar>
        <div v-if="showSidebarCollapseButton" class="flex p-8px">
          <collapse-sidebar-button />
        </div> -->
      </div>
    </template>
    <template #sidebar-extra>
      <div class="flex flex-col h-full">
        <n-scrollbar class="flex-[1_0_0]">
          <!-- <pro-menu
            v-bind="layout.verticalExtraMenuProps"
            :indent="18"
            :collapsed-width="finalSidebarCollapsedWidth"
            :collapsed-show-title="sidebarCollapsedShowMenuTitle"
            :options="
              handleMenuGroupAndDivider(layout.verticalExtraMenuProps.options)
            "
            @update:value="pushTo"
          /> -->
        </n-scrollbar>
        <!-- <div v-if="showSidebarExtraCollapseButton" class="flex p-8px">
          <collapse-sidebar-button />
        </div> -->
      </div>
    </template>
    <template #default>
      <GlobalContent />
    </template>
    <template #footer>
      <GlobalFooter />
    </template>
  </ProLayout>
</template>

<script setup lang="ts">
import ProLayout from "@/layout/layout";
import { useThemeStore } from "@/store/modules/theme";

import GlobalFooter from "./modules/global-footer/index.vue";
import GlobalContent from "./modules/global-content/index.vue";
import GlobalLogo from "./modules/global-logo/index.vue";
import NavLeft from "./modules/nav-left/index.vue";
import NavRight from "./modules/nav-right/index.vue";
import GlobalTabbar from "./modules/global-tabbar/index.vue";

const themeStore = useThemeStore();
</script>
