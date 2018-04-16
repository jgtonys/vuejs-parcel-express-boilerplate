<template>
  <div>
    <v-app>
      <headerNav :menus="menus"></headerNav>
      <headerToolbar></headerToolbar>
      <mainContent></mainContent>
      <footerNav :title="title"></footerNav>
    </v-app>
  </div>
</template>

<script>
import Nav from './Nav.vue';
import Toolbar from './Toolbar.vue';
import Footer from './Footer.vue';
import Main from './Main.vue';

export default {
  name: 'App',
  components: {
    'headerNav': Nav,
    'headerToolbar': Toolbar,
    'footerNav': Footer,
    'mainContent': Main
  },
  data() {
    return {
      title: "jgtony's boilerplate",
      menus: [
        { icon: 'chrome_reader_mode', title: 'Main', url: '/'},
		    { icon: 'person_add', title: 'Sign-up', url: '/signup' },
		    { icon: 'person_outline', title: 'DB-test', url: '/test' }
      ],
    };
  },
  beforeCreate() {
    this.$options.components.Loginform = require('./Login.vue');
  }
};
</script>

<style scoped>

</style>
