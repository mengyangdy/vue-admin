import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/api/systemManage/getRoleList',
    method: 'get',
    params,
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/api/systemManage/getAllRoles',
    method: 'get',
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/api/systemManage/getUserList',
    method: 'get',
    params,
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/api/systemManage/getMenuList/v2',
    method: 'get',
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/api/systemManage/getAllPages',
    method: 'get',
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/api/systemManage/getMenuTree',
    method: 'get',
  });
}
