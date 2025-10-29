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

// 更新用户信息
export function fetchUpdateUser(id: number, params: Api.SystemManage.UserUpdateParams){
  return request({
    url: `/api/system/user/${id}`,
    method: 'patch',
    data: params,
  });
}

// 新建用户
export function fetchCreateUser(params: Api.SystemManage.UserUpdateParams){
  return request({
    url: '/api/system/user',
    method: 'post',
    data: params,
  });
}
