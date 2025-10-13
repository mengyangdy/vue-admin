<template>
  <n-button v-bind="$attrs" :loading="loading" @click="handleClick">
    <slot></slot>
  </n-button>
</template>

<script setup lang="ts">
import { ref, useAttrs, onMounted } from "vue";
const loading = ref(false);
const attrs = useAttrs();
// // 防重复执行
// const isExecuting = ref(false);

const handleClick = async (e: MouseEvent) => {
  // 如果正在执行中，直接返回
  // if (isExecuting.value) {
  //   console.log("loading-button 正在执行中，跳过");
  //   return;
  // }

  try {
    // isExecuting.value = true;
    loading.value = true;
    const onClick = attrs.onClick;
    const result = typeof onClick === "function" ? onClick(e) : undefined;
    if (result instanceof Promise) {
      await result;
    }
  } finally {
    loading.value = false;
    // isExecuting.value = false;
  }
};
</script>
