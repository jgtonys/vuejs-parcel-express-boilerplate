<template>
  <div>
    <v-footer :fixed="fixed" app>
      <span>&copy; jgtony {{ title }} 2017</span>
    </v-footer>
  </div>
</template>

<script>
//import '../scss/footer.scss';

export default {
  name: 'Footer',
  props: ['title']
};

</script>

<style lang="scss" scoped>
  span {
    color:red;
    font-size:30pt;
  }
</style>
