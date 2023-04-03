<template>
<header class ="header-base" >
  <nav>
    <div class="header-zero">
      <ul class="header-ul">
          <v-img class="main-logo-large" :src="require(`@/assets/group-icon.svg`)" @click="goMainPage" ></v-img>
          <v-img class="main-logo-small" :src="require(`@/assets/three-books.svg`)" @click="goMainPage" ></v-img>
          <book-input class="header-input" /> 
        <li>
          <div class="header-right">
            <login-page class="header-login" v-if="!isLoggedIn"/>
          <template v-if="isLoggedIn">
            <div class="header-mypage" @click="goMyPage">
              내 서재
            </div>
        </template>
          </div>
        </li>
      </ul>
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
            this.goMainPage;
        if (!this.isLoggedIn) {
          this.goMainPage;
        }
      },

      logout() {
          this.$store.dispatch("fetchLogOutMember");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          this.$router.push('/');
      },

      goMainPage() {
        if (window.location.href === "https://books4dev.me/") {
            this.$router.go(this.$router.currentroute);
        } else {
           this.$router.push('/');
        }  
      },
      goMyPage() {
        if (window.location.href === "https://books4dev.me/member/"+this.getLoginMember.oauth) {
             this.$router.go(this.$router.currentroute);
        } else {
             this.$router.push('/member/'+this.getLoginMember.oauth);
        }  
      }
    },

    async beforeCreate() { 
      await this.$store.dispatch("fetchLoginMember");
    },
    
}
</script>

<style scoped>

@media (max-width: 370px) {
  .header-login {
    display: flex;
    position: relative;
    float: right !important;
  }
  .main-logo-small{
    margin-left: 20px;
    margin-right: 60px !important;
    width: 10%;
  }

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
.main-logo-small{
  margin-left: 20px;
  margin-right: 70px;
  width: 10%;
}
.main-logo-large {
  display:none;
}
.header-logo {
  display: none;
}
.header-text {
  display: none;
}

.header-input {
  margin-right: -20px;
}

.header-right {
  float: right;
  display: flex;
}
.header-login {
  float: right !important;
  margin-right: 20px !important;
  margin-left: auto;
  width: 60px;
}
.header-mypage {
  float: right !important;
  margin-right: 5px !important;
  margin-left: auto;
  width: 60px;
}
}

@media screen and (max-width: 384px) {
  .header-login {
    display: flex;
    position: relative;
    float: right !important;
  }
  .main-logo-small{
    margin-left: 20px;
    margin-right: 60px !important;
    width: 10%;
  }
}

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
.main-logo-small{
  margin-left: 20px;
  margin-right: 70px;
  width: 10%;
}
.main-logo-large {
  display:none;
}
.header-logo {
  display: none;
}
.header-text {
  display: none;
}

.header-input {
  margin-right: -13px;
}

.header-right {
  float: right;
  display: flex;
}
.header-login {
  float: right !important;
  margin-right: 20px !important;
  margin-left: auto;
  width: 60px;
}
.header-mypage {
  float: right !important;
  margin-right: 15px !important;
  margin-left: auto;
  width: 60px;
}



@media screen and (min-width: 768px) {
.header-base {
  display: block;
  position: relative;
  width: 100%;
  max-width: 100%;
}
.header-text {
  display: flex;
  font-size: 150px;
}
.header-logo {
  display: flex;
  width: 400px;
  height: 70px;
  margin-right: 70px;
  float: right;
  display: flex;
  position: relative;
}

.header-mypage {
  margin-right: 20px !important;
  width: 100px;
}
.header-right {
  margin-right: -20px;
}

.header-login {
  width: 100px;
}
.main-logo-large {
  width: 220px;
  margin-left: 20px;
  margin-right: 5px;
  margin-top: 20px;
  display: inline;
}
.main-logo-small{
  display: none;
}
.header-input {
  margin-right: 10px;
  margin-left: 140px;
  display: flex;
}


}
</style>
