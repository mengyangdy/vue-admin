<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @search="getDataByPage" />
    <n-card title="用户列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="(row) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive } from 'vue';

import { NButton, NPopconfirm, NTag } from 'naive-ui';

import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetUserList } from '@/service/api';
import { useThemeStore } from '@/store/modules/theme';

import UserOperateDrawer from './components/user-operate-drawer.vue';
import UserSearch from './components/user-search.vue';

const themeStore = useThemeStore();

const searchParams: Api.SystemManage.UserSearchParams = reactive({
  current: 1,
  size: 10,
  status: 1,
  username: null,
  gender: 1,
  nickname: null,
  phone: null,
  email: null,
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } =
  useNaivePaginatedTable({
    api: () => fetchGetUserList(searchParams),
    transform: (response) => defaultTransform(response),
    onPaginationParamsChange: (params) => {
      searchParams.current = params.page;
      searchParams.size = params.pageSize;
    },
    columns: () => [
      {
        type: 'selection',
        align: 'center',
        width: 48,
      },
      {
        key: 'id',
        title: `ID`,
        align: 'center',
        width: 80,
      },
      {
        key: 'index',
        title: `序号`,
        align: 'center',
        width: 64,
        render: (_, index) => index + 1,
      },
      {
        key: 'username',
        title: `用户名`,
        align: 'center',
        minWidth: 100,
      },
      {
        key: 'nickname',
        title: `昵称`,
        align: 'center',
        minWidth: 100,
      },
      {
        key: 'gender',
        title: `性别`,
        align: 'center',
        width: 100,
        render: (row: any) => {
          if (row.gender === null || row.gender === undefined) {
            return null;
          }

          const tagMap: Record<Api.SystemManage.gender, NaiveUI.ThemeColor> = {
            0: 'info',
            1: 'primary',
            2: 'error',
          };

          const genderValue = row.gender as Api.SystemManage.gender;
          const label = $t(userGenderRecord[genderValue]);
          return <NTag type={tagMap[genderValue]}>{label}</NTag>;
        },
      },
      {
        key: 'phone',
        title: `手机号`,
        align: 'center',
        width: 120,
      },
      {
        key: 'email',
        title: `邮箱`,
        align: 'center',
        minWidth: 200,
      },
      {
        key: 'status',
        title: `用户状态`,
        align: 'center',
        width: 100,
        render: (row: any) => {
          if (row.status === null || row.status === undefined) {
            return null;
          }

          const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
            1: 'success',
            2: 'warning',
          };

          const label = $t(enableStatusRecord[row.status as Api.Common.EnableStatus]);

          return <NTag type={tagMap[row.status as Api.Common.EnableStatus]}>{label}</NTag>;
        },
      },
      {
        key: 'operate',
        title: `操作`,
        align: 'center',
        width: 130,
        render: (row: any) => (
          <div class="flex-center gap-8px">
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                ),
              }}
            </NPopconfirm>
          </div>
        ),
      },
    ],
  });
console.log('🚀 ~ :183 ~ data:', data);

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted,
  // closeDrawer
} = useTableOperate(data, 'id', getData);

async function handleBatchDelete() {
  // request

  onBatchDeleted();
}

function handleDelete(id: number) {
  // request

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>
