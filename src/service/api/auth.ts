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

/**
 * 注册
 * @param username 用户名
 * @param phone 手机号
 * @param code 验证码
 * @param password 密码
 * @returns
 */
export function fetchRegister(username: string, phone: string,  password: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/register",
    method: "post",
    data: {
      username,
      phone,
      password,
    },
  });
}

/**
 * 刷新token
 * @param refreshToken 
 * @returns 
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/refreshToken",
    method: "post",
    data: {
      refreshToken,
    },
  });
}
