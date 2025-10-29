import type { CSSProperties, ExtractPublicPropTypes, PropType } from 'vue';

import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import type { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type { MaybeArray } from 'naive-ui/es/_utils';
import type { Merge } from 'type-fest';

import { simplyOmit } from '@/utils/object';


export type BaseFieldProps<T> = Merge<
  {
    class?: string;
    style?: CSSProperties;
    [x: string]: any;
  },
  T
>;

export const wangEditorProps = {
  modelValue: String,
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '300px',
  },
  /**
   * 验证状态，可以脱离表单使用
   */
  status: String as PropType<'success' | 'error' | 'warning'>,
  editorConfig: Object as PropType<Partial<IEditorConfig>>,
  toolbarConfig: Object as PropType<Partial<IToolbarConfig>>,
  'onUpdate:modelValue': [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  onUpdateModelValue: [Function, Array] as PropType<MaybeArray<(value: string) => void>>,
  // 事件透传给编辑器
  onOnBlur: Function as PropType<(editor: IDomEditor) => void>,
  onOnFocus: Function as PropType<(editor: IDomEditor) => void>,
  onOnChange: Function as PropType<(editor: IDomEditor) => void>,
  onOnCreated: Function as PropType<(editor: IDomEditor) => void>,
  onOnDestroyed: Function as PropType<(editor: IDomEditor) => void>,
  onOnMaxLength: Function as PropType<(editor: IDomEditor) => void>,
  onCustomAlert: Function as PropType<(editor: IDomEditor) => void>,
} as const;

export const proWangEditorProps = {
  valueModelName: {
    type: String,
    default: 'modelValue',
  },
  fieldProps: Object as PropType<BaseFieldProps<WangEditorProps>>,
} as const;

export type EditorProps = InstanceType<typeof Editor>['$props'];
export type ToolbarProps = InstanceType<typeof Toolbar>['$props'];
export type WangEditorProps = ExtractPublicPropTypes<typeof wangEditorProps>;
export type ProWangEditorProps = ExtractPublicPropTypes<typeof proWangEditorProps>;
