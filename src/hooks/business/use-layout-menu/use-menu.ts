import { computed, toValue } from 'vue';

import type { MaybeRefOrGetter } from '@vueuse/core';
import { isNil } from 'es-toolkit';
import { MenuOption } from 'naive-ui';
import { eachTree } from 'pro-composables';

import { MenuKey } from './types';

interface UseMenuOptions {
  /**
   * 子菜单的字段名
   */
  childrenField: string;
}

export function useMenus(menus: MaybeRefOrGetter<MenuOption[]>, options: UseMenuOptions) {
  const resolvedMenus = computed(() => {
    return toValue(menus);
  });
  const menuKeyToMetaMap = computed(() => {
    const childrenfield = options.childrenField ?? 'children';
    const map = new Map<
      NonNullable<MenuKey>,
      {
        item: MenuOption;
        parentKey: MenuKey;
        childrenKeys: NonNullable<MenuKey>[];
      }
    >();
    eachTree(
      resolvedMenus.value,
      (item, _, { parent }) => {
        const menuKey = item.key;
        const parentMenuKey = parent?.key as any;
        if (!isNil(menuKey)) {
          map.get(parentMenuKey)?.childrenKeys.push(menuKey);
          map.set(menuKey, {
            item,
            childrenKeys: [],
            parentKey: parentMenuKey,
          });
        }
      },
      childrenfield,
    );
    return map;
  });

  const fullKeys = computed(() => {
    return Array.from(menuKeyToMetaMap.value.keys());
  });
  /**
   * 获取任意一个key的祖先key列表
   */
  function getAncestorKeys(key: MenuKey) {
    const keys: NonNullable<MenuKey>[] = [];
    let currentKey = menuKeyToMetaMap.value.get(key as any)?.parentKey;
    while (!isNil(currentKey)) {
      keys.unshift(currentKey);
      const info = menuKeyToMetaMap.value.get(currentKey);
      if (!info) {
        break;
      }
      currentKey = info.parentKey;
    }
    return keys;
  }

  /**
   * 获取任意一个key的子孙key列表
   */
  function getDescennandKeys(key: MenuKey) {
    const keys: NonNullable<MenuKey>[] = [];
    let currentKey = menuKeyToMetaMap.value.get(key as any)?.childrenKeys[0];
    while (!isNil(currentKey)) {
      keys.push(currentKey);
      const info = menuKeyToMetaMap.value.get(currentKey);
      if (!info) {
        break;
      }
      currentKey = info.childrenKeys?.[0];
    }
    return keys;
  }
  /**
   * 从任意一个key出发，获取该key的菜单完整路径
   * 如果有多层级的孩子，只取每一个层级孩子的第一个，已知取到叶子节点
   * @param key
   */
  function getMenuKeyFullPath(key: MenuKey) {
    const includeSelf = fullKeys.value.includes(key as any);
    return [
      ...getAncestorKeys(key),
      includeSelf ? key : undefined,
      ...getDescennandKeys(key),
    ].filter((k) => !isNil(k)) as NonNullable<MenuKey>[];
  }

  return {
    fullKeys,
    getAncestorKeys,
    menuKeyToMetaMap,
    getDescennandKeys,
    getMenuKeyFullPath,
    menus: resolvedMenus,
  };
}
