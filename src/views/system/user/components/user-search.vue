<template>
  <n-card :bordered="false" size="small" class="card-wrapper">
    <n-collapse>
      <n-collapse-item title="搜索" name="user-search">
        <n-form ref="formRef" :model="model" rules="rules" label-placement="left" :label-width="80">
          <n-grid responsive="screen" item-responsive>
            <n-form-item-gi span="24 s:12 m:6" label="用户名" path="userName" class="pr-24px">
              <n-input v-model:value="model.userName" placeholder="请输入用户名" />
            </n-form-item-gi>
            <n-form-item-gi span="24 s:12 m:6" label="性别" path="usergender" class="pr-24px">
              <n-select
                v-model:value="model.userGender"
                placeholder="请选择性别"
                :options="translateOptions(userGenderOptions)"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi span="24 s:12 m:6" label="昵称" path="nickName" class="pr-24px">
              <n-input v-model:value="model.nickName" placeholder="请输入昵称" />
            </n-form-item-gi>
            <n-form-item-gi span="24 s:12 m:6" label="手机号" path="userPhone" class="pr-24px">
              <n-input v-model:value="model.userPhone" placeholder="请输入手机号" />
            </n-form-item-gi>
            <n-form-item-gi span="24 s:12 m:6" label="邮箱" path="userEmail" class="pr-24px">
              <n-input v-model:value="model.userEmail" placeholder="请输入邮箱" />
            </n-form-item-gi>
            <n-form-item-gi span="24 s:12 m:6" label="用户状态" path="userStatus" class="pr-24px">
              <n-select
                v-model:value="model.status"
                placeholder="请选择用户状态"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi span="24 m:12" class="pr-24px">
              <n-space class="w-full" justify="end">
                <n-button @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  重置
                </n-button>
                <n-button type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  搜索
                </n-button>
              </n-space>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { computed } from 'vue';

defineOptions({
  name: 'UserSearch',
});

interface Emits {
  (e: 'search'): void;
}
const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();
const model = defineModel<Api.SystemManage.UserSearchParams>('model', {
  required: true,
});
type RuleKey = Extract<keyof Api.SystemManage.UserSearchParams, 'userEmail' | 'userPhone'>;
const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive

  return {
    userEmail: patternRules.email,
    userPhone: patternRules.phone,
  };
});
function resetModel() {
  model.value = {
    current: 1,
    size: 10,
    status: null,
    userName: null,
    userGender: null,
    nickName: null,
    userPhone: null,
    userEmail: null,
  };
}

async function reset() {
  await restoreValidation();
  resetModel();
}

async function search() {
  await validate();
  emit('search');
}
</script>

<style scoped></style>
