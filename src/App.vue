<template>
  <NConfigProvider>
    <AppProvider>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </AppProvider>
  </NConfigProvider>
</template>

<script setup lang="ts"></script>

<style scoped></style>
