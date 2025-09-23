import { SetupStoreId } from "@/constants";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const showPreferenceDrawer = ref(false);
  const accessMode = ref("frontend");

  return {
    showPreferenceDrawer,
    accessMode,
  };
});
