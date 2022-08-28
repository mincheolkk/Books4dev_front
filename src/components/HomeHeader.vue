<template>
<header class ="header-base">
  <nav>
    <div class="header-zero">
      
      <ul class="header-ul">
        <!-- <li class="li-logo">
          <v-img :src="require(`@/assets/logo.png`)" @click="$router.push('/')"></v-img> -->
        <li >
          <svg width="350" height="70" viewBox="0 0 620 70">
          <text 
            x="30" y="20" 
            fill="#ED6E46" font-size="50" font-family="Helvetica" @click="$router.push('/')">
            개발자의 서재
          </text>
        </svg> </li>
        <li class="li-searchBar">
          <v-spacer></v-spacer>
          <book-input class="header-input"/> </li>
        <li class="li-login">
          <login-page v-if="getLoginMember === null"/>
          <template v-if="isLoggedIn">
            <v-list style="display: flex">
                <v-list-item @click="$router.push('/mypage')">
                  내 서재
                </v-list-item>
                <v-list-item @click="logout"> 로그아웃 </v-list-item>
              </v-list>
        </template> </li>
      </ul>
          
      <!-- <h1 @click="$router.push('/')">개발자의 서재</h1>
        <login-page v-if="getLoginMember === null"/>
        <book-input />
        <template v-if="isLoggedIn">
            <v-list>
                <v-list-item @click="$router.push('/mypage')">
                  내 서재
                </v-list-item>
                <v-list-item @click="logout"> 로그아웃 </v-list-item>
              </v-list>
        </template> -->
    </div>
  </nav>
</header>
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

<style scoped>
.header-base {
  display: block;
  position: relative;
  width: 100%;
  max-width: 100%;
}
.header-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
    position: relative;

}
.li-logo {
  display: flex;
  align-items: center;
  height: 62px;
  margin: 0 130px 0 20px;
  flex-shrink: 0;
  cursor: pointer;
}
.li-searchBar {
  margin: 20px 20px 0px 20px;
    display: flex;
    align-items: center;
    height: 62px;
    margin: 0 0 0 24px;
    flex-shrink: 0;
    width: 40%;
}
.li-login {
  position: relative;
  width: 20%;
  margin: 0;
  margin-left: auto;
  cursor: pointer;
}
.header-input {
  margin-right: 10px;
}

</style>