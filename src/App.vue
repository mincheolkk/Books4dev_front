<template>
  <v-app id="app">

    <home-header />
    <!-- <book-list /> -->
    <router-view />
  </v-app>
</template>

<script>
// import BookList from './components/BookList.vue'
import HomeHeader from './components/HomeHeader.vue'

export default {
  name: 'App',
  components: {
    HomeHeader,
    // BookList,
  },
  created() {
    // this.$router.push()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
