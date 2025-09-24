declare namespace App {
  namespace Service {
    type OtherBaseURLKey = "demo";
    interface ServiceConfigItem {
      baseURL: string;
      proxyPattern: string;
    }
    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey;
    }
    interface ServiceConfig extends ServiceConfigItem {
      other: OtherServiceConfigItem[];
    }
    interface SimpleServiceConfig extends Pick<ServiceConfigItem, "baseURL"> {
      other: Record<OtherBaseURLKey, string>;
    }
    type Response<T = unknown> = {
      code: string;
      msg: string;
      data: T;
    };
    type DemoResponse<T = unknown> = {
      status: string;
      message: string;
      result: T;
    };
  }
  namespace Theme {
    interface ThemeSetting {
      themeScheme: UnionKey.ThemeScheme;
      layout: {
        mode: UnionKey.ThemeLayoutMode;
        scrollMode: UnionKey.ThemeScrollMode;
      };
      page: {
        animate: boolean;
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      logo: {
        visible: boolean;
      };
      header: {
        visible: boolean;
        height: number;
        fixed: boolean;
      };
      tab: {
        visible: boolean;
        height: number;
        mode: UnionKey.PageTabMode;
      };
      sider: {
        visible: boolean;
        siderCollapse: boolean;
        width: number;
        sidebarExtra: boolean;
        collapsedWidth: number;
      };
      footer: {
        visible: boolean;
        height: number;
        fixed: boolean;
      };
    }
  }
  namespace Global {
    type VNode = import("vue").VNode;
    type FormRule = import("naive-ui").FormItemRule;
  }
}
