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
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
