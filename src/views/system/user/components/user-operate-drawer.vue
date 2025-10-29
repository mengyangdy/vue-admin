<template>
  <n-drawer v-model:show="visible" display-directive="show" :width="360">
    <n-drawer-content :title="title" :native-scrollbar="false" closeable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="model.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="性别" path="gender">
          <n-radio-group v-model:value="model.gender">
            <n-radio
              v-for="item in userGenderOptions"
              :key="item.value"
              :value="Number(item.value)"
              :label="$t(item.label)"
            />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="昵称" path="nickname">
          <n-input v-model:value="model.nickname" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="model.phone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="model.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="用户状态" path="status">
          <n-radio-group v-model:value="model.status">
            <n-radio
              v-for="item in enableStatusOptions"
              :key="item.value"
              :value="Number(item.value)"
              :label="$t(item.label)"
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
          <n-button :loading="loading" type="primary" @click="handleSubmit">确认</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchUpdateUser,fetchCreateUser } from '@/service/api/system-manage';
import { objectPick } from '@/utils/object';

defineOptions({
  name: 'UserOperateDrawer',
});

const loading = ref(false);

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
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: `新增用户`,
    edit: `编辑用户`,
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.SystemManage.User,
  'username' | 'gender' | 'nickname' | 'phone' | 'email' | 'userRoles' | 'status'
>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    username: '',
    gender: 1,
    nickname: '',
    phone: '',
    email: '',
    userRoles: [],
    status: 1,
  };
}

type RuleKey = Extract<keyof Model, 'username' | 'nickname' | 'phone' | 'email'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  username: defaultRequiredRule,
  nickname: defaultRequiredRule,
  phone: defaultRequiredRule,
  email: defaultRequiredRule,
};

const roleOptions = ref<CommonType.Option<string>[]>([]);

// async function getRoleOptions() {
//   const { error, data } = await fetchGetAllRoles();

//   if (!error) {
//     const options = data.map((item) => ({
//       label: item.roleName,
//       value: item.roleCode,
//     }));

//     // the mock data does not have the roleCode, so fill it
//     // if the real request, remove the following code
//     const userRoleOptions = model.value.userRoles.map((item) => ({
//       label: item,
//       value: item,
//     }));
//     // end
//     roleOptions.value = [...userRoleOptions, ...options];
//   }
// }

function handleInitModel() {
  model.value = createDefaultModel();
  if (props.operateType === 'edit' && props.rowData) {
    console.log(props.rowData, 'aaaa');
    const pick = objectPick(props.rowData, [
      'username',
      'gender',
      'nickname',
      'phone',
      'email',
      'userRoles',
      'status',
    ]);

    Object.assign(model.value, pick);
    console.log(model.value, 'bbbb');
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  if (props.operateType === 'edit' && props.rowData) {
    loading.value = true;
    const { error } = await fetchUpdateUser(props.rowData.id, model.value);
    if (!error) {
      window.$message?.success(`更新成功`);
      closeDrawer();
      emit(`submitted`);
    }
    loading.value = false;
  }
  if (props.operateType === 'add') {
    loading.value = true;
    const { error } = await fetchCreateUser(model.value);
    if (!error) {
      window.$message?.success(`新建成功`);
      closeDrawer();
      emit(`submitted`);
    }
  }
}
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    // getRoleOptions();
  }
});
</script>

<style scoped></style>
