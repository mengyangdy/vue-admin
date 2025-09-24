<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
    @submit.prevent="handleSubmit"
  >
    <n-form-item path="userName">
      <n-input v-model:value="model.userName" placeholder="请输入账号" />
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        placeholder="请输入密码"
      />
    </n-form-item>
    <n-flex vertical :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox>记住我</n-checkbox>
        <n-button quaternary @click="authStore.changeLoginComponent('reset-pwd')"
          >忘记密码?</n-button
        >
      </div>
      <loading-button attr-type="submit" type="primary" size="large" block
        >登录</loading-button
      >
      <div class="flex-y-center justify-between gap-12px">
        <n-button class="flex-1" block @click="authStore.changeLoginComponent('code-login')"
          >验证码登录</n-button
        >
        <n-button class="flex-1" block @click="authStore.changeLoginComponent('register')"
          >注册账号</n-button
        >
      </div>
      <n-divider class="text-14px text-#666 !m-0">其他账号登录</n-divider>
    </n-flex>
  </n-form>
</template>

<script setup lang="ts">
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { useAuthStore } from "@/store/modules/auth";
import { computed, ref } from "vue";

defineOptions({
  name: "PwdLogin",
});

// interface Emits {
//   (e: "changeLoginModule", module: string): void;
// }
// const emit = defineEmits<Emits>();
const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  userName: string;
  password: string;
}

const model = ref<FormModel>({
  userName: "Dylan",
  password: "123456",
});
const rules = computed(() => {
  const { formRules } = useFormRules();
  return {
    userName: formRules.userName,
    password: formRules.password,
  };
});
async function handleSubmit() {
    await validate();
    await authStore.login(model.value.userName, model.value.password);
}
</script>
