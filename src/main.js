import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Element Plus UI Library y estilos base y tema oscuro
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

// Registro de iconos comunes de Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// Registro de todos los iconos de Element Plus para disponibilidad global
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store);
app.use(ElementPlus);

app.mount('#app');
