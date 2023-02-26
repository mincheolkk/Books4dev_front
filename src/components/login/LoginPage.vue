<template>
  <div class="backgroud">
    <div class="button-box">
        <img class="kakao-icon"  @click="kakaoLogin" src="@/assets/kakao_login_small.png" />
    </div>
  </div>
</template>

<script>
 export default {
  name: "LoginPage",
  methods: {
    kakaoLogin() {
      window.location.href = "http://localhost:8084/oauth2/authorization/kakao";
    },
  },
};
</script>

<style scoped>
.logo-kakao {
  max-height: 160px !important;
  max-width: 160px !important;
  margin-right: 180px !important;
  cursor: pointer;
}

.btn-kakao {
  max-height: 10px !important;
  color :transparent;
  border: none;
}

.background {
  position: absolute;
  height: 100vh;
  z-index: 9999;
}

.button-box {
  width: 2%;
  margin-top: 10px;
  background-color: transparent !important;
}

.kakao-icon {
  width: 70px;
  margin-right: 100px;
}
</style>
