import { request } from "../request";

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns
 */
export function fetchLogin(username: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
}

/**
 * 获取用户信息
 * @returns
 */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: "/auth/getUserInfo" });
}

export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/refreshToken",
    method: "post",
    data: {
      refreshToken,
    },
  });
}
