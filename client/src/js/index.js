import Vue from 'vue/dist/vue.common.js';
import App from '../components/App.vue';
import { createRouter } from './router';
import { store } from './vuex';
import Vuetify from 'vuetify';
import VueSessionStorage from 'vue-sessionstorage';


Vue.use(VueSessionStorage);
Vue.use(Vuetify);

export function createApp() {
  const router = createRouter();
  const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  });

  return {app, router};
}

window.onload = () => createApp();

/*
if (module.hot) {
  module.hot.accept();
}*/
