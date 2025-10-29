import type { ComputedRef, Ref } from 'vue';
import { ref, toValue } from 'vue';

import { FormInst } from 'naive-ui';

import { REG_CODE_SIX, REG_EMAIL, REG_PHONE, REG_PWD, REG_USER_NAME } from '@/constants/reg';

export function useFormRules() {
  const patternRules = {
    userName: {
      pattern: REG_USER_NAME,
      message: '请输入4-16位中文、英文、数字、下划线、中划线',
      trigger: 'change',
    },
    phone: {
      pattern: REG_PHONE,
      message: '请输入正确的手机号',
      trigger: 'change',
    },
    password: {
      pattern: REG_PWD,
      message: '请输入6-18位英文、数字、下划线',
    },
    email: {
      pattern: REG_EMAIL,
      message: '请输入正确的邮箱',
    },
    code: {
      pattern: REG_CODE_SIX,
      message: '请输入6位验证码',
      trigger: 'change',
    },
  };

  const formRules = {
    userName: [createRequiredRule('请输入账号'), patternRules.userName],
    phone: [createRequiredRule('请输入手机号'), patternRules.phone],
    password: [createRequiredRule('请输入密码'), patternRules.password],
    code: [createRequiredRule('请输入验证码'), patternRules.code],
    email: [createRequiredRule('请输入邮箱'), patternRules.email],
  };
  const defaultRequiredRule = createRequiredRule('必填');

  function createRequiredRule(message: string) {
    return {
      required: true,
      message,
    };
  }

  function createConfirmPwdRule(pwd: string | Ref<string> | ComputedRef<string>) {
    const confirmPwdRule: App.Global.FormRule[] = [
      {
        required: true,
        message: '必填',
      },
      {
        asyncValidator: (rule, value) => {
          if (value.trim() !== '' && value !== toValue(pwd)) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        message: '两次密码不一致',
        trigger: 'input',
      },
    ];
    return confirmPwdRule;
  }
  return {
    patternRules,
    formRules,
    defaultRequiredRule,
    createRequiredRule,
    createConfirmPwdRule,
  };
}

export function useNaiveForm() {
  const formRef = ref<FormInst | null>(null);
  async function validate() {
    await formRef.value?.validate();
  }
  async function restoreValidation() {
    formRef.value?.restoreValidation();
  }
  return {
    formRef,
    validate,
    restoreValidation,
  };
}
