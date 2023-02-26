<template>
<div class="outer-app">
  <v-app id="app">
    <snack-bar></snack-bar>
    <home-header />
    <router-view />
    <home-footer></home-footer>
  </v-app>
</div>
</template>

<script>
import HomeHeader from './components/HomeHeader.vue'
import SnackBar from "./components/SnackBar";
import HomeFooter from "./components/HomeFooter";


export default {
  name: 'App',
  components: {
    HomeHeader,
    SnackBar,
    HomeFooter,
  },

}
</script>

<style>
.outer-app {
  margin: 0;
  width: 100%;
  min-height: 100%;
  position: relative;
  text-align: center;

  background-color: #172036;
}
#app { 
  margin: 0 auto;
  width:768px; 
  min-height:100%; 
  position:relative; 
  text-align:center;
}

@media(max-width:768px){
  #app{ 
      width:100%; 
      margin: 0 auto;
      border-left:0; 
      border-right:0; }
  }

</style>
