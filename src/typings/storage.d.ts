declare namespace StorageType {
  interface Session {
    themeColor: string;
  }
  interface Local {
    lang: App.I18n.LangType;
    token: string;
    refreshToken: string;
    themeColor: string;
    darkMode: boolean;
    themeSettings: App.Theme.ThemeSetting;
    /**
     * 覆盖主题标志
     * 值是项目的构建时间
     */
    overrideThemeFlag: string;
    userInfo: Api.Auth.UserInfo | null;
    lastLoginUserId: number | null;
  }
}
