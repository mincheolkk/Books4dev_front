<template>
        <v-btn
          class="wish-style"
          color="#FFFFFF"
          :style="{'font-size': '17px'}"
          depressed

          @click="wishBook()"
        >
         + 관심있는 책
        </v-btn>
      </template>

<script>
import ApiService from "../../index";
import { mapGetters } from 'vuex'

export default {
    props:['isbn','title','thumbnail'],
    computed: {
      ...mapGetters([
        "isLoggedIn", 
      ])
    },
    methods:{
        async wishBook(){
            if (!this.isLoggedIn) {
              await this.$store.dispatch(
                "updateSnackbarText",
                "로그인 후 이용해주세요."
              );

              await this.$store.dispatch(
                "closeSnackbarAfterTimeout",
                1000
              );
            }

            const request = {
                isbn: this.isbn,
                title: this.title,
                thumbnail: this.thumbnail
            };

            
            ApiService.postWithToken(`http://localhost:8084/book/wish`, request)
              .then(()=> {
                  this.$store.dispatch("updateSnackbarText","등록되었습니다.")
                  .then(() => 
                    this.$store.dispatch("closeSnackbarAfterTimeout",1000)
                  )
              })
              .catch(error => {
                if (error.response.status === 406){
                  this.$store.dispatch("updateSnackbarText", "이미 등록되었습니다.");
                  this.$store.dispatch("closeSnackbarAfterTimeout", 1000);
                }
              });
            },
        },
    }

</script>

<style>
.wish-style {
  margin-bottom: 5px;
}
</style>