<template>
  <NConfigProvider>
    <AppProvider>
      <Router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </Router-view>
    </AppProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter().getRoutes();
console.log("🚀 ~ App.vue:16 ~ router:", router);
</script>

<style scoped></style>
