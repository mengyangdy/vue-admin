<template>
  <n-flex vertical class="gap-16px">
    <n-card title="根据文件地址下载">
      <n-space vertical>
        <n-input v-model:value="fileUrl" placeholder="请输入文件地址" />
        <n-button type="primary" @click="downloadFileFromUrl(fileUrl, 'sample.pdf')">
          下载文件
        </n-button>
      </n-space>
    </n-card>
    <n-card title="根据地址下载图片">
      <n-space vertical>
        <n-input v-model:value="imageUrl" placeholder="请输入图片URL" />
        <n-button type="primary" @click="downloadImage(imageUrl, 'sample-image.png')" />
      </n-space>
    </n-card>
    <n-card title="文本下载">
      <n-space vertical>
        <n-input
          v-model:value="sampleText"
          type="textarea"
          placeholder="请输入要下载的文本内容"
          :rows="4"
        />
        <n-button type="primary" @click="downloadText(sampleText, 'sample-text.txt')">
          下载文本
        </n-button>
      </n-space>
    </n-card>
    <n-card title="base64下载">
      <n-space vertical>
        <n-input
          v-model:value="base64Data"
          type="textarea"
          placeholder="请输入base64数据"
          :rows="3"
        />
        <n-button
          type="primary"
          @click="downloadBase64(base64Data, 'sample-image.png', 'image/png')"
        >
          下载base64数据
        </n-button>
      </n-space>
    </n-card>
    <n-card title="请求下载">
      <n-space vertical>
        <n-input v-model:value="imageUrl" placeholder="请输入请求URL" />
        <n-space>
          <n-button type="primary" @click="handleGetResponse">获取Blob</n-button>
          <n-button type="primary" @click="handleGetResponse">获取response</n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useMessage } from 'naive-ui';
import { downloadFileFromUrl, downloadImage, fetchBlobResponse } from '@/utils/file';
const message = useMessage();

// 示例数据
const fileUrl = shallowRef(
  'https://github.com/Zheng-Changfu/naive-ui-pro/archive/refs/heads/main.zip',
);
const imageUrl = shallowRef('https://unpkg.com/@lircoding/static-source@1.0.2/source/naive.svg');
const sampleText = shallowRef('这是一个示例文本文件，包含一些中文内容。');
const base64Data = shallowRef(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
);
async function handleGetBlob() {
  try {
    const response = await fetchBlobResponse<Blob>(imageUrl.value);
    message.success(`获取Blob成功大小：${(response.data.size / 1024).toFixed(2)}Kb`);
  } catch (error) {
    message.error(`获取Blob失败`);
  }
}
async function handleGetResponse() {
  try {
    const response = await fetchBlobResponse(imageUrl.value);
    message.success(`获取response成功，状态${response.status}`);
  } catch (error) {
    message.error(`获取response失败`);
  }
}
</script>
