import { SetupStoreId } from '@/constants';
import { setLocale } from '@/locales';
import { localStg } from '@/utils/storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const locale = ref<App.I18n.LangType>(localStg.get('lang') || 'zh-CN');

  const localeOptions: App.I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN',
    },
    {
      label: 'English',
      key: 'en-US',
    },
  ];

  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang;
    setLocale(lang);
    localStg.set('lang', lang);
  }
  return {
    locale,
    localeOptions,
    changeLocale,
  };
});
