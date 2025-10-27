<template>
  <button-icon :key="String(full)" :tooltip-content="full ? '退出全屏' : '全屏'">
    <icon-gridicons-fullscreen-exit v-if="full" />
    <icon-gridicons-fullscreen v-else />
  </button-icon>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FullScreen',
});

interface Props {
  full?: boolean;
}

defineProps<Props>();
</script>
