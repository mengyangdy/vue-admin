declare namespace NaiveUI {
  type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning';
  type Align = 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start';

  type DataTableBaseColumn<T> = import('naive-ui').DataTableBaseColumn<T>;
  type DataTableExpandColumn<T> = import('naive-ui').DataTableExpandColumn<T>;
  type DataTableSelectionColumn<T> = import('naive-ui').DataTableSelectionColumn<T>;
  type TableColumnGroup<T> = import('naive-ui/es/data-table/src/interface').TableColumnGroup<T>;
  export type TableColumnCheckTitle = string | ((...args: any) => import('vue').VNodeChild);
  type TableColumnCheck = {
    key: string;
    title: TableColumnCheckTitle;
    checked: boolean;
    visible: boolean;
  };

  type SetTableColumnKey<C, T> = Omit<C, 'key'> & { key: keyof T | (string & {}) };

  type TableColumnWithKey<T> =
    | SetTableColumnKey<DataTableBaseColumn<T>, T>
    | SetTableColumnKey<TableColumnGroup<T>, T>;

  type TableColumn<T> =
    | TableColumnWithKey<T>
    | DataTableSelectionColumn<T>
    | DataTableExpandColumn<T>;

  /**
   * the type of table operation
   *
   * - add: add table item
   * - edit: edit table item
   */
  type TableOperateType = 'add' | 'edit';
}
