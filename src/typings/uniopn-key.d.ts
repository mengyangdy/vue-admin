declare namespace UnionKey {
  type ThemeScheme = 'light' | 'dark' | 'auto';
  type ResetCacheStrategy = 'close' | 'refresh';
  /**
   * 布局模式
   * vertical: 竖向布局
   * horizontal: 横向布局
   * sidebar: 侧边栏布局
   * mixed-sidebar: 混合侧边栏布局
   * full-content: 全内容布局
   * two-column: 双栏布局
   * mixed-two-column: 混合双栏布局
   */
  type ThemeLayoutMode =
    | 'vertical'
    | 'horizontal'
    | 'sidebar'
    | 'mixed-sidebar'
    | 'full-content'
    | 'two-column'
    | 'mixed-two-column'
    | 'vertical-mix'
    | 'horizontal-mix';

  type ThemeScrollMode = 'wrapper' | 'content';
  type ThemePageAnimateMode =
    | 'fade'
    | 'fade-slide'
    | 'fade-bottom'
    | 'fade-scale'
    | 'zoom-fade'
    | 'zoom-out'
    | 'none';

  type PageTabMode = 'button' | 'chrome';

  type LoginModule = 'pwd-login' | 'code-login' | 'register' | 'reset-pwd';
}
