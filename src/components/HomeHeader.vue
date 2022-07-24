<template>
  <div>
  <h1>개발자의 서재</h1>
    <book-input />
    <login-page />
  </div>
</template>

<script>
import BookInput from './BookInput.vue'
import LoginPage from './LoginPage.vue'

export default {
    components:{
        BookInput,
        LoginPage
    }
}
</script>

<style>

</style>