declare namespace Api {
  namespace Common {
    interface PaginatingCommonParams {
      current: number;
      size: number;
      total: number;
    }
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;
    type EnableStatus = '1' | '2';
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }
}
