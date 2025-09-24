<template>
  <div class="h-screen w-full flex bg-white dark:bg-dark-900">
    <!-- 左侧区域 -->
    <div class="hidden lg:flex w-[62%] relative overflow-hidden">
      <div
        class="absolute inset-0 blur-2xl"
        :style="{
          background: `linear-gradient(154deg,#07070915 30%,${via} 60%,#07070915 10%)`,
        }"
      />
      <div class="relative z-10 w-full flex flex-col">
        <div class="flex items-center gap-3 p-8">
          <img src="@/assets/images/vue.svg" alt="Logo" class="w-8 h-8" />
          <span class="text-xl font-semibold text-gray-800 dark:text-gray-100">
            这个是标题
          </span>
        </div>
        <div class="flex-grow flex items-center justify-center">
          <div class="w-[85%] max-w-[480px] mt-[-100px]">
            <div class="login-illustration relative">
              <div class="relative z-10">
                <IKun />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧登录区域 -->
    <div class="w-full lg:w-[38%] flex flex-col bg-white dark:bg-dark-800">
      <div class="flex-grow flex items-center justify-center">
        <div class="w-full max-w-[420px] px-6 lg:px-12">
          <div class="lg:hidden flex items-center justify-center gap-2 mb-12">
            <img src="@/assets/images/vue.svg" alt="Logo" class="w-8 h-8" />
            <span
              class="text-xl font-semibold text-gray-800 dark:text-gray-100"
            >
              这个是标题
            </span>
          </div>
          <div class="mb-12">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {{ activeModule.label }}
            </h1>
          </div>
          <div class="pt-24px">
            <Transition>
              <component
                :is="activeModule.component"
                @changeLoginModule="changeLoginModule"
              />
            </Transition>
          </div>
        </div>
      </div>
      <div class="p-8 text0center text-gray-500 dark:text-gray-400 text-sm">
        Copyright © 2025 标题
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { useThemeStore } from "@/store/modules/theme";
import IKun from "./modules/ikun.vue";
import PwdLogin from "./modules/pwd-login.vue";
import CodeLogin from "./modules/code-login.vue";
import Register from "./modules/register.vue";

import { useAuthStore } from "@/store/modules/auth";

const authStore = useAuthStore();

const themeStore = useThemeStore();
const via = computed(() => {
  return themeStore.darkMode ? "#07070915" : "#D5E6FF";
});

const moduleMap: Record<
  UnionKey.LoginModule,
  { label: string; component: any }
> = {
  "pwd-login": {
    label: "密码登录",
    component: PwdLogin,
  },
  "code-login": {
    label: "验证码登录",
    component: CodeLogin,
  },
  register: {
    label: "注册账号",
    component: Register,
  },
};
const activeModule = computed(() => moduleMap[authStore.currentLoginComponent]);
</script>

<script scoped></script>
