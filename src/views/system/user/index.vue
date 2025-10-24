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
      <n-data-table
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!themeStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="(row) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <user-operateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { reactive } from 'vue';
import { fetchGetUserList } from '@/service/api';
import { useThemeStore } from '@/store/modules/theme';
import { $t } from '@/locales';
import { userGenderRecord } from '@/constants/business';

const themeStore = useThemeStore();

const searchParams: Api.SystemManage.UserSearchParams = reactive({
  current: 1,
  size: 10,
  status: null,
  userName: null,
  userGender: null,
  nickName: null,
  userPhone: null,
  userEmail: null,
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
        key: 'index',
        title: `序号`,
        align: 'center',
        width: 64,
        render: (_, index) => index + 1,
      },
      {
        key: 'userName',
        title: `用户名`,
        align: 'center',
        minWidth: 100,
      },
      {
        key: 'userGender',
        title: `性别`,
        align: 'center',
        width: 100,
        render: (row) => {
          if (row.userGender === null) {
            return null;
          }

          const tagMap: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
            1: 'primary',
            2: 'error',
          };

          const label = $t(userGenderRecord[row.userGender]);

          return <NTag type={tagMap[row.userGender]}>{label}</NTag>;
        },
      },
      {
        key: 'nickName',
        title: `昵称`,
        align: 'center',
        minWidth: 100,
      },
      {
        key: 'userPhone',
        title: `手机号`,
        align: 'center',
        width: 120,
      },
      {
        key: 'userEmail',
        title: `邮箱`,
        align: 'center',
        minWidth: 200,
      },
      {
        key: 'status',
        title: `用户状态`,
        align: 'center',
        width: 100,
        render: (row) => {
          if (row.status === null) {
            return null;
          }

          const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
            1: 'success',
            2: 'warning',
          };

          const label = $t(enableStatusRecord[row.status]);

          return <NTag type={tagMap[row.status]}>{label}</NTag>;
        },
      },
      {
        key: 'operate',
        title: `操作`,
        align: 'center',
        width: 130,
        render: (row) => (
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
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

function handleDelete(id: number) {
  // request
  console.log(id);

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>
