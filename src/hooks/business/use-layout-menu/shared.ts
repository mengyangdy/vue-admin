import type { MenuOption } from 'naive-ui';

interface SplitMenuDataOptions {
  /**
   * children 的字段名
   * @default 'children'
   */
  childrenField?: string;
}

/**
 * 可以停止后续遍历的广度优先搜索，为了优化性能
 */
export function bfs<T>(
  data: T[],
  callback: (item: T, level: number, stop: () => void) => void,
  childrenField = 'children',
) {
  let stoped = false;
  const levelSymbol = Symbol('level');
  let queue = data.map((item) => ({ ...item, [levelSymbol]: 1 }));

  const stop = () => {
    stoped = true;
  };

  while (queue.length > 0) {
    const item = queue.shift()!;
    const { [levelSymbol]: level, ...originalItem } = item;
    callback(originalItem as T, level, stop);
    if (stoped) {
      queue = [];
      queue.length = 0;
      break;
    }
    const children = (item as any)[childrenField] as T[] | undefined;
    if (children && children.length > 0) {
      queue.push(...children.map((child) => ({ ...child, [levelSymbol]: level + 1 })));
    }
  }
}

/**
 * TODO: 需不需要考虑 type 为 divider 和 group 的情况
 * 分割菜单数据
 * @param menus 菜单数据
 * @param levelOfSplit 分割层级，0表示不分割，1表示分割成一级和其他层级，2表示分割成一级、二级和其他层级
 */
export function splitMenuData(
  menus: MenuOption[],
  levelOfSplit: 0,
  options?: SplitMenuDataOptions,
): [MenuOption[]];
export function splitMenuData(
  menus: MenuOption[],
  levelOfSplit: 1,
  options?: SplitMenuDataOptions,
): [MenuOption[], MenuOption[]];
export function splitMenuData(
  menus: MenuOption[],
  levelOfSplit: 2,
  options?: SplitMenuDataOptions,
): [MenuOption[], MenuOption[], MenuOption[]];
export function splitMenuData(
  menus: MenuOption[],
  levelOfSplit: number,
  options?: SplitMenuDataOptions,
): [MenuOption[]];
export function splitMenuData(
  menus: MenuOption[],
  levelOfSplit: number,
  options: SplitMenuDataOptions = {},
): [MenuOption[]] | [MenuOption[], MenuOption[]] | [MenuOption[], MenuOption[], MenuOption[]] {
  const { childrenField = 'children' } = options;

  if (levelOfSplit === 1) {
    const firstLevelMenus: MenuOption[] = [];
    const otherLevelMenus: MenuOption[] = [];
    bfs(
      menus,
      (menu, level, stop) => {
        if (level > 2) {
          stop();
          return;
        }
        if (level === 1) {
          const { [childrenField]: _, ...menuWithoutChildren } = menu;
          firstLevelMenus.push(menuWithoutChildren);
          return;
        }
        if (level === 2) {
          otherLevelMenus.push(menu);
        }
      },
      childrenField,
    );
    return [firstLevelMenus, otherLevelMenus];
  }
  if (levelOfSplit === 2) {
    const firstLevelMenus: MenuOption[] = [];
    const secondLevelMenus: MenuOption[] = [];
    const otherLevelMenus: MenuOption[] = [];
    bfs(
      menus,
      (menu, level, stop) => {
        if (level > 3) {
          stop();
          return;
        }
        if (level === 1) {
          const { [childrenField]: _, ...menuWithoutChildren } = menu;
          firstLevelMenus.push(menuWithoutChildren);
          return;
        }
        if (level === 2) {
          const { [childrenField]: _, ...menuWithoutChildren } = menu;
          secondLevelMenus.push(menuWithoutChildren);
          return;
        }
        if (level === 3) {
          otherLevelMenus.push(menu);
        }
      },
      childrenField,
    );
    return [firstLevelMenus, secondLevelMenus, otherLevelMenus];
  }
  return [menus];
}
