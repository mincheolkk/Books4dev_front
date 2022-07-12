<template>
  <v-app id="app">
    <nav>
      <router-link to="/">Home2</router-link>
      <router-link to="/search">searh</router-link>
    </nav>
    <home-header />
    <book-list />
  </v-app>
</template>

<script>
import BookList from './components/BookList.vue'
import HomeHeader from './components/HomeHeader.vue'

export default {
  name: 'App',
  components: {
    HomeHeader,
    BookList,



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
