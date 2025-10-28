import type { AxiosInstance } from 'axios';

export interface RequestInstanceState {
  /** whether the request is refreshing token */
  refreshTokenFn: Promise<boolean> | null;
  /** the request error message stack */
  errMsgStack: string[];
  /** axios instance for retrying failed requests */
  axiosInstance?: AxiosInstance;
}
