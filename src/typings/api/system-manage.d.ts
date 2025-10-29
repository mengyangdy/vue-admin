declare namespace Api {
  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type gender = 0 | 1 | 2;
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** 用户管理 */
    type User = Common.CommonRecord<{
      /** user name */
      username: string;
      /** user gender */
      gender: gender;
      /** user nick name */
      nickname: string;
      /** user phone */
      phone: string;
      /** user email */
      email: string;
      avatar: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    type UserSearchParams = CommonType.RecordNullable<
      Pick<
        Api.SystemManage.User,
        'username' | 'nickname' | 'phone' | 'email' | 'status' | 'gender'
      > &
        CommonSearchParams
    >;

    type UserUpdateParams = Partial<User>;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;
  }
}
