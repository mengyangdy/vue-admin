<template>
  <a
    href="javascript:void(0)"
    class="flex items-center gap-12px h-full"
    :class="{
      'pl-12px': enablePaddingLeft,
      'justify-center': !enablePaddingLeft,
    }"
  >
    <img src="logo" alt="logo" class="size-32px truncate" />
    <h1 class="truncate text-18px">{{ title }}</h1>
  </a>
</template>

<script setup lang="ts">

</script>
