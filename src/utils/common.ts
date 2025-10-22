/**
 * 转换选项
 * @param options 选项数组
 * @returns
 */
export function translateOptions(options: CommonType.Option<string, App.I18n.I18nKey>[]) {
  return options.map((option) => ({
    ...option,
    label: option.label,
  }));
}

/**
 * 将记录转化为选项
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 * @param record - 记录
 * @returns
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label,
  })) as CommonType.Option<keyof T, T[keyof T]>[];
}
