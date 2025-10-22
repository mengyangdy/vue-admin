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
      system: {
        title: string;
        updateTitle: string;
        updateContent: string;
        updateConfirm: string;
        updateCancel: string;
      };
      common: {
        action: string;
        add: string;
        addSuccess: string;
        backToHome: string;
        batchDelete: string;
        cancel: string;
        close: string;
        check: string;
        expandColumn: string;
        columnSetting: string;
        config: string;
        confirm: string;
        delete: string;
        deleteSuccess: string;
        confirmDelete: string;
        edit: string;
        warning: string;
        error: string;
        index: string;
        keywordSearch: string;
        logout: string;
        logoutConfirm: string;
        lookForward: string;
        modify: string;
        modifySuccess: string;
        noData: string;
        operate: string;
        pleaseCheckValue: string;
        refresh: string;
        reset: string;
        search: string;
        switch: string;
        tip: string;
        trigger: string;
        update: string;
        updateSuccess: string;
        userCenter: string;
        yesOrNo: {
          yes: string;
          no: string;
        };
      };
      request: {
        logout: string;
        logoutMsg: string;
        logoutWithModal: string;
        logoutWithModalMsg: string;
        refreshToken: string;
        tokenExpired: string;
      };
      theme: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
        grayscale: string;
        colourWeakness: string;
        layoutMode: { title: string; reverseHorizontalMix: string } & Record<
          UnionKey.ThemeLayoutMode,
          string
        >;
        recommendColor: string;
        recommendColorDesc: string;
        themeColor: {
          title: string;
          followPrimary: string;
        } & Theme.ThemeColor;
        scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        fixedHeaderAndTab: string;
        header: {
          height: string;
          breadcrumb: {
            visible: string;
            showIcon: string;
          };
          multilingual: {
            visible: string;
          };
          globalSearch: {
            visible: string;
          };
        };
        tab: {
          visible: string;
          cache: string;
          height: string;
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        };
        sider: {
          inverted: string;
          width: string;
          collapsedWidth: string;
          mixWidth: string;
          mixCollapsedWidth: string;
          mixChildMenuWidth: string;
        };
        footer: {
          visible: string;
          fixed: string;
          height: string;
          right: string;
        };
        watermark: {
          visible: string;
          text: string;
          enableUserName: string;
        };
        themeDrawerTitle: string;
        pageFunTitle: string;
        resetCacheStrategy: { title: string } & Record<UnionKey.ResetCacheStrategy, string>;
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey, string>;
      page: {
        login: {
          common: {
            loginOrRegister: string;
            userNamePlaceholder: string;
            phonePlaceholder: string;
            codePlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            codeLogin: string;
            confirm: string;
            back: string;
            validateSuccess: string;
            loginSuccess: string;
            welcomeBack: string;
          };
          pwdLogin: {
            title: string;
            rememberMe: string;
            forgetPassword: string;
            register: string;
            otherAccountLogin: string;
            otherLoginMode: string;
            superAdmin: string;
            admin: string;
            user: string;
          };
          codeLogin: {
            title: string;
            getCode: string;
            reGetCode: string;
            sendCodeSuccess: string;
            imageCodePlaceholder: string;
          };
          register: {
            title: string;
            agreement: string;
            protocol: string;
            policy: string;
          };
          resetPwd: {
            title: string;
          };
          bindWeChat: {
            title: string;
          };
        };
        home: {
          branchDesc: string;
          greeting: string;
          weatherDesc: string;
          projectCount: string;
          todo: string;
          message: string;
          downloadCount: string;
          registerCount: string;
          schedule: string;
          study: string;
          work: string;
          rest: string;
          entertainment: string;
          visitCount: string;
          turnover: string;
          dealCount: string;
          projectNews: {
            title: string;
            moreNews: string;
            desc1: string;
            desc2: string;
            desc3: string;
            desc4: string;
            desc5: string;
          };
          creativity: string;
        };
      };
      form: {
        required: string;
        userName: FormMsg;
        phone: FormMsg;
        pwd: FormMsg;
        confirmPwd: FormMsg;
        code: FormMsg;
        email: FormMsg;
      };
      dropdown: Record<Global.DropdownKey, string>;
      icon: {
        themeConfig: string;
        themeSchema: string;
        lang: string;
        fullscreen: string;
        fullscreenExit: string;
        reload: string;
        collapse: string;
        expand: string;
        pin: string;
        unpin: string;
      };
      datatable: {
        itemCount: string;
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
