<template>
  <n-drawer v-model:show="visible" display-directive="show" :width="360">
    <n-drawer-content :title="title" :native-scrollbar="false" closeable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item label="用户名" path="userName">
          <n-input v-model:value="model.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="性别" path="userGender">
          <n-radio-group v-model:value="model.userGender">
            <n-radio
              v-for="item in userGenderOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="昵称" path="nickName">
          <n-input v-model:value="model.nickName" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="手机号" path="userPhone">
          <n-input v-model:value="model.userPhone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="model.userEmail" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="用户状态" path="status">
          <n-radio-group v-model:value="model.status">
            <n-radio
              v-for="item in enableStatusOption"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="用户角色" path="roles">
          <n-select
            v-model:value="model.userRoles"
            multiple
            :options="roleOptions"
            placeholder="请选择用户角色"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space :size="16">
          <n-button @click="closeDrawer">取消</n-button>
          <n-button type="primary" @click="handleSubmit">确认</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'UserOperateDrawer',
});

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.SystemManage.User | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}
const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false,
});

const { formRef, validate, restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: `新增用户`,
    edit: `编辑用户`,
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.SystemManage.User,
  'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'userRoles' | 'status'
>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    userName: '',
    userGender: null,
    nickName: '',
    userPhone: '',
    userEmail: '',
    userRoles: [],
    status: null,
  };
}

type RuleKey = Extract<keyof Model, 'userName' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  status: defaultRequiredRule,
};

const roleOptions = ref<CommonType.Option<string>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    const options = data.map((item) => ({
      label: item.roleName,
      value: item.roleCode,
    }));

    // the mock data does not have the roleCode, so fill it
    // if the real request, remove the following code
    const userRoleOptions = model.value.userRoles.map((item) => ({
      label: item,
      value: item,
    }));
    // end

    roleOptions.value = [...userRoleOptions, ...options];
  }
}

function handleInitModel() {
  model.value = createDefaultModel();
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  window.$message?.success(`更新成功`);
  closeDrawer();
  emit(`submitted`);
}
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getRoleOptions();
  }
});
</script>

<style scoped></style>
