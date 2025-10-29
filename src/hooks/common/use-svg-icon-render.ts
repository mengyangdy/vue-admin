import { h } from 'vue';
import type { Component } from 'vue';

/**
 * svg图标渲染
 * @param SvgIcon 图标组件
 * @returns 图标渲染函数
 */
export default function useSvgIconRender(SvgIcon: Component) {
  interface IconConfig {
    /** Iconify图标名称 */
    icon?: string;
    /** 本地图标名称 */
    localIcon?: string;
    /** 图标颜色 */
    color?: string;
    /** 图标大小 */
    fontSize?: number;
  }
  type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'fontSize'>>;

  /**
   * Svg图标VNode
   *
   * @param config 配置
   */
  const SvgIconVNode = (config: IconConfig) => {
    const { color, fontSize, icon, localIcon } = config;

    const style: IconStyle = {};

    if (color) {
      style.color = color;
    }
    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    if (!icon && !localIcon) {
      return undefined;
    }

    return () => h(SvgIcon, { icon, localIcon, style });
  };

  return {
    SvgIconVNode,
  };
}
