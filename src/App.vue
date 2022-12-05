<template>
  <v-app id="app">
    <snack-bar></snack-bar>
    <home-header />
    <!-- <book-list /> -->
    <router-view />
  </v-app>
</template>

<script>
// import BookList from './components/BookList.vue'
import HomeHeader from './components/HomeHeader.vue'
import SnackBar from "./components/SnackBar";

export default {
  name: 'App',
  components: {
    HomeHeader,
    // BookList,
    SnackBar
  },
  created() {
    // this.$router.push()
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app { 
  margin:0 auto; 
  width:60%; 
  min-height:100%; 
  padding-top:20px; 
  border-left:1px #D8D8D8 solid; 
  border-right:1px #D8D8D8 solid; 
  position:relative; 
  text-align:center;
  box-shadow: cm;
}
/* 여백제거 + 드래그방지 */
  /* body{ padding:0; margin:0; -ms-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; user-select: none; } */

  /* 반응형 시작 */
  @media(max-width:750px){
    #app{ width:100%; border-left:0; border-right:0; }
  }

</style>
