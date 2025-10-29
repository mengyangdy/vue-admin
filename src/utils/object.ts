/**
 * 从对象中挑选指定的字段。
 * @param obj 原始对象
 * @param keys 需要保留的字段名数组
 * @returns 只包含指定字段的新对象
 */
export function objectPick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * 从对象中排除指定的字段。
 * @param obj 原始对象
 * @param keys 需要排除的字段名数组
 * @returns 删除指定字段后的新对象
 */
export function objectOmit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k as K))) as Omit<
    T,
    K
  >;
}
