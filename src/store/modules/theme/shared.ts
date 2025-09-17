import { overrideThemeSettings, themeSettings } from "@/theme/settings";
import { localStg } from "@/utils/storage";

export function initThemeSettings() {
  const isProd = import.meta.env.PROD;
  if (!isProd) return themeSettings;
  const localSettings = localStg.get("themeSettings");
  let settings = defu(localSettings, themeSettings);
  const isOverride = localStg.get("overrideThemeFlag") === BUILD_TIME;
  if (!isOverride) {
    settings = defu(overrideThemeSettings, settings);
    localStg.set("overrideThemeFlag", BUILD_TIME);
  }
  return settings;
}
