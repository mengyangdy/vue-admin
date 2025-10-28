import { request } from '../request';

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/api/system/user',
    method: 'get',
    params,
  });
}
