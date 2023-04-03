<template>
    <v-form ref="dialogForm" >
    <v-dialog 
      v-model="dialog"
      persistent
      max-width="350px"
      @keydown.esc="cancel()"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#FFFFFF"
          :style="{'font-size': '17px'}"
          depressed
          v-bind="attrs"
          v-on="on"
          @click="checkLogin()"
        >
         + 읽은 책
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">책 등록하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row >
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="['1', '2', '3', '4','5']"
                  v-model="request.star"
                  label="별점"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="['개발자 취업 전', '0-2년차', '3-5년차', '6년차 이상']"
                  label="읽었거나 읽고 있는 시기를 알려주세요"
                  v-model="request.readTime"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="['개발자 취업 전', '0-2년차', '3-5년차', '6년차 이상','언제든 좋음']"
                  label="읽기에 좋은 시기를 추천해주세요"
                  v-model="request.recommendTime"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small></small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            닫기
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addBook()"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
</template>

<script>
import ApiService from '../../index';
import validator from '../../utils/validator';
import { timeConverter } from '../../utils/bookUtil'
import { mapGetters } from 'vuex'

  export default {
    props: ['info','isbn'],

    computed: {
      ...mapGetters([
        "isLoggedIn", "getSearchKeyword"
      ])
    },

    data() {
        return {
            rules: { ...validator.book },
            dialog: false,
            request: {
                star: "",
                readTime: "",
                recommendTime: "",
            },
            review: {},
            searchKeyword : ""

       }
    },

    methods:{
        cancel() {
          this.dialog = false;
        },

        async checkLogin() {
            if (!this.isLoggedIn) {
              await this.$store.dispatch(
                "updateSnackbarText",
                "로그인 후 이용해주세요."
              );

              this.dialog = false;
              
              await this.$store.dispatch(
                "closeSnackbarAfterTimeout",
                1000
              );
          }
        },

        convertReviewData() {
          if (window.location.href === "https://books4dev.me/search") {
            console.log(this.getSearchKeyword);
            return {
              readTime: timeConverter(this.request.readTime),
              recommendTime: timeConverter(this.request.recommendTime),
              star: this.request.star,
              searchKeyword: this.getSearchKeyword
            }
          }

          return {
              readTime: timeConverter(this.request.readTime),
              recommendTime: timeConverter(this.request.recommendTime),
              star: this.request.star,
          }
        },

        async addBook() {
          if (!this.$refs.dialogForm.validate()) {
                return;
          }

          if (this.isbn === undefined){            
            let review;
            review = {review :  this.convertReviewData()};

            let dto;
            dto = Object.assign(this.info, review);

            ApiService.postWithToken("https://apiis.books4dev.me/book/fromSearch",dto)
            
            await this.$store.dispatch(
                "updateSnackbarText",
                "등록되었습니다."
              );

            await this.$store.dispatch(
                "closeSnackbarAfterTimeout",
                1000
              );
          } 
          else if (this.isbn !== undefined){
            let review;
            review = {review :  this.convertReviewData()};
            review.isbn = this.isbn;

            ApiService.postWithToken("https://apiis.books4dev.me/book/fromList",review)
          }
          
          this.dialog = false;

          await this.$store.dispatch(
              "updateSnackbarText",
              "등록되었습니다."
            );

          await this.$store.dispatch(
              "closeSnackbarAfterTimeout",
              1000
            );
        }
    }
  }
</script>