import { defineConfig, loadEnv } from "vite";
import { URL, fileURLToPath } from "node:url";
import { setupVitePlugins } from "./build/plugins";
import { createViteProxy, getBuildTime } from "./build/config";

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(
    configEnv.mode,
    process.cwd()
  ) as unknown as Env.ImportMeta;
  const buildTime = getBuildTime();
  const enableProxy = configEnv.command === "serve" && !configEnv.isPreview;
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    define: {
      __DEV__: configEnv.mode === "development",
      BUILD_TIME: JSON.stringify(buildTime),
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
      open: true,
      proxy: createViteProxy(viteEnv, enableProxy),
    },
    preview: {
      port: 9725,
    },
  };
});
