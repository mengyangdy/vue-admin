<template>
  <n-tooltip
    :placement="tooltipPlacement"
    :z-index="zIndex"
    :disabled="!tooltipContent"
  >
    <template #trigger>
      <n-button
        quaternary
        :class="twMerge(DEFAULT_CLASS, props.class)"
        v-bind="$attrs"
      >
        <div class="flex-center gap-8px">
          <slot>
            <SvgIcon :icon="icon" />
          </slot>
        </div>
      </n-button>
    </template>
  </n-tooltip>
</template>

<script setup lang="ts">
import type { PopoverPlacement } from "naive-ui";
import { twMerge } from "tailwind-merge";

defineOptions({
  name: "ButtonIcon",
  inheritAttrs: false,
});

interface Props {
  class?: string;
  icon?: string;
  tooltipContent?: string;
  tooltipPlacement?: PopoverPlacement;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  icon: "",
  tooltipContent: "",
  tooltipPlacement: "bottom",
  zIndex: 98,
});
const DEFAULT_CLASS = "h-[36px] text-icon";
</script>
