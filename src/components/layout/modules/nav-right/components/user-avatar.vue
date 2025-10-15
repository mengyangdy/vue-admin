<template>
  <n-button v-if="!authStore.isLogin" quaternary @click="loginOrRegister">
    登录/注册
  </n-button>
  <n-dropdown
    v-else
    placement="bottom"
    trigger="click"
    :options="options"
    @select="handleDropdown"
  >
    <div>
      <button-icon>
        <svg-icon icon="ph:user-circle" class="text-icon-large" />
        <span class="text-16px font-medium">
          {{ authStore.userInfo.userName }}
        </span>
      </button-icon>
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { useSvgIcon } from "@/hooks/common/icon";
import { useAuthStore } from "@/store/modules/auth";
import { computed, VNode } from "vue";
defineOptions({
  name: "UserAvatar",
});

const authStore = useAuthStore();
const { SvgIconVNode } = useSvgIcon();
function loginOrRegister() {
  toLogin();
}
type DropdownKey = "logout";
type DropdownOption =
  | {
      key: DropdownKey;
      label: string;
      icon?: () => VNode;
    }
  | {
      type: "divider";
      key: string;
    };

const options = computed(() => {
  const opts: DropdownOption[] = [
    {
      label: `退出登录`,
      key: "logout",
      icon: SvgIconVNode({ icon: "ph:sign-out", fontSize: 18 }),
    },
  ];
  return opts;
});
const logout = () => {
  window.$dialog?.info({
    title: `提示`,
    content: `确定要退出登录吗？`,
    positiveText: `确定`,
    negativeText: `取消`,
    onPositiveClick: () => {
      authStore.resetStore();
    },
  });
};

const handleDropdown = (key: DropdownKey) => {
  if (key === "logout") {
    logout();
  } else {
    routerPushByKey(key);
  }
};
</script>
