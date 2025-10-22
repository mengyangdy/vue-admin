import type { MaybeRefOrGetter } from '@vueuse/core';
import type { MenuOption, MenuProps } from 'naive-ui';
import { computed, ComputedRef, Ref, ref, toValue, watch } from 'vue';
import { ExpandedKey, MenuKey } from './types';
import { useMenus } from './use-menu';
import { useVerticalLayoutMenu } from './use-vertical-layout-menu';
import { useHorizontalLayoutMenu } from './use-horizontal-layout-menu';
import { useFullContentLayoutMenu } from './use-full-content-layout-menu';
import { useTwoColumnLayoutMenu } from './use-two-column-layout-menu';
import { useMixedSidebarLayoutMenu } from './use-mixed-sidebar-layout-menu';
import { useMixedTwoColumnLayoutMenu } from './use-mixed-two-column-layout-menu';

export interface LayoutMenuReturn {
  /**
   * 水平菜单数据,一般放在 header 区域
   */
  horizontalMenuProps: MenuProps;
  /**
   * 垂直菜单数据,一般放在 sidebar 区域
   */
  verticalMenuProps: MenuProps;
  /**
   * 垂直菜单数据,一般放在 sidebar 额外区域
   */
  verticalExtraMenuProps: MenuProps;
}

interface UseLayoutMenuOptions {
  /**
   * 菜单数据
   */
  menus: MaybeRefOrGetter<MenuOption[]>;
  /**
   * 布局模式
   */
  mode: MaybeRefOrGetter<UnionKey.ThemeLayoutMode>;
  /**
   * 菜单数据中子菜单的字段名
   * @default children
   */
  childrenField: string;
  accordion?: MaybeRefOrGetter<boolean>;
}

export interface SharedLayoutOptions {
  /**
   * 展开菜单的 key 列表
   */
  expandedKeys: Ref<ExpandedKey[]>;
  /**
   * 当前激活的菜单 key
   */
  activeKey: Ref<MenuKey>;
  /**
   * 菜单数据
   */
  menus: ComputedRef<MenuOption[]>;
  /**
   * 获取菜单完整路径
   */
  getMenuKeyFullPath: (key: MenuKey) => NonNullable<MenuKey>[];
  /**
   * 菜单 key 到菜单项信息的映射
   */
  menuKeyToMetaMap: ComputedRef<
    Map<
      NonNullable<MenuKey>,
      {
        item: MenuOption;
        parentKey: MenuKey;
        childrenKeys: NonNullable<MenuKey>[];
      }
    >
  >;
  /**
   * 菜单数据中子菜单的字段名
   * @default 'children'
   */
  childrenField: string;
}

/**
 * 根据布局模式和菜单数据，计算出适用于不同布局模式下的菜单props
 */
export function useLayoutMenu(options: UseLayoutMenuOptions) {
  const activeKey = ref<MenuKey>(null);
  const expandedKeys = ref<ExpandedKey[]>([]);
  const childrenField = options.childrenField ?? 'children';
  const mode = computed(() => {
    return toValue(options.mode);
  });
  const accordion = computed(() => {
    return toValue(options.accordion ?? false);
  });

  const { menus, fullKeys, getAncestorKeys, menuKeyToMetaMap, getMenuKeyFullPath } = useMenus(
    options.menus,
    { childrenField },
  );
  const sharedLayoutOptions: SharedLayoutOptions = {
    menus,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    getMenuKeyFullPath,
  };

  const verticalLayout = useVerticalLayoutMenu(sharedLayoutOptions);
  const horizontalLayout = useHorizontalLayoutMenu(sharedLayoutOptions);
  const fullContentLayout = useFullContentLayoutMenu(sharedLayoutOptions);
  const twoColumnLayout = useTwoColumnLayoutMenu(sharedLayoutOptions);
  const mixedSidebarLayout = useMixedSidebarLayoutMenu(sharedLayoutOptions);
  const mixedTwoColumnLayout = useMixedTwoColumnLayoutMenu(sharedLayoutOptions);

  const layout = computed(() => {
    switch (mode.value) {
      case 'sidebar':
      case 'vertical':
        return verticalLayout;
      case 'horizontal':
        return horizontalLayout;
      case 'mixed-sidebar':
        return mixedSidebarLayout;
      case 'full-content':
        return fullContentLayout;
      case 'two-column':
        return twoColumnLayout;
      case 'mixed-two-column':
        return mixedTwoColumnLayout;
      default:
        return fullContentLayout;
    }
  });
  watch(activeKey, () => {
    const keys = accordion.value
      ? getAncestorKeys(activeKey.value)
      : [...expandedKeys.value, ...getAncestorKeys(activeKey.value)];
    expandedKeys.value = Array.from(new Set(keys));
  });

  return {
    fullKeys,
    activeKey,
    getMenuKeyFullPath,
    layout: computed(() => {
      const privateLayout = layout.value;
      return privateLayout.layout.value;
    }),
    verticalLayout: computed(() => {
      return verticalLayout.layout.value;
    }),
    horizontalLayout: computed(() => {
      return horizontalLayout.layout.value;
    }),
    mixedSidebarLayout: computed(() => {
      return mixedSidebarLayout.layout.value;
    }),
    fullContentLayout: computed(() => {
      return fullContentLayout.layout.value;
    }),
    twoColumnLayout: computed(() => {
      return twoColumnLayout.layout.value;
    }),
    mixedTwoColumnLayout: computed(() => {
      return mixedTwoColumnLayout.layout.value;
    }),
  };
}
