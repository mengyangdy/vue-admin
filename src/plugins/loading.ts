export function setupLoading() {
  const loading = `
    <div class="fixed-center flex-col bg-layout" >
  正在加载中
</div>;
  `;
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = loading;
  }
}
