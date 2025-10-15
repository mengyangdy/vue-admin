<template>
  <template v-if="renderLocalIcon">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>
  <template v-else>
    <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Icon } from "@iconify/vue";
defineOptions({
  name: "SvgIcon",
  inheritAttrs: false,
});

interface SvgIconProps {
  icon?: string;
  localIcon?: string;
}

const props = defineProps<SvgIconProps>();
const attr = useAttrs();

const bindAttrs = computed<{
  class: string;
  style: string;
}>(() => ({
  class: (attr.class as string) || "",
  style: (attr.style as string) || "",
}));
const symbolId = computed(() => {
  const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env;
  const defaultLocalIcon = "no-icon";
  const icon = props.localIcon || defaultLocalIcon;
  return `#${prefix}-${icon}`;
});
const renderLocalIcon = computed(() => props.localIcon || !props.icon);
</script>
