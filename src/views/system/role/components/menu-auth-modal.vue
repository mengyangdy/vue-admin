<template>
  <n-modal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <div class="flex-y-center gap-16px pb-12px">
      <div>首页</div>
      <n-select
        :value="home"
        :options="pageSelectOptions"
        size="small"
        class="w-160px"
        @update:value="updateHome"
      />
    </div>
    <n-tree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      block-line
      checkable
      expand-on-click
      virtual-scroll
      class="h-300px"
    />
    <template #footer>
      <n-space justify="end">
        <n-button size="small" class="mt-16px" @click="closeModal">取消</n-button>
        <n-button type="primary" size="small" class="mt-16px" @click="handleSubmit">确认</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';

defineOptions({
  name: 'MenuAuthModal',
});
interface Props {
  roleId: number;
}
const props = defineProps<Props>();
const visible = defineModel<boolean>('visible', {
  default: false,
});
const title = computed(() => `编辑菜单权限`);

const home = shallowRef('');

async function getHome() {
  home.value = 'home';
}

async function updateHome(val: string) {
  home.value = val;
}

const pages = shallowRef<string[]>([]);

async function getPages() {
  const { error, data } = await fetchGetAllPages();
  if (!error) {
    pages.value = data;
  }
}
const pageSelectOptions = computed(() => {
  const opts: CommonType.Option[] = pages.value.map((page) => ({
    label: page,
    value: page,
  }));
  return opts;
});

const tree = shallowRef<Api.SystemManage.MenuTree[]>([]);

async function getTree() {
  const { error, data } = await fetchGetMenuTree();
  if (!error) {
    tree.value = data;
  }
}
const checks = shallowRef<number[]>([]);

function closeModal() {
  visible.value = false;
}

async function getChecks() {
  // request
  checks.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
}

function handleSubmit() {
  // request

  window.$message?.success?.(`修改成功`);

  closeModal();
}

function init() {
  getHome();
  getPages();
  getTree();
  getChecks();
}

watch(visible, (val) => {
  if (val) {
    init();
  }
});
</script>
