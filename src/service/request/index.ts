import { useAuthStore } from '@/store/modules/auth';
import { getServiceBaseURL } from '@/utils/service';
import { localStg } from '@/utils/storage';

import { BACKEND_ERROR_CODE, createFlatRequest, createRequest } from '../axios-request';
import { getAuthorization, handleExpiredRequest, showErrorMsg } from './shared';
import type { RequestInstanceState } from './type';

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

export const request = createFlatRequest<App.Service.Response, RequestInstanceState>(
  {
    baseURL,
  },
  {
    // 请求拦截器
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });
      return config;
    },
    // 后端定义一个code字段，当code为0000时，表示请求成功
    isBackendSuccess(response) {
      // 当后端响应 code 为 "0000"（默认）时，表示请求成功
      // 如需自定义此逻辑，可在 `.env` 文件中修改 `VITE_SERVICE_SUCCESS_CODE`
      return String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    async onBackendFail(response) {
      const authStore = useAuthStore();
      const responseCode = String(response.data.code);

      function handleLogout() {
        authStore.resetStore();
      }
      function logoutAndCleanup() {
        handleLogout();
        window.removeEventListener('beforeunload', handleLogout);
        request.state.errMsgStack = request.state.errMsgStack.filter(
          (msg) => msg !== response.data.msg,
        );
      }

      // 当后端响应 code 在 `logoutCodes` 中时，表示用户将被登出并重定向到登录页
      const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
      if (logoutCodes.includes(responseCode)) {
        handleLogout();
        return null;
      }

      // 当后端响应 code 在 `modalLogoutCodes` 中时，表示将通过显示模态框来登出用户
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (
        modalLogoutCodes.includes(responseCode) &&
        !request.state.errMsgStack?.includes(response.data.msg)
      ) {
        request.state.errMsgStack = [...(request.state.errMsgStack || []), response.data.msg];

        // 防止用户刷新页面
        window.addEventListener('beforeunload', handleLogout);

        window.$dialog?.error({
          title: '错误',
          content: response.data.msg,
          positiveText: '确认',
          maskClosable: false,
          closeOnEsc: false,
          onPositiveClick() {
            logoutAndCleanup();
          },
          onClose() {
            logoutAndCleanup();
          },
        });

        return null;
      }
      return null;
    },
    transformBackendResponse(response) {
      return response.data.data;
    },
    // 后台返回错误处理
    async onError(error, instance) {
      let message = error.message;
      let backendErrorCode = '';

      // 业务逻辑错误（HTTP 200，但业务 code 不对）
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message;
        backendErrorCode = String(error.response?.data?.code || '');

        // 这些错误已在 onBackendFail 中处理，不需要再显示
        const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
        if (modalLogoutCodes.includes(backendErrorCode)) {
          return;
        }

        const expiredTokenCodes =
          import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
        if (expiredTokenCodes.includes(backendErrorCode)) {
          return;
        }
      } else if (error.response?.status === 401) {
        // 处理 401 未授权错误（token 过期）
        const success = await handleExpiredRequest(request.state);
        if (success && error.config) {
          // 获取新的 token
          const Authorization = getAuthorization();
          // 更新请求头中的 Authorization
          Object.assign(error.config.headers || {}, { Authorization });
          // 重新发起请求
          return instance.request(error.config);
        }
      }
      // HTTP 错误（400/500 等）- 直接提取并显示
      else if (error.response?.data) {
        message = error.response?.data?.msg || message;
      }

      showErrorMsg(request.state, message);
    },
  },
);

export const demoRequest = createRequest<App.Service.DemoResponse>(
  {
    baseURL: otherBaseURL.demo,
  },
  {
    async onRequest(config) {
      const { headers } = config;

      // 设置 token
      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // 当后端响应 code 为 "200" 时，表示请求成功
      // 你可以自定义此逻辑
      return response.data.status === '200' || response.data.status === '201';
    },
    async onBackendFail(_response) {
      // 当后端响应 code 不是 "200" 时，表示请求失败
      // 例如：token 已过期，刷新 token 并重试请求
    },
    transformBackendResponse(response) {
      return response.data.result;
    },
    onError(error, _instance) {
      // 当请求失败时，可以显示错误消息

      let message = error.message;

      // 显示后端错误消息
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.message || message;
      }

      window.$message?.error(message);
    },
  },
);
