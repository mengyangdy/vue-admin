import type { AxiosResponse } from "axios";
import {
  BACKEND_ERROR_CODE,
  createFlatRequest,
  createRequest,
} from "../axios-request";
import { useAuthStore } from "@/store/modules/auth";
import { localStg } from "@/utils/storage";
import { getServiceBaseURL } from "@/utils/service";

import { getAuthorization, handleExpiredRequest, showErrorMsg } from "./shared";
import type { RequestInstanceState } from "./type";

const isHttpProxy =
  import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === "Y";
const { baseURL, otherBaseURL } = getServiceBaseURL(
  import.meta.env,
  isHttpProxy
);

export const request = createFlatRequest<
  App.Service.Response,
  RequestInstanceState
>(
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

    isBackendSuccess(response) {
      console.log("🚀 ~ isBackendSuccess ~ response:", response);
      // when the backend response code is "0000"(default), it means the request is success
      // to change this logic by yourself, you can modify the `VITE_SERVICE_SUCCESS_CODE` in `.env` file
      return (
        String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE
      );
    },
    async onBackendFail(response, instance) {
      console.log("🚀 ~ onBackendFail ~ response:", response);
      const authStore = useAuthStore();
      const responseCode = String(response.data.code);

      function handleLogout() {
        authStore.resetStore();
      }
      function logoutAndCleanup() {
        handleLogout();
        window.removeEventListener("beforeunload", handleLogout);
        request.state.errMsgStack = request.state.errMsgStack.filter(
          (msg) => msg !== response.data.msg
        );
      }

      // when the backend response code is in `logoutCodes`, it means the user will be logged out and redirected to login page
      const logoutCodes =
        import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(",") || [];
      if (logoutCodes.includes(responseCode)) {
        handleLogout();
        return null;
      }

      // when the backend response code is in `modalLogoutCodes`, it means the user will be logged out by displaying a modal
      const modalLogoutCodes =
        import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(",") || [];
      if (
        modalLogoutCodes.includes(responseCode) &&
        !request.state.errMsgStack?.includes(response.data.msg)
      ) {
        request.state.errMsgStack = [
          ...(request.state.errMsgStack || []),
          response.data.msg,
        ];

        // prevent the user from refreshing the page
        window.addEventListener("beforeunload", handleLogout);

        window.$dialog?.error({
          title: "错误",
          content: response.data.msg,
          positiveText: "确认",
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

      // when the backend response code is in `expiredTokenCodes`, it means the token is expired, and refresh token
      // the api `refreshToken` can not return error code in `expiredTokenCodes`, otherwise it will be a dead loop, should return `logoutCodes` or `modalLogoutCodes`
      const expiredTokenCodes =
        import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(",") || [];
      if (expiredTokenCodes.includes(responseCode)) {
        const success = await handleExpiredRequest(request.state);
        if (success) {
          const Authorization = getAuthorization();
          Object.assign(response.config.headers, { Authorization });

          return instance.request(response.config) as Promise<AxiosResponse>;
        }
      }

      return null;
    },
    transformBackendResponse(response) {
      console.log("🚀 ~ transformBackendResponse ~ response:", response);
      return response.data.data;
    },
    // 后台返回错误处理
    onError(error) {
      let message = error.message;
      let backendErrorCode = "";

      // 业务逻辑错误（HTTP 200，但业务 code 不对）
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message;
        backendErrorCode = String(error.response?.data?.code || "");

        // 这些错误已在 onBackendFail 中处理，不需要再显示
        const modalLogoutCodes =
          import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(",") || [];
        if (modalLogoutCodes.includes(backendErrorCode)) {
          return;
        }

        const expiredTokenCodes =
          import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(",") || [];
        if (expiredTokenCodes.includes(backendErrorCode)) {
          return;
        }
      }
      // HTTP 错误（400/500 等）- 直接提取并显示
      else if (error.response?.data) {
        console.log(111);

        message = error.response?.data?.msg || message;
      }

      showErrorMsg(request.state, message);
    },
  }
);

export const demoRequest = createRequest<App.Service.DemoResponse>(
  {
    baseURL: otherBaseURL.demo,
  },
  {
    async onRequest(config) {
      const { headers } = config;

      // set token
      const token = localStg.get("token");
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // when the backend response code is "200", it means the request is success
      // you can change this logic by yourself
      return response.data.status === "200";
    },
    async onBackendFail(_response) {
      // when the backend response code is not "200", it means the request is fail
      // for example: the token is expired, refresh token and retry request
    },
    transformBackendResponse(response) {
      return response.data.result;
    },
    onError(error) {
      // when the request is fail, you can show error message

      let message = error.message;

      // show backend error message
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.message || message;
      }

      window.$message?.error(message);
    },
  }
);
