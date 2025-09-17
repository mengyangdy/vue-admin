import { SetupStoreId } from "@/enum";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteRecordRaw } from "vue-router";

export interface UserInfo {
  name: string;
  token: string;
  roles: string[];
  codes: string[];
}

export interface UserLoginPayload {
  username: string;
  password: string;
  [x: string]: any;
}

export const useUserStore = defineStore(SetupStoreId.User, () => {
  const user = ref<UserInfo>({
    name: "",
    roles: [],
    codes: [],
    token: localStorage.getItem("token") ?? "",
  });
  const homePath = "/home"; // 当前用户的首页路径
  const routes = ref<RouteRecordRaw[]>([]); // 当前角色拥有的路由，Admin 中根据此数据生成菜单
  const getMenuAll = () => {};

  async function fetchUpdateUserInfo() {}
  return {
    user,
    homePath,
    routes,
    fetchUpdateUserInfo,
    getMenuAll,
  };
});
