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
    type EnableStatus = 1 | 2;
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createdAt: string;

      /** record updater */
      updatedAt: string;
      /** record status */
      status: EnableStatus;
    } & T;
  }
}
