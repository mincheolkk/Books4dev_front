<template>
  <v-btn href="http://localhost:8081/oauth2/authorization/kakao" >
  <!-- <v-btn @click="kakao()" > -->
    <v-img class="logo-kakao" src="@/assests/kakao_icon.png"></v-img>
  </v-btn>
</template>

<script>
// import axios from 'axios';
export default {
    
   methods:{
      //  kaka() {

      //     //  const data = window.location.href="http://localhost:8080/oauth2/authorization/kakao";
      //     //  console.log(3);
      //     //  console.log(data);
      //      axios.get("http://localhost:8080/oauth2/authorization/kakao")
      //       .then(res => console.log(res))
      //       .catch(e => console.log(e))
      //  }

      // kakao() {
      //   const params = {
      //     redirectUri:"http://localhost:8080/oauth2/authorization/kakao",
      //   }
      //   window.Kakao.Auth.authorize(params)
      // }
   },
   mounted() {
     console.log("333333");
   },
    
}
</script>

<style>
.logo-kakao {
  max-height: 16px !important;
  max-width: 16px !important;
  margin-right: 8px !important;
}
</style>
