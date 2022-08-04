<template>
  <div>
  <h1>개발자의 서재</h1>
    <book-input />
    <login-page />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BookInput from './BookInput.vue'
import LoginPage from './login/LoginPage.vue'

export default {

    computed:{
      ...mapGetters([
        "isLoggedIn"
      ])
    },

    components:{
        BookInput,
        LoginPage,

    }
}
</script>

<style>

</style>