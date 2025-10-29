<template>
  <div class="size-full justify-center items-center">
    <NCard title="基本用法">
      <div class="grid-cols-responsive-1-2-2 gap-4 mb-4">
        <div>
          <div>编辑器高度</div>
          <NInputNumber v-model:value="height" />
        </div>
        <div>
          <div>是否禁用</div>
          <n-switch v-model:value="disabled" />
        </div>
        <WangEditor
          v-model:value="value"
          :status="status"
          :disabled="disabled"
          :height="`${height}px`"
          @on-created="onCreated"
          @on-destroyed="onDestroyed"
        />
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { IDomEditor } from '@wangeditor/editor';
import type { FormInst } from 'naive-ui';

const value = ref('');
const height = ref(400);
const disabled = ref(false);
const formRef = ref<FormInst | null>(null);
const status = ref<'success' | 'error' | 'warning'>();
const instance = ref();
function onCreated(editor: IDomEditor) {
  instance.value = editor;
}
function onDestroyed() {}
</script>
