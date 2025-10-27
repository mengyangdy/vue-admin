import { Ref, computed, effectScope, onScopeDispose, reactive, ref, shallowRef, watch } from 'vue';

import { cloneDeep } from '@dylanjs/utils';
import type { PaginationProps } from 'naive-ui';

import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';

import useBoolean from './use-boolean';
import useLoading from './use-loading';

const appStore = useAppStore();

export interface PaginationData<T> {
  data: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

type GetApiData<ApiData, Pagination extends boolean> = Pagination extends true
  ? PaginationData<ApiData>
  : ApiData[];

type Transform<ResponseData, ApiData, Pagination extends boolean> = (
  response: ResponseData,
) => GetApiData<ApiData, Pagination>;

export interface UseTableOptions<ResponseData, ApiData, Column, Pagination extends boolean> {
  /**
   * api function to get table data
   */
  api: () => Promise<ResponseData>;
  /**
   * whether to enable pagination
   */
  pagination?: Pagination;
  /**
   * transform api response to table data
   */
  transform: Transform<ResponseData, ApiData, Pagination>;
  /**
   * columns factory
   */
  columns: () => Column[];
  /**
   * get column checks
   */
  getColumnChecks: (columns: Column[]) => NaiveUI.TableColumnCheck[];
  /**
   * get columns
   */
  getColumns: (columns: Column[], checks: NaiveUI.TableColumnCheck[]) => Column[];
  /**
   * callback when response fetched
   */
  onFetched?: (data: GetApiData<ApiData, Pagination>) => void | Promise<void>;
  /**
   * whether to get data immediately
   *
   * @default true
   */
  immediate?: boolean;
}

export type UseNaiveTableOptions<ResponseData, ApiData, Pagination extends boolean> = Omit<
  UseTableOptions<ResponseData, ApiData, NaiveUI.TableColumn<ApiData>, Pagination>,
  'pagination' | 'getColumnChecks' | 'getColumns'
> & {
  /**
   * get column visible
   *
   * @param column
   *
   * @default true
   *
   * @returns true if the column is visible, false otherwise
   */
  getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean;
};

const SELECTION_KEY = '__selection__';

const EXPAND_KEY = '__expand__';

export function useNaiveTable<ResponseData, ApiData>(
  options: UseNaiveTableOptions<ResponseData, ApiData, false>,
) {
  const scope = effectScope();
  const result = useTable({
    ...options,
    getColumnChecks: (cols) => getColumnChecks(cols, options.getColumnVisible),
    getColumns,
  });

  const scrollX = computed(() => {
    return result.columns.value.reduce((acc, column) => {
      return acc + Number(column.width ?? column.minWidth ?? 120);
    }, 0);
  });

  scope.run(() => {
    watch(
      () => appStore.locale,
      () => {
        result.reloadColumns();
      },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    ...result,
    scrollX,
  };
}

type PaginationParams = Pick<PaginationProps, 'page' | 'pageSize'>;

type UseNaivePaginatedTableOptions<ResponseData, ApiData> = UseNaiveTableOptions<
  ResponseData,
  ApiData,
  true
> & {
  paginationProps?: Omit<PaginationProps, 'page' | 'pageSize' | 'itemCount'>;
  /**
   * whether to show the total count of the table
   *
   * @default true
   */
  showTotal?: boolean;
  onPaginationParamsChange?: (params: PaginationParams) => void | Promise<void>;
};

export function useNaivePaginatedTable<ResponseData, ApiData>(
  options: UseNaivePaginatedTableOptions<ResponseData, ApiData>,
) {
  const scope = effectScope();
  const themeStore = useThemeStore();
  const isMobile = computed(() => themeStore.isMobile);
  const showTotal = computed(() => options.showTotal ?? true);
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 15, 20, 25, 30],
    prefix: showTotal.value ? (page) => `共${page.itemCount}条` : undefined,
    onUpdatePage(page) {
      pagination.page = page;
    },
    onUpdatePageSize(pageSize) {
      pagination.pageSize = pageSize;
      pagination.page = 1;
    },
    ...options.paginationProps,
  }) as PaginationProps;
  const mobilePagination = computed(() => {
    const p: PaginationProps = {
      ...pagination,
      pageSlot: isMobile.value ? 3 : 9,
      prefix: !isMobile.value && showTotal.value ? pagination.prefix : undefined,
    };
    return p;
  });
  const paginationParams = computed(() => {
    const { page, pageSize } = pagination;
    return {
      page,
      pageSize,
    };
  });
  const result = useTable({
    ...options,
    pagination: true,
    getColumnChecks: (cols) => getColumnChecks(cols, options.getColumnVisible),
    getColumns,
    onFetched: (data) => {
      pagination.itemCount = data.total;
    },
  });

  async function getDataByPage(page: number = 1) {
    if (page !== pagination.page) {
      pagination.page = page;
      return;
    }
    await result.getData();
  }

  scope.run(() => {
    watch(
      () => appStore.locale,
      () => {
        result.reloadColumns();
      },
    );
    watch(paginationParams, async (newVal) => {
      await options.onPaginationParamsChange?.(newVal);
      await result.getData();
    });
  });

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    ...result,
    getDataByPage,
    pagination,
    mobilePagination,
  };
}

