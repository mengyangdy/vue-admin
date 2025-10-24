import { computed, effectScope, reactive, shallowRef, watch } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import type { PaginationProps } from 'naive-ui';

export interface PaginationData<T> {
  data: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

type GetApiData<ApiData, Pagination extends boolean> = Pagination extends true ? PaginationData<ApiData> : ApiData[];

type Transform<ResponseData, ApiData, Pagination extends boolean> = (
  response: ResponseData
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
  getColumnChecks: (columns: Column[]) => TableColumnCheck[];
  /**
   * get columns
   */
  getColumns: (columns: Column[], checks: TableColumnCheck[]) => Column[];
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

export function useNaiveTable<ResponseData,ApiData>(options: UseNaiveTableOptions<ResponseData, ApiData, false>){
  const scope=effectScope()
  const appStore=useAppStore()
  const result=useTable({
    ...options,
    getColumnChecks:cols=>getColumnChecks(cols,options.getColumnVisible),
    getColumns
  })

  const scrollX=computed(()=>{
    return result.columns.value.reduce((acc,column)=>{
      return acc+Number(column.width??column.minWidth ?? 120)
    },0)
  })

  scope.run(()=>{
    watch(
      ()=>appStore.locale,
      ()=>{
        result.reloadColumns()
      }
    )
  })

  onScopeDispose(()=>{
    scope.stop()
  })

  return {
    ...result,
    scrollX
  }

}

type PaginationParams = Pick<PaginationProps, 'page' | 'pageSize'>;

type UseNaivePaginatedTableOptions<ResponseData, ApiData> = UseNaiveTableOptions<ResponseData, ApiData, true> & {
  paginationProps?: Omit<PaginationProps, 'page' | 'pageSize' | 'itemCount'>;
  /**
   * whether to show the total count of the table
   *
   * @default true
   */
  showTotal?: boolean;
  onPaginationParamsChange?: (params: PaginationParams) => void | Promise<void>;
};

export function useNaivePaginatedTable(options) {
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
  });
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
  const result=useTable({
    ...options,
    pagination:true,
    getColumnChecks:cols=>getColumnChecks(cols,options.getColumnVisible),
    getColumns,
    onFetched:data=>{
      pagination.itemCount=data.total
    }
  })

  async function getDataByPage(page:number=1){
    if(page !== pagination.page){
      pagination.page = page
      return
    }
    await result.getData()
  }

  scope.run(()=>{
    watch(
      ()=>appStore.locale,
      ()=>{
        result.reloadColumns()
      }
    )
    watch(paginationParams,async newVal=>{
      await options.onPaginationParamsChange?.(newVal)
      await result.getData()
    })
  })

  onScopeDispose(()=>{
    scope.stop()
  })

  return {
    ...result,
    getDataByPage,
    pagination,
    mobilePagination
  }
}

export function useTableOperate<TableData>(
  data:Ref<tableData[]>,
  idKey:keyof TableData,
  getData:()=>Promise<void>
){
  const { bool: drawerVisible, setTrue: openDrawer, setFalse: closeDrawer } = useBoolean();
  const operateType=shallowRef<NaiveUI.TableOperateType>('add')
  function handleAdd(){
    operateType.value='add'
    openDrawer()
  }
  const editingData=shallowRef<TableData | null>(null)

  function handleEdit(id:TableData[keyof TableData]): void{
    operateType.value='edit'
    const findItem=data.value.find(item=>item[idKey] === id) || null
    editingData.value=jsonClone(findItem)
    openDrawer()
  }
  const checkedRowKeys=shallowRef<string[]>([])
  async function onBatchDeleted(){
    window?$message?.success(`删除成功`)
      checkedRowKeys.value=[]
    await getData()
  }
  async function onDeleted(){
    window.$message?.success(`删除成功`)
    await getData()
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
    onDeleted
  }
}


