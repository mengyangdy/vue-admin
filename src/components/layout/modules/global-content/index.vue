<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component
          :is="Component"
          class="flex-grow bg-layout transition-300"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
defineOptions({
  name: 'GlobalContent',
});

interface Props {
  /** Show padding for content */
  showPadding?: boolean;
}

withDefaults(defineProps<Props>(), {
  showPadding: true,
});
</script>
