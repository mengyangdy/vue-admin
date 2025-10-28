<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NButton size="small">
        <template #icon>
          <icon-ant-design-setting-outlined class="text-icon" />
        </template>
        {{ $t('common.columnSetting') }}
      </NButton>
    </template>
    <VueDraggable v-model="columns" :animation="150" filter=".none_draggable">
      <div
        v-for="item in columns"
        :key="item.key"
        class="h-36px flex-y-center rd-4px hover:(bg-primary bg-opacity-20)"
        :class="{
          hidden: !item.visible,
        }"
      >
        <icon-mdi-drag class="mr-8px h-full cursor-move text-icon" />
        <NCheckbox v-model:checked="item.checked" class="none_draggable flex-center">
          <template v-if="typeof item.title === 'function'">
            <component :is="item.title" />
          </template>
          <template v-else>
            {{ item.title }}
          </template>
        </NCheckbox>
      </div>
    </VueDraggable>
  </NPopover>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';

import { $t } from '@/locales';

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  required: true,
});
</script>
