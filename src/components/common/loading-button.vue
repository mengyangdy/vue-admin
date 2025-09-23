<template>
  <n-button v-bind="$attrs" :loading="loading" @click="handleClick">
    <slot></slot>
  </n-button>
</template>

<script setup lang="ts">
import { ref, useAttrs } from "vue";
const loading = ref(false);
const attrs = useAttrs();
const handleClick = async (e: MouseEvent) => {
  try {
    loading.value = true;
    const onClick = attrs.onClick;
    const result = typeof onClick === "function" ? onClick(e) : undefined;
    if (result instanceof Promise) {
      await result;
    }
  } finally {
    loading.value = false;
  }
};
</script>
