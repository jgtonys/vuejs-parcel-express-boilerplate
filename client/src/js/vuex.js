import Vue from 'vue/dist/vue.common.js';
import Vuex from 'vuex';

Vue.use(Vuex);

//todo : vuex file must be sepearated by states,mutations,actions

export const store = new Vuex.Store({
  state: {
    clipped: false,
    miniVariant: false,
    drawer: false,
    syncDrawer: false,
    loginDialog: false,
    userinfo: {
      user: "",
      sessionKey: "",
      token: false
    },
    beforeMenu: [
      { icon: 'chrome_reader_mode', title: 'Main', url: '/'},
	    { icon: 'person_add', title: 'Sign-up', url: '/signup' },
	    { icon: 'person_outline', title: 'DB-test', url: '/test' }
    ],
    afterMenu: [
      { icon: 'chrome_reader_mode', title: 'Main', url: '/'},
    ]
  },
  mutations: {
    toggleClip(state) {
      state.clipped = !state.clipped;
    },
    toggleMini(state) {
      state.miniVariant = !state.miniVariant;
    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    logout(state) {
      state.userinfo.user = "";
      state.userinfo.token = false;
      state.userinfo.sessionKey = "";
    },
    login(state,payload) {
      state.userinfo.user = payload.get('user');
      state.userinfo.token = payload.get('userToken');
      state.userinfo.sessionKey = payload.get('sessionKey');
    },
    setLoginDialog(state,value) {
      state.loginDialog = value;
    }
  },
  actions: {
    updateDialog({commit},value) {
      commit('setLoginDialog',value);
    }
  }
});
