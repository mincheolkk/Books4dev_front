<template>
  <div>
      <p>abba</p>
  </div>
</template>

<script>
export default {
   

    async beforeCreate() {
        const token = this.$route.query.token;
        console.log(token);
        await localStorage.setItem("accessToken", token);
    }
}
</script>

<style>

</style>