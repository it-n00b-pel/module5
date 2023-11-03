import './assets/scss/global.scss';
import './assets/scss/reset.scss';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import Toast from 'vue-toastification';
import YmapPlugin from 'vue-yandex-maps';

import { toastConfig } from '@/config/toastConfig';
import { settings } from '@/config/YaMap';
import { router } from '@/router/routerConfig';

import App from './App.vue';
import store, { key } from './store';

const app = createApp(App);
app.provide('$store', store);
app.use(store, key);
app.use(Toast, toastConfig);
app.use(YmapPlugin, settings);
app.use(router);
app.mount('#app');
