<template>
  <div>
  <h1 @click="$router.push('/')">개발자의 서재</h1>
        <login-page v-if="getLoginMember === null"/>

    <book-input />
      
    <template v-if="isLoggedIn">
        <v-list>
            <v-list-item @click="$router.push('/mypage')">
              내 서재
            </v-list-item>
            <v-list-item @click="logout"> 로그아웃 </v-list-item>
          </v-list>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BookInput from './BookInput.vue'
import LoginPage from './login/LoginPage.vue'

export default {

    computed: {
      ...mapGetters([
        "isLoggedIn", "getLoginMember"
      ])
    },
    watch: {
      isLoggedIn() {
        this.checkLoggedIn();
      }
    },

    components: {
        BookInput,
        LoginPage,
    },

    methods: {
      checkLoggedIn() {
        console.log("when");
        if (!this.isLoggedIn) {
          this.$router.push("/");
        }
      },

      logout() {
          this.$store.dispatch("fetchLogOutMember");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          this.$router.push('/');
    },
    },

    async beforeCreate() {
      console.log("before home loading")

      await this.$store.dispatch("fetchLoginMember")
      console.log("after home loading")

    },
    
}
</script>

<style>

</style>