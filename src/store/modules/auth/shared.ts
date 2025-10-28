import { localStg } from '@/utils/storage';

export function getToken() {
  return localStg.get('token') || '';
}

export function getCachedUserInfo() {
  return localStg.get('userInfo') || null;
}

export function cacheUserInfo(userInfo: Api.Auth.UserInfo) {
  localStg.set('userInfo', userInfo);
}

export function clearAuthStorage() {
  localStg.remove('token');
  localStg.remove('refreshToken');
}
