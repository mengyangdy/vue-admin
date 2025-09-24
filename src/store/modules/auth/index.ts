import { SetupStoreId } from "@/constants";
import { defineStore } from "pinia";
import { getToken } from "./shared";
import { computed, reactive, ref } from "vue";
import { fetchGetUserInfo, fetchLogin } from "@/service/api/auth";
import { localStg } from "@/utils/storage";

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const token = ref(getToken());
  const userInfo: Api.Auth.UserInfo = reactive({
    userId: "",
    userName: "",
    roles: [],
    buttons: [],
  });
  const isLogin = computed(() => Boolean(token.value));

  const currentLoginComponent = ref<UnionKey.LoginModule>("pwd-login");

  const changeLoginComponent = (component: UnionKey.LoginModule) => {
    currentLoginComponent.value = component;
  };

  const login = async (userName: string, password: string, redirect = true) => {
    const { data: LoginToken, error } = await fetchLogin(userName, password);
    if (!error) {
      const pass = await loginByToken(LoginToken);
      if (pass) {
        window.$notification?.success({
          title: "登录成功",
          content: `欢迎回来，${userInfo.userName}`,
          duration: 4500,
        });
      }
    } else {
      resetStore();
    }
  };

  const loginByToken = async (LoginToken: Api.Auth.LoginToken) => {
    localStg.set("token", LoginToken.token);
    localStg.set("refreshToken", LoginToken.refreshToken);

    const pass = await getUserInfo();
    if (pass) {
      token.value = LoginToken.token;
      return true;
    }
    return false;
  };

  const getUserInfo = async () => {
    const { data: info, error } = await fetchGetUserInfo();
    if (!error) {
      Object.assign(userInfo, info);
      return true;
    }
    return false;
  };

  const resetStore = () => {};

  return {
    token,
    userInfo,
    isLogin,
    login,
    getUserInfo,
    resetStore,
    currentLoginComponent,
    changeLoginComponent,
  };
});
