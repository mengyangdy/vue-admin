<template>
  <div class="flex flex-col gap-16px">
    <n-cord title="切换权限模式">
      <div class="mb-8px font-bold">切换权限模式后查看【左侧菜单->系统管理】</div>
      <div class="flex gap-8px">
        <n-button
          v-for="account in accounts"
          :key="account.username"
          :disabled="userStore.user.roles.includes(account.role)"
          @click="handleAccount(account)"
        >
          {{ account.roleName }}
        </n-button>
      </div>
    </n-cord>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const accessModes = computed(() => {
  return [
    {
      label: '前端权限控制',
      value: 'frontend',
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
