<template>
  <button-icon tooltip-content="搜索" @click="toggle">
    <icon-uil-search />
  </button-icon>
  <SearchModal v-model:show="show" />
</template>

<script setup lang="ts">
import useBoolean from "@/hooks/common/use-boolean";
import SearchModal from "./components/search-modal.vue";

const { bool: show, toggle } = useBoolean();
</script>
