<template>
  <n-space vertical :size="16">
    {{ $t('page.home.title') }}
    <n-card
      :title="$t('page.about.title')"
      :bordered="false"
      size="small"
      segmented
      class="card-wrapper"
    >
      <p>{{ $t(`page.about.introduction`) }}</p>
    </n-card>
    <n-card
      :title="$t(`page.about.projectInfo.title`)"
      :bordered="false"
      size="small"
      segmented
      class="card-wrapper"
    >
      <n-descriptions label-placement="left" bordered size="small" :column="column">
        <n-descriptions-item :label="$t('page.about.projectInfo.version')">
          <n-tag type="primary">{{ pkgJson.version }}</n-tag>
        </n-descriptions-item>
        <n-descriptions-item :label="$t('page.about.projectInfo.latestBuildTime')">
          <n-tag typ="primary">{{ latestBuildTime }}</n-tag>
        </n-descriptions-item>
        <n-descriptions-item :label="$t('page.about.projectInfo.githubLink')">
          <a class="text-primary" :href="homepage" target="_blank" rel="noopener noreferrer">
            {{ $t('page.about.projectInfo.githubLink') }}
          </a>
        </n-descriptions-item>
        <n-descriptions-item :label="$t('page.about.projectInfo.previewLink')">
          <a class="text-primary" :href="homepage" target="_blank" rel="noopener noreferrer">
            {{ $t('page.about.projectInfo.previewLink') }}
          </a>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :title="$t(`page.about.prdDep`)"
      :bordered="false"
      size="small"
      segmented
      class="card-wrapper"
    >
      <n-descriptions label-placement="left" bordered size="small" :column="column">
        <n-descriptions-item
          v-for="item in pkgJson.dependencies"
          :key="item.name"
          :label="item.name"
        >
          {{ item.version }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :title="$t('page.about.devDep')"
      :bordered="false"
      size="small"
      segmented
      class="card-wrapper"
    >
      <n-descriptions label-placement="left" bordered size="small" :column="column">
        <n-descriptions-item
          v-for="item in pkgJson.devDependencies"
          :key="item.name"
          :label="item.name"
        >
          {{ item.version }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';

import pkg from '~/package.json';

const themeStore = useThemeStore();

const column = computed(() => (themeStore.isMobile ? 1 : 2));

interface PkgVersionInfo {
  name: string;
  version: string;
}

interface PkgJson {
  name: string;
  version: string;
  dependencies: PkgVersionInfo[];
  devDependencies: PkgVersionInfo[];
}

const { name, version, homepage, dependencies, devDependencies } = pkg as typeof pkg & {
  homepage: string;
};

function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple;
  return {
    name: $name,
    version: $version,
  };
}
const pkgJson: PkgJson = {
  name,
  version,
  dependencies: Object.entries(dependencies).map((item) => transformVersionData(item)),
  devDependencies: Object.entries(devDependencies).map((item) => transformVersionData(item)),
};
const latestBuildTime = BUILD_TIME;
</script>
