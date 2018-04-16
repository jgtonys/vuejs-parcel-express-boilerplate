<template>
  <div>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.native.stop="changeDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-if="!user" v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
        <v-btn small depressed outline color="indigo" fab slot="activator" @click="openDialog"><v-icon>person</v-icon></v-btn>
        <loginForm></loginForm>
      </v-dialog>
      <v-menu v-else offset-y :close-on-content-click="false" auto :min-width="100">
        <v-btn small depressed outline color="black" slot="activator">{{ user }}</v-btn>
        <v-card><v-btn @click="logout">logout</v-btn></v-card>
      </v-menu>
      <v-menu offset-y :close-on-content-click="false" v-model="menu" auto :min-width="300">
        <v-btn small depressed outline fab slot="activator"><v-icon>settings</v-icon></v-btn>
        <v-card>
          <v-list>
            <v-list-tile>
              <v-switch label="Simple Menu" v-model="simpleMenu" color="purple"></v-switch>
            </v-list-tile>
            <v-list-tile>
              <v-switch label="Clipped Menu" v-model="clippedMenu" color="purple"></v-switch>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
//import axios from 'axios';
import Login from './Login.vue';

export default {
  name: 'Toolbar',
  components: {
    'loginForm': Login
  },
  data() {
    return {
      simpleMenu: false,
      clippedMenu: false
    };
  },
  methods: {
    changeDrawer() {
      this.$store.commit('toggleDrawer');
    },
    logout() {
      this.$session.clear(this.sessionKey);
      this.$store.commit('logout');
    },
    openDialog() {
      this.$store.dispatch('updateDialog',true);
    }
  },
  computed: {
    clipped() {
      return this.$store.state.clipped;
    },
    user() {
      return this.$store.state.userinfo.user;
    },
    dialog() {
      return this.$store.state.loginDialog;  
    }
  },
  watch: {
    simpleMenu() {
      this.$store.commit('toggleMini');
    },
    clippedMenu() {
      this.$store.commit('toggleClip');
    }
  },
  created() {
    if(this.$session.get('user')) {
      console.log("commit login");
      this.$store.commit('login',this.$session);
    }
  }
};

</script>