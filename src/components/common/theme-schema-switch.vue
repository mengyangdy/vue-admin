<template>
  <button-icon
    :icon="icon"
    :tooltip-content="tooltipContent"
    :tooltip-placement="tooltipPlacement"
    @click="handleSwitch"
  />
</template>

<script setup lang="ts">
import { PopoverPlacement } from "naive-ui";
import { computed } from "vue";

defineOptions({
  name: "ThemeSchemaSwitch",
});
interface Props {
  themeSchema: UnionKey.ThemeScheme;
  showTooltip: boolean;
  tooltipPlacement: PopoverPlacement;
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
  tooltipPlacement: "bottom",
});

interface Emits {
  (e: "switch"): void;
}
const emit = defineEmits<Emits>();

const handleSwitch = () => {
  emit("switch");
};
const icons: Record<UnionKey.ThemeScheme, string> = {
  light: "material-symbols:sunny",
  dark: "material-symbols:nightlight-rounded",
  auto: "material-symbols:hdr-auto",
};

const icon=computed(()=>icons[props.themeSchema])

const tooltipContent=computed(()=>{
  if(!props.showTooltip) {return ''}
  return `主题模式`
})
</script>
