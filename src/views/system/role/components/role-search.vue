<template>
  <n-card :bordered="false" size="small" class="card-wrapper">
    <n-collapse :default-expanded-names="['role-search']">
      <n-collapse-item title="搜索" name="role-search">
        <n-form model="model" label-placement="left" label-width="80">
          <n-grid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="角色名称" path="roleName" class="pr-24px">
              <NInput v-model:value="model.roleName" placeholder="请输入角色名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="角色编码" path="roleCode" class="pr-24px">
              <NInput v-model:value="model.roleCode" placeholder="请输入角色编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="角色状态" path="status" class="pr-24px">
              <NSelect
                v-model:value="model.status"
                placeholder="请选择角色状态"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="resetModel">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  重置
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  搜索
                </NButton>
              </NSpace>
            </NFormItemGi>
          </n-grid>
        </n-form>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>
<script setup lang="ts">
defineOptions({
  name: 'RoleSearch',
});

interface Emits {
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.RoleSearchParams>('model', { required: true });

function resetModel() {
  model.value = {
    current: 1,
    size: 10,
    roleName: null,
    roleCode: null,
    status: null,
  };
}

function search() {
  emit('search');
}
</script>
