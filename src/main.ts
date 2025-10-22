import { createApp } from 'vue';
import './plugins/assets';

import { setupLoading } from './plugins';
import { setupRouter } from './router';
import { setupStore } from './store';
import App from './App.vue';

async function setupApp() {
  setupLoading();
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  app.mount('#app');
}
setupApp();
