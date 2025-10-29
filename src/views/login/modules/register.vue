<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
    @submit.prevent="handleSubmit"
  >
    <n-form-item path="username">
      <n-input v-model:value="model.username" placeholder="请输入账号" />
    </n-form-item>
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="请输入手机号" />
    </n-form-item>
    <n-form-item path="code">
      <div class="w-full flex-y-center gap-16px">
        <n-input v-model:value="model.code" placeholder="请输入验证码" />
        <n-button
          type="primary"
          size="large"
          :disabled="isCounting"
          @click="getCaptcha(model.phone)"
          :loading="loading"
        >
          {{ label }}
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        placeholder="请输入密码"
      />
    </n-form-item>
    <n-form-item path="confirmPassword">
      <n-input
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        placeholder="请输入确认密码"
      />
    </n-form-item>
    <n-flex vertical :size="24">
      <n-button attr-type="submit" type="primary" size="large" block :loading="btnLoading">
        注册
      </n-button>
      <div class="flex-y-center justify-between gap-12px">
        <n-button class="flex-1" block @click="authStore.changeLoginComponent('pwd-login')">
          密码登录
        </n-button>
        <n-button class="flex-1" block @click="authStore.changeLoginComponent('code-login')">
          验证码登录
        </n-button>
      </div>
      <n-divider class="text-14px text-#666 !m-0">其他账号登录</n-divider>
    </n-flex>
  </n-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useCaptcha } from '@/hooks/business/captcha';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();

const { formRef, validate } = useNaiveForm();
const { label, isCounting, loading, getCaptcha } = useCaptcha(60);

interface FormModel {
  username: string;
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
}

const model = ref<FormModel>({
  username: 'dylan',
  phone: '13937594982',
  code: '000000',
  password: '123456',
  confirmPassword: '123456',
});

const rules = computed(() => {
  const { formRules, createConfirmPwdRule } = useFormRules();
  return {
    phone: formRules.phone,
    code: formRules.code,
    password: formRules.password,
    confirmPassword: createConfirmPwdRule(model.value.password),
  };
});
const btnLoading = ref(false);
async function handleSubmit() {
  await validate();
  try {
    btnLoading.value = true;
    await authStore.register(model.value.username, model.value.phone, model.value.password);
  } finally {
    btnLoading.value = false;
  }
}
</script>
