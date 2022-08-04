<template>
  <div>
      <p>abba</p>
  </div>
</template>

<script>
import ApiService from "../../index";

export default {
   

    async beforeCreate() {
        const token = this.$route.query.token;
        const obj = {
            "accessToken":token,
            expire:Date.now() + 1000 * 60
        }
        localStorage.setItem("accessToken",JSON.stringify(obj));

        const refresh = await ApiService.getWithToken("http://localhost:8081/test/token");
        localStorage.setItem("refreshToken", refresh.data);

        this.$router.push('/selectPosition');
    },

    mounted() {
        console.log("mounted ? ")

        
    },
}
</script>

<style>

</style>