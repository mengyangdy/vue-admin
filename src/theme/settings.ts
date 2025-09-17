/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: "light",
  layout: {
    mode: "vertical",
    scrollMode: "content",
  },
  logo: {
    visible: true,
  },
  page: {
    animate: true,
    animateMode: "fade-slide",
  },
  header: {
    height: 56,
    visible: true,
    fixed: true,
  },
  tab: {
    visible: true,
    height: 44,
    mode: "chrome",
  },
  sider: {
    visible: true,
    siderCollapse: true,
    width: 220,
    collapsedWidth: 64,
    sidebarExtra: false,
  },
  footer: {
    visible: true,
    fixed: true,
    height: 48,
  },
};

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
