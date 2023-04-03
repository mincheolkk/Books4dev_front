<template>
  <div>
      잠시만 기다려주세요.
  </div>
</template>

<script>
import ApiService from "../../index";

export default {
   
    async beforeCreate() {
        const token = this.$route.query.token;
        const obj = {
            "accessToken":token,
            expire:Date.now() + 1000 * 60 * 60 * 36
        }
        localStorage.setItem("accessToken",JSON.stringify(obj));
        
        const refresh = await ApiService.getWithToken("https://apiis.books4dev.me/auth/refreshtoken");
        localStorage.setItem("refreshToken", refresh.data);

        this.$router.push('/member/selectPosition');
    },
}
</script>

<style>

</style>
