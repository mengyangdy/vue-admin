import { $t } from '@/locales';

/**
 * 转换选项（翻译国际化文本）
 * @param options 选项数组
 * @param t 翻译函数
 * @returns
 */
export function translateOptions<T extends string | number>(
  options: CommonType.Option<T, App.I18n.I18nKey>[],
) {
  return options.map((option) => ({
    ...option,
    label: $t(option.label),
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

export function transformRecordToNumberOptions(options: Array<{ value: string; label: string }>) {
  return options.map(({ value, label }) => ({
    value: Number(value),
    label: label,
  }));
}

/**
 * 统一处理错误消息（msg 字段可能是字符串或数组）
 * @param msg - 错误消息（可能是字符串或字符串数组）
 * @param separator - 数组元素连接符，默认为逗号
 * @returns 统一后的错误消息字符串
 */
export function normalizeErrorMessage(msg: string | string[] | unknown, separator = '; '): string {
  if (typeof msg === 'string') {
    return msg;
  }
  if (Array.isArray(msg)) {
    return msg.filter((item) => item != null).join(separator);
  }
  return String(msg ?? '');
}
