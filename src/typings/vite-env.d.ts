declare namespace Env {
  type RouterHistoryMode = "hash" | "history" | "memory";
  interface ImportMeta extends ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_AUTH_ROUTE_MODE: string;
    /** The prefix of the iconify icon */
    readonly VITE_ICON_PREFIX: "icon";
    /**
     * The prefix of the local icon
     *
     * This prefix is start with the icon prefix
     */
    readonly VITE_ICON_LOCAL_PREFIX: "local-icon";
    readonly VITE_SERVICE_BASE_URL: string;
    readonly VITE_ROUTE_HOME: string;
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo;
    readonly VITE_PROXY_LOG?: CommonType.YesOrNo;
    readonly VITE_SERVICE_SUCCESS_CODE: string;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
