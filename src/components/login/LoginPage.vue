<template>
  <v-btn class="btn-kakao" href="http://localhost:8081/oauth2/authorization/kakao" >
      <v-img class="logo-kakao" :src="require(`@/assets/kakao_icon.png`)"></v-img>
  </v-btn>
</template>

<script>
</script>

<style>
.logo-kakao {
  max-height: 160px !important;
  max-width: 160px !important;
  margin-right: 80px !important;
}

.btn-kakao {

  max-width: 1px !important;

}
</style>
