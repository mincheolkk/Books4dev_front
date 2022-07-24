<template>
  <v-btn @click="kaka()" >

  </v-btn>
</template>

<script>
export default {
    
   methods:{
       kaka() {
           console.log(1);
           const url = window.location.href
           const data = window.location.href="http://localhost:8080/oauth2/authorization/kakao";
           console.log(3);
           console.log(data);
       }
   }
    
}
</script>

<style>

</style>