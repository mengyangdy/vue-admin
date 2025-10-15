<template>
  <n-modal
    v-model:show="visible"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    preset="card"
    auto-focus
    footer-style="padding:0;margin:0"
    class="fixed left-0 right-0"
    :class="[isMobile ? 'size-full top-0px rounded-0' : 'w-630px top-50px']"
    @after-leave="handleColse"
  >
    <n-input-group>
      <n-input
        v-model:value="keyword"
        clearable
        placeholder="请输入关键词搜索"
        @input="handleSearch"
      >
        <template #prefix>
          <icon-uil-search class="text-15px text-#c2c2c2" />
        </template>
      </n-input>
      <n-button v-if="isMobile" type="primary" ghost @click="handleClose">
        取消
      </n-button>
    </n-input-group>
    <div class="mt-20px">
      <n-empty v-if="resultOptions.length === 0" description="无数据" />
      <search-result
        v-else
        v-model:path="activePath"
        :options="resultOptions"
        @enter="handleEnter"
      />
    </div>
    <template #footer>
      <search-footer v-if="!isMobile" />
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { onKeyStroke, useDebounceFn } from "@vueuse/core";
import { useThemeStore } from "@/store/modules/theme";

defineOptions({
  name: "SearchModal",
});

const router = useRouter();
const themeStore = useThemeStore();

const isMobile = computed(() => themeStore.isMobile);
const keyword = ref("");
const activePath = ref("");
const resultOptions = shallowRef<App.Global.Menu>([]);
const handleSearch = useDebounceFn(search, 300);
function search() {
  // resultOptions.value=routeSt
}
</script>
