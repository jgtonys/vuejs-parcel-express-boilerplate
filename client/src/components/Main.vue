<template>
  <div>
    <main>
      <v-content>
        <v-container fluid>
          <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
          </transition>
        </v-container>
      </v-content>
    </main>
  </div>
</template>

<script>
import '../scss/main.scss';

export default {
  name: 'Main'
};

</script>