import type { ExtractPublicPropTypes } from 'vue';
import { menuProps } from 'naive-ui';

const extendProps = {
  /**
   * 折叠后是否显示 title
   */
  collapsedShowTitle: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 当折叠后是否显示 title 开启时，菜单项的高度
   * @default 82
   */
  menuItemHeightWhenCollapsedShowTitle: Number,
} as const;

export const proMenuProps = {
  ...menuProps,
  ...extendProps,
} as const;

export type ProMenuProps = ExtractPublicPropTypes<typeof proMenuProps>;
