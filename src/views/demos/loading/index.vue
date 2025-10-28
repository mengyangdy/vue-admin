<template>
  <n-flex vertical size="large">
    <n-card :title="$t(`pages.demos.loading.basicUsage.title`)">
      <n-flex vertical size="medium">
        <n-flex v-loading="basicLoading" size="small" vertical>
          <h3>{{ $t(`pages.demos.loading.basicUsage.description`) }}</h3>
          <p>{{ $t(`pages.demos.loading.basicUsage.description2`) }}</p>
          <p>{{ $t(`pages.demos.loading.basicUsage.description3`) }}</p>
        </n-flex>
        <n-button type="primary" @click="toggleBasicLoading">
          {{
            basicLoading
              ? $t('pages.demos.loading.basicUsage.hideButton')
              : $t('pages.demos.loading.basicUsage.showButton')
          }}
        </n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicLoading = ref(false);

function toggleBasicLoading() {
  basicLoading.value = !basicLoading.value;
}
</script>
