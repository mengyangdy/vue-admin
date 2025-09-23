import { SetupStoreId } from "@/constants";
import { defineStore } from "pinia";
import { getToken } from "./shared";
import { computed, ref } from "vue";

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const token = ref(getToken());
  const isLogin = computed(() => Boolean(token.value));

  const login = (userName: string, password: string, redirect = true) => {};

  return {
    token,
    isLogin,
    login,
  };
});
