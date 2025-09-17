<template>
  <div>
    <h1>登录页面</h1>
    <p>如果您看到这个页面，说明路由配置正常</p>
    <p>当前时间: {{ currentTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const currentTime = ref("");

onMounted(() => {
  currentTime.value = new Date().toLocaleString();
  console.log("登录页面已加载");
});
</script>

<script scoped></script>
