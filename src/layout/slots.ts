export interface ProLayoutSlots {
  /**
   * logo区域
   */
  logo: any;
  /**
   * 顶部左侧
   */
  'nav-left': any;
  /**
   * 顶部栏中间
   */
  'nav-center': any;
  /**
   * 顶部栏右侧
   */
  'nav-right': any;
  /**
   * 侧边栏 在horizontal/full-content布局中不生效
   */
  sidebar: any;
  /**
   * 侧边栏额外区域 只在two-column/mixed-two-column不居中生效
   */
  'sidebar-extra': any;
  /**
   * tabbar 区域
   */
  tabbar: any;
  /**
   * 底部
   */
  footer: any;
  /**
   * 内容区域
   */
  default: any;
}
