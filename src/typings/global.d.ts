export {};

declare global {
  const __DEV__: boolean;
  export type Recordable = Record<string, any>;
  export interface Window {
    /** Loading bar instance */
    $loadingBar?: import("naive-ui").LoadingBarProviderInst;
    /** Dialog instance */
    $dialog?: import("naive-ui").DialogProviderInst;
    /** Message instance */
    $message?: import("naive-ui").MessageProviderInst;
    /** Notification instance */
    $notification?: import("naive-ui").NotificationProviderInst;
  }

  export const BUILD_TIME: string;

  // Temporal API types
  namespace Temporal {
    interface PlainDate {
      year: number;
      month: number;
      day: number;
      dayOfWeek: number;
    }

    interface Now {
      plainDateISO(): PlainDate;
    }
  }

  const Temporal: {
    Now: Temporal.Now;
  };
}
