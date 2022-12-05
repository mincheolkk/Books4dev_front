<template>

 <!-- <v-row justify="center"> -->
    <v-form ref="dialogForm" >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#6297CD"
          dark
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
                sm="8"
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
                sm="8"
              >
                <v-select
                  :items="['개발자 취업 전', '개발자 취업 후 ~ 2년', '2년 ~ 5년', '5년 ~ 10년','10년 ~']"
                  label="읽었거나 읽고 있는 시기를 알려주세요"
                  v-model="request.readTime"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="8"
              >
                <v-select
                  :items="['개발자 취업 전', '개발자 취업 후 ~ 2년', '2년 ~ 5년', '5년 ~ 10년','10년 ~']"
                  label="읽기에 좋은 시기를 추천해주세요"
                  v-model="request.recommendTime"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*주절주절</small>
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
  <!-- </v-row> -->
</template>

<script>
import ApiService from '../../index';
import validator from '../../utils/validator';
import { timeConverter } from '../../utils/bookUtil'
import { mapGetters } from 'vuex'

  export default {
    props: ['bookData','isbn'],

    computed: {
      ...mapGetters([
        "isLoggedIn", "getLoginMember"
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
            review: {}

       }
    },
    

    methods:{
        async checkLogin() {
            if (!this.isLoggedIn) {
              // alert("로그인 부탁드립니다 :)")
              // location.reload();
              // return;
              await this.$store.dispatch(
                "updateSnackbarText",
                "로그인 해줘요"
              );
        }
        },

        convertReviewData() {
          return {
              readTime: timeConverter(this.request.readTime),
              recommendTime: timeConverter(this.request.recommendTime),
              star: this.request.star
          }
        },

        async addBook() {
          if (!this.$refs.dialogForm.validate()) {
                return;
          }

          if (this.isbn === undefined){            
            let review;
            review = {review :  this.convertReviewData()};
            let min;
            min = Object.assign(this.bookData, review);

            ApiService.postWithToken("http://localhost:8081/bySearch",min)
          } 
          else if (this.isbn !== undefined){
            let review;
            review = {review :  this.convertReviewData()};
            review.isbn = this.isbn;

            ApiService.postWithToken("http://localhost:8081/bylist",review)
          }
          
          this.dialog = false;
        }
    }
  }
</script>