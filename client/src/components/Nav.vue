<template>
  <div>
    <v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="clipped" v-model="navDrawer" app v-click-outside="closeDrawer">
      <v-list>
        <v-list-tile :value="true" v-for="(menu, i) in menus" :key="menu.title">
            <v-list-tile-action>
              <router-link v-bind:to="menu.url"><v-icon light v-html="menu.icon"></v-icon></router-link>
            </v-list-tile-action>
            <v-list-tile-content>
              <router-link v-bind:to="menu.url"><v-list-tile-title id="menu" v-text="menu.title"></v-list-tile-title></router-link>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
//Trying to catch event when drawer closed by user-click outside 
//have to hook the clicking outside event
import clickOutside from 'vue-click-outside';
import '../scss/nav.scss';


export default {
  name: 'Nav',
  props: ['menus'],
  directives: {
    clickOutside
  },
  computed: {
    clipped() {
      return this.$store.state.clipped;
    },
    miniVariant() {
      return this.$store.state.miniVariant;
    },
    navDrawer() { //drawer status change by vuex.(mainly changed by click button)
      return this.$store.state.drawer;
    },
    menus() {
      if(this.$store.state.userinfo.user) return this.$store.state.afterMenu;
      else return this.$store.state.beforeMenu;
    }
  },
  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
  methods: {
    //clicking outside hook
    closeDrawer() {
      if(this.navDrawer == true) this.$store.commit('toggleDrawer');
    }
  }
};

</script>