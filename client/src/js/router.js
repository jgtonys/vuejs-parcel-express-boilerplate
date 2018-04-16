import Vue from 'vue/dist/vue.common.js';
import Router from 'vue-router';
import Signupform from '../components/Signup.vue';
import Test from '../components/Test.vue';
import Main from '../components/mainContent.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    linkExactActiveClass: 'is-active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', name: 'Main', component: Main },
      { path: '/signup', name: 'Signupform', component: Signupform },
      { path: '/test', name: 'test', component: Test },
      { path: '*', redirect: '/' },
    ],
  });
}
