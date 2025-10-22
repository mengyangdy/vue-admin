import { time } from 'console';
import useCountDown from '../common/use-count-down';
import useLoading from '../common/use-loading';
import { computed } from 'vue';
import { REG_PHONE } from '@/constants/reg';

export function useCaptcha(initialSeconds: number) {
  const { loading, startLoading, endLoading } = useLoading();
  const { count, start, stop, isCounting } = useCountDown(initialSeconds || 10);
  const label = computed(() => {
    let text = `获取验证码`;
    const countingLabel = `${count.value}秒后重新获取`;
    if (loading.value) {
      text = ``;
    }
    if (isCounting.value) {
      text = countingLabel;
    }
    return text;
  });
  function isPhonevalid(phone: string) {
    if (phone.trim() === '') {
      window.$message?.error?.(`请输入手机号`);
      return false;
    }
    if (!REG_PHONE.test(phone)) {
      window.$message?.error?.(`请输入正确的手机号`);
      return false;
    }
    return true;
  }
  async function getCaptcha(phone: string) {
    const valid = isPhonevalid(phone);
    if (!valid || loading.value) {
      return;
    }
    startLoading();

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    window.$message?.success?.(`验证码发送成功`);
    start();
    endLoading();
  }
  return {
    label,
    start,
    stop,
    isCounting,
    loading,
    getCaptcha,
  };
}
