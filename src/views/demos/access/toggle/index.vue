<template>
  <div class="flex flex-col gap-16px">
    <n-card title="切换权限模式">
      <div class="mb-8px font-bold">切换权限模式后查看【左侧菜单->系统管理】</div>
      <div class="flex gap-8px">
        <n-button
          v-for="accessMode in accessModes"
          :key="accessMode.value"
          :disabled="routerMode === accessMode.value"
          @click="handleAccessMode(accessMode.value)"
        >
          {{ accessMode.label }}
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();
const routerMode = computed(() => import.meta.env.VITE_AUTH_ROUTE_MODE);

const accessModes = computed(() => {
  return [
    {
      label: '前端权限控制',
      value: 'static',
    },
    {
      label: '后端权限控制',
      value: 'backend',
    },
  ];
});

const accounts = computed(() => {
  return [
    {
      username: 'super',
      password: '123456',
      role: 'super',
      roleName: '超级管理员',
    },
    {
      username: 'admin',
      password: '123456',
      role: 'admin',
      roleName: '普通管理员',
    },
    {
      username: 'user',
      password: '123456',
      role: 'user',
      roleName: '普通用户',
    },
  ];
});

async function handleAccount(account: { username: string; password: string }) {
  await userStore.logoutWithQueryRedirect();
  await userStore.login(account);
}

async function handleAccessMode(accessMode: string) {
  appStore.accessMode = accessMode;
  const account = accounts.value.find(
    (account) => account.username === userStore.user.name.toLowerCase(),
  )!;
  await userStore.logoutWithQueryRedirect();
  await userStore.login(account);
}
</script>
