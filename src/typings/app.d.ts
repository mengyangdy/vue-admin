/**
 * 全局命名空间
 */
declare namespace App {
  namespace Service {
    type OtherBaseURLKey = 'demo';
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
    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
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
  /**
   * 主题命名空间
   */
  namespace Theme {
    type ColorPaletteNumber = import('@dylanjs/utils').ColorPaletteNumber;
    /**
     * 主题设置
     */
    interface ThemeSetting {
      /**
       * 主题模式
       */
      themeScheme: UnionKey.ThemeScheme;
      /**
       * 灰度模式
       */
      grayscale: boolean;
      /**
       * 色弱模式
       */
      colourWeakness: boolean;
      /** 是否推荐颜色 */
      recommendColor: boolean;
      /**
       * 主题颜色
       */
      themeColor: string;
      /**
       * 其他颜色
       */
      otherColor: OtherColor;
      /**
       * 信息颜色是否跟随主题颜色
       */
      isInfoFollowPrimary: boolean;
      /** 重置缓存策略 */
      resetCacheStrategy: UnionKey.ResetCacheStrategy;
      /**
       * 布局设置
       */
      layout: {
        mode: UnionKey.ThemeLayoutMode;
        /**
         * 是否反转水平混合布局
         * 如果位true 左侧显示垂直子级菜单 顶部显示水平一级菜单
         */
        reverseHorizontalMix: boolean;
        /* 滚动模式*/
        scrollMode: UnionKey.ThemeScrollMode;
      };
      /**
       * 页面设置
       */
      page: {
        animate: boolean;
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /**
       * logo设置
       */
      logo: {
        visible: boolean;
      };
      /**
       * 头部设置
       */
      header: {
        visible: boolean;
        height: number;
        fixed: boolean;
        /** 头部面包屑 */
        breadcrumb: {
          /** 是否显示面包屑 */
          visible: boolean;
          /** 是否显示面包屑图标 */
          showIcon: boolean;
        };
        /** 多语言 */
        multilingual: {
          /** 是否显示多语言 */
          visible: boolean;
        };
        globalSearch: {
          /** 是否显示全局搜索 */
          visible: boolean;
        };
      };
      /**
       * 标签栏设置
       */
      tab: {
        visible: boolean;
        height: number;
        mode: UnionKey.PageTabMode;
        fixed: boolean;
        cache: boolean;
      };
      /**
       * 侧边栏设置
       */
      sider: {
        /** 是否显示侧边栏 */
        visible: boolean;
        /** 反转侧边栏 */
        inverted: boolean;
        /** 是否折叠侧边栏 */
        siderCollapse: boolean;
        /** 侧边栏宽度 */
        width: number;
        /**
         * 侧边栏折叠后是否显示菜单名
         */
        sidebarCollapsedShowMenuTitle: boolean;
        /**
         * 当展示菜单标题时，侧边栏折叠后的宽度
         */
        sidebarCollapsedWidthWhenShowMenuTitle: number;
        /**
         * 是否开启侧边栏菜单分组
         */
        sidebarMenuGroup: false;
        /**
         * 是否开启侧边栏菜单分割线
         */
        sidebarMenuDivider: false;
        /** 侧边栏额外区域 */
        sidebarExtra: boolean;
        /** 侧边栏折叠宽度 */
        collapsedWidth: number;
        /** 布局为 'vertical-mix' 或 'horizontal-mix' 时的侧边栏宽度 */
        mixWidth: number;
        /** 布局为 'vertical-mix' 或 'horizontal-mix' 时的折叠侧边栏宽度 */
        mixCollapsedWidth: number;
        /** 布局为 'vertical-mix' 或 'horizontal-mix' 时的子菜单宽度 */
        mixChildMenuWidth: number;
      };
      /**
       * 底部设置
       */
      footer: {
        visible: boolean;
        height: number;
        fixed: boolean;
        right: boolean;
      };
      /** 水印 */
      watermark: {
        /** 是否显示水印 */
        visible: boolean;
        /** 水印文本 */
        text: string;
        /** 是否使用用户名作为水印文本 */
        enableUserName: boolean;
      };
      /** 定义一些主题设置令牌，将转换为 CSS 变量 */
      tokens: {
        light: ThemeSettingToken;
        dark?: {
          [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
        };
      };
    }
    interface ThemeSettingToken {
      colors: ThemeSettingTokenColor;
      boxShadow: ThemeSettingTokenBoxShadow;
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }
    type ThemeColorKey = keyof ThemeColor;

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeSettingTokenColor {
      /** 进度条颜色，如果未设置，将使用主色 */
      nprogress?: string;
      container: string;
      layout: string;
      inverted: string;
      'base-text': string;
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor;

    interface ThemeSettingTokenBoxShadow {
      header: string;
      sider: string;
      tab: string;
    }

    /** 主题令牌 CSS 变量 */
    type ThemeTokenCSSVars = {
      colors: ThemeTokenColor & { [key: string]: string };
      boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string };
    };
  }
  namespace I18n {
    type RouteKey = import('@elegant-router/types').RouteKey;

    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, 'root' | 'not-found'>;

    type FormMsg = {
      required: string;
      invalid: string;
    };

    type Schema = {
      page: {
        home: {
          title: string;
        };
      };
    };

    type GetI18nKey<
      T extends Record<string, unknown>,
      K extends keyof T = keyof T,
    > = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    type I18nKey = GetI18nKey<Schema>;

    type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

    interface $T {
      (key: I18nKey): string;
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], plural: number): string;
      (key: I18nKey, list: unknown[], defaultMsg: string): string;
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, named: Record<string, unknown>, plural: number): string;
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
    }
  }
  namespace Global {
    type VNode = import('vue').VNode;
    type FormRule = import('naive-ui').FormItemRule;
  }
}
