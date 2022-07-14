<template>

 <v-row justify="center">
    <v-form ref="dialogForm" v-model="valid">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         + 읽은/읽는중인 책
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">책 등록하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['1', '2', '3', '4','5']"
                  v-model="request.star"
                  label="별점"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['개발자 취업 전', '개발자 취업 후 ~ 2년', '2년 ~ 5년 ', '5년 ~ 10년','10년 ~ ']"
                  label="이 책을 읽었거나 읽고 있는 시기를 알려주세요"
                  v-model="request.readTime"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['개발자 취업 전', '개발자 취업 후 ~ 2년', '2년 ~ 5년 ', '5년 ~ 10년','10년 ~ ']"
                  label="이 책을 읽기에 좋은 시기를 추천해주세요"
                  v-model="request.recommendTime"

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
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addBook()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
  </v-row>
</template>

<script>
import validator from '../utils/validator';

  export default {
    props: ['bookData'],

    data() {
        return {
            rules: { ...validator.book },
            dialog: false,
            request: {
                star: "",
                readTime: "",
                recommendTime: "",
            }
       }
    },

    methods:{
        addBook() {
            if (!this.$refs.dialogForm.validate()) {
                return;
            }
            console.log("2")
            // console.log(this.bookData + this.request);
            let min;
            min = {
                book:this.bookData,
                request:this.request
            }
            console.log(min);
            console.log(min.book.item.isbn);
            this.dialog = false;
        }
    }
  }
</script>