export function useTableOperate<TableData>(
  data: Ref<TableData[]>,
  idKey: keyof TableData,
  getData: () => Promise<void>,
) {
  const { bool: drawerVisible, setTrue: openDrawer, setFalse: closeDrawer } = useBoolean();
  const operateType = shallowRef<NaiveUI.TableOperateType>('add');
  function handleAdd() {
    operateType.value = 'add';
    openDrawer();
  }
  const editingData = shallowRef<TableData | null>(null);

  function handleEdit(id: TableData[keyof TableData]): void {
    operateType.value = 'edit';
    const findItem = data.value.find((item) => item[idKey] === id) || null;
    editingData.value = cloneDeep(findItem);
    openDrawer();
  }
  const checkedRowKeys = shallowRef<string[]>([]);
  async function onBatchDeleted() {
    window.$message?.success(`删除成功`);
    checkedRowKeys.value = [];
    await getData();
  }
  async function onDeleted() {
    window.$message?.success(`删除成功`);
    await getData();
  }
  return {
    drawerVisible,
    openDrawer,
    closeDrawer,
    operateType,
    handleAdd,
    editingData,
    handleEdit,
    checkedRowKeys,
    onBatchDeleted,
    onDeleted,
  };
}

function useTable<ResponseData, ApiData, Column, Pagination extends boolean>(
  options: UseTableOptions<ResponseData, ApiData, Column, Pagination>,
) {
  const { loading, startLoading, endLoading } = useLoading();
  const { bool: empty, setBool: setEmpty } = useBoolean();
  const {
    api,
    pagination,
    transform,
    columns,
    getColumnChecks,
    getColumns,
    onFetched,
    immediate = true,
  } = options;
  const data = ref([]) as Ref<ApiData[]>;
  const columnChecks = ref(getColumnChecks(columns())) as Ref<NaiveUI.TableColumnCheck[]>;
  const $columns = computed(() => getColumns(columns(), columnChecks.value));
  function reloadColumns() {
    const checkMap = new Map(columnChecks.value.map((col) => [col.key, col.checked]));
    const defaultChecks = getColumnChecks(columns());
    columnChecks.value = defaultChecks.map((col) => ({
      ...col,
      checked: checkMap.get(col.key) ?? col.checked,
    }));
  }
  async function getData() {
    try {
      startLoading();
      const response = await api();
      const transformed = transform(response);
      data.value = getTableData(transformed, pagination);
      setEmpty(data.value.length === 0);
      await onFetched?.(transformed);
    } finally {
      endLoading();
    }
  }
  if (immediate) {
    getData();
  }
  return {
    loading,
    empty,
    data,
    columns: $columns,
    columnChecks,
    reloadColumns,
    getData,
  };
}

function getTableData<ApiData, Pagination extends boolean>(
  data: GetApiData<ApiData, Pagination>,
  pagination?: Pagination,
) {
  if (pagination) {
    return (data as PaginationData<ApiData>).data;
  }
  return data as ApiData[];
}

function getColumnChecks<Column extends NaiveUI.TableColumn<any>>(
  cols: Column[],
  getColumnVisible?: (column: Column) => boolean,
) {
  const checks: NaiveUI.TableColumnCheck[] = [];
  cols.forEach((column) => {
    if (isTableColumnHasKey(column)) {
      checks.push({
        key: column.key as string,
        title: column.title!,
        checked: true,
        visible: getColumnVisible?.(column) ?? true,
      });
    } else if (column.type === 'selection') {
      checks.push({
        key: SELECTION_KEY,
        title: $t('common.check'),
        checked: true,
        visible: getColumnVisible?.(column) ?? false,
      });
    } else if (column.type === 'expand') {
      checks.push({
        key: EXPAND_KEY,
        title: $t('common.expandColumn'),
        checked: true,
        visible: getColumnVisible?.(column) ?? false,
      });
    }
  });
  return checks;
}

export function isTableColumnHasKey<T>(
  column: NaiveUI.TableColumn<T>,
): column is NaiveUI.TableColumnWithKey<T> {
  return Boolean((column as NaiveUI.TableColumnWithKey<T>).key);
}

function getColumns<Column extends NaiveUI.TableColumn<any>>(
  cols: Column[],
  checks: NaiveUI.TableColumnCheck[],
) {
  const columnMap = new Map<string, Column>();
  cols.forEach((column) => {
    if (isTableColumnHasKey(column)) {
      columnMap.set(column.key as string, column);
    } else if (column.type === 'selection') {
      columnMap.set(SELECTION_KEY, column);
    } else if (column.type === 'expand') {
      columnMap.set(EXPAND_KEY, column);
    }
  });
  const filteredColumns = checks
    .filter((item) => item.checked)
    .map((check) => columnMap.get(check.key) as Column);
  return filteredColumns;
}

export function defaultTransform<ApiData>(
  response: FlatResponseData<any, Api.Common.PaginationQueryRecord<ApiData>>,
): PaginationData<ApiData> {
  const { data, error } = response;
  if (!error) {
    const { records, current, size, total } = data;
    return {
      data: records,
      pageNum: current,
      pageSize: size,
      total,
    };
  }
  return {
    data: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  };
}
