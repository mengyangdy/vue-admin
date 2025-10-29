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

export function simplyOmit<T, K extends keyof T, R extends Record<string, any>>(
  object: T,
  keys: K[] = [],
  rest?: R,
): Omit<T, K> & (R extends undefined ? Record<string, unknown> : R) {
  const omitedObject: any = {};
  const originalKeys = Object.getOwnPropertyNames(object);
  originalKeys.forEach((originalKey) => {
    if (!(keys as string[]).includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey as keyof T];
    }
  });
  return Object.assign(omitedObject, rest);
}
