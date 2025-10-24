<template>
  <n-drawer v-model:show="visible" display-directive="show" :width="360">
    <n-drawer-content :title="title" :native-scrollbar="false" closeable>
      <n-form ref="formRef" :model="model" rules="rules">
        <n-form-item label="角色名称" path="roleName">
          <n-input v-model:value="module.roleName" placeholder="请输入角色名称" />
        </n-form-item>
        <n-form-item label="角色编码" path="roleCode">
          <n-input v-model:value="module.roleCode" placeholder="请输入角色编码" />
        </n-form-item>
        <n-form-item label="角色状态" path="status">
          <n-radio-group v-model:value="model.status">
            <n-radio
              v-for="item in enableStatusOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="角色描述" path="description">
          <n-input v-model:value="model.description" placeholder="请输入角色描述" />
        </n-form-item>
      </n-form>
      <n-space v-if="isEdit">
        <n-button @click="openMenuAuthModal">菜单权限</n-button>
        <MenuAuthModal v-model:visible="menuAuthVisible" :role-id="roleId" />
        <n-button @click="openButtonAuthModal">按钮权限</n-button>
        <ButtonAuthModal v-model:visible="buttonAuthVisible" :role-id="roleId" />
      </n-space>
      <template @footer>
        <n-space :size="16">
          <n-button @click="closeDrawer">取消</n-button>
          <n-button type="primary" @click="handleSubmit">确认</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'RoleOperateDrawer',
});

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.SystemManage.Role | null;
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
const { bool: menuAuthVisible, setTrue: openMenuAuthModal } = useBoolean();
const { bool: buttonAuthVisible, setTrue: openButtonAuthModal } = useBoolean();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: `新增角色`,
    edit: `编辑角色`,
  };
  return titles[props.operateType];
});

type Model = Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'roleDesc' | 'status'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    roleName: '',
    roleCode: '',
    roleDesc: '',
    status: null,
  };
}
type RuleKey = Exclude<keyof Model, 'roleDesc'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  roleName: defaultRequiredRule,
  roleCode: defaultRequiredRule,
  status: defaultRequiredRule,
};
const roleId = computed(() => props.rowData?.id || -1);
const isEdit = computed(() => props.operateType === 'edit');
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
</script>
