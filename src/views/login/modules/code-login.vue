<template>
  <n-form
    ref="formRef"
    :mode="model"
    :rules="rules"
    size="large"
    :show-label="false"
    @submit.prevent="handleSubmit"
  >
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="请输入手机号" />
    </n-form-item>
    <n-form-item path="code">
      <div class="w-full flex-y-center gap-16px">
        <n-input v-model:value="model.code" placeholder="请输入验证码" />
        <n-button
          type="primary"
          :disabled="isCounting"
          @click="getCaptcha(model.phone)"
          :loading="loading"
          >{{ label }}</n-button
        >
      </div>
    </n-form-item>
    <n-flex vertical :size="18" class="w-full">
      <loading-button block type="primary" size="large" round attr-type="submit"
        >登录</loading-button
      >
      <div class="flex-y-center justify-between gap-12px">
        <n-button
          class="flex-1"
          block
          @click="authStore.changeLoginComponent('code-login')"
          >密码登录</n-button
        >
        <n-button
          class="flex-1"
          block
          @click="authStore.changeLoginComponent('register')"
          >注册账号</n-button
        >
      </div>
      <n-divider class="text-14px text-#666 !m-0">其他账号登录</n-divider>
    </n-flex>
  </n-form>
</template>

<script setup lang="ts">
defineOptions({
  name: "CodeLogin",
});
import { useAuthStore } from "@/store/modules/auth";
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { computed, ref } from "vue";
import { useCaptcha } from "@/hooks/business/captcha";

const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();
const { label, isCounting, loading, getCaptcha } = useCaptcha(60);

interface FormModel {
  phone: string;
  code: string;
}
const model = ref<FormModel>({
  phone: "",
  code: "",
});

const rules = computed(() => {
  const { formRules } = useFormRules();
  return {
    phone: formRules.phone,
    code: formRules.code,
  };
});

async function handleSubmit() {
  await validate();
  window.$message?.success("暂时没做手机号验证登录");
}
</script>
