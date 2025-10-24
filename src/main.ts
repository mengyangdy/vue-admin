import { createApp } from 'vue';
import './plugins/assets';

import { setupLoading } from './plugins';
import { setupRouter } from './router';
import { setupStore } from './store';
import App from './App.vue';
import { setupI18n } from './locales';

async function setupApp() {
  setupLoading();
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  setupI18n(app);
  app.mount('#app');
}
setupApp();
