<template>
  <div class="tabbar">
    <tabs class="tabbar__tabs" />
    <div class="tabbar__actions">
      <button-icon quaternary size="small" @click="handleFullScreen">
        <svg-icon
          :icon="
            isFullscreen
              ? 'mingcute:fullscreen-exit-line'
              : 'mingcute:fullscreen-line'
          "
        />
      </button-icon>
      <button-icon quaternary size="small" @click="$router.refresh()">
        <svg-icon icon="mingcute:refresh-1-line" />
      </button-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isFullScreen = ref(false);

const handleFullScreen = () => {
  if(isFullScreen.value){
    
  }
  isFullScreen.value = !isFullScreen.value;
};
</script>
