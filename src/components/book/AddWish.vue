<template>
  <v-btn 
        text
        x-large
        @click="wishBook() "
        ><p> + 관심있는 책
        </p></v-btn>
</template>

<script>
import ApiService from "../../index";
import { mapGetters } from 'vuex'

export default {
    props:['isbn','title','thumbnail'],
    computed: {
      ...mapGetters([
        "isLoggedIn"
      ])
    },
    methods:{
        wishBook(){
            if (!this.isLoggedIn) {
              alert("로그인 부탁드립니다 :)")
              location.reload();
              return
            }
            const request = {
                isbn: this.isbn,
                title: this.title,
                thumbnail: this.thumbnail
            };
            // this.$store.dispatch("saveWishList",request);
            ApiService.postWithToken(`http://localhost:8081/book/wish`, request);
            alert("굳 :)")

              return
            },
        },
        checkLogin() {
            if (!this.isLoggedIn) {
              alert("로그인 부탁드립니다 :)")
              location.reload();
              return
        }
        }
    }

</script>

<style>

</style>