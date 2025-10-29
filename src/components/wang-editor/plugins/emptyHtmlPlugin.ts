import type { IDomEditor } from '@wangeditor/editor';

export function withEmptyHtmlPlugin<T extends IDomEditor>(editor: T): T {
  const { getHtml } = editor;
  const newEditor = editor;

  newEditor.getHtml = () => {
    if (newEditor.isEmpty()) {
      return '';
    }
    return getHtml();
  };
  return newEditor;
}
