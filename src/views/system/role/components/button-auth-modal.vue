<template>
  <n-modal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <n-tree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      block-line
      checkable
      expand-on-click
      virtual-scroll
      class="h-280px"
    />
    <template #footer>
      <n-space justify="end">
        <n-button size="small" class="mt-16px" @click="closeModal">确认</n-button>
        <n-button type="primary" size="small" class="mt-16px" @click="handleSubmit">确认</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue';

defineOptions({
  name: 'ButtonAuthModal',
});
interface Props {
  roleId: number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false,
});

function closeModal() {
  visible.value = false;
}
const title = computed(() => `编辑权限按钮`);

type ButtonConfig = {
  id: number;
  label: string;
  code: string;
};

const tree = shallowRef<ButtonConfig[]>([]);

async function getAllButtons() {
  tree.value = [
    { id: 1, label: 'button1', code: 'code1' },
    { id: 2, label: 'button2', code: 'code2' },
    { id: 3, label: 'button3', code: 'code3' },
    { id: 4, label: 'button4', code: 'code4' },
    { id: 5, label: 'button5', code: 'code5' },
    { id: 6, label: 'button6', code: 'code6' },
    { id: 7, label: 'button7', code: 'code7' },
    { id: 8, label: 'button8', code: 'code8' },
    { id: 9, label: 'button9', code: 'code9' },
    { id: 10, label: 'button10', code: 'code10' },
  ];
}

const checks = shallowRef<number[]>([]);
async function getChecks() {
  //request
  checks.value = [1, 2, 3, 4, 5];
}

function handleSubmit() {
  // request
  window.$message?.success('修改成功');
  closeModal();
}
function init() {
  getAllButtons();
  getChecks();
}
init();
</script>
