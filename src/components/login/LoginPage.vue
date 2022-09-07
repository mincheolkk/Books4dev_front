<template>
  <v-btn class="btn-kakao" href="http://localhost:8081/oauth2/authorization/kakao" >
      <v-img class="logo-kakao" :src="require(`@/assets/kakao_login_small.png`)" ></v-img>
      <v-alert type="success">
      I'm a success alert.
    </v-alert>
  </v-btn>
</template>

<script>
</script>

<style scoped>
.logo-kakao {
  max-height: 160px !important;
  max-width: 160px !important;
  margin-right: 180px !important;
  cursor: pointer;
  /* max-height: 50px;
  max-width: 10px;
  margin-right: 80px;  */
}

.btn-kakao {
  max-height: 10px !important;
  /* max-width: 1px !important; */
  /* margin-right: 80px !important; */
  right: -130px;

  
}
</style>
