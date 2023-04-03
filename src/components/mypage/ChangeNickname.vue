<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="280px"
      @keydown.esc="closeModal()"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">닉네임을 알려주세요</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
              <input type="text" 
              v-model="nickname" 
              placeholder="닉네임" 
              style="text-align: left; border-bottom: 1px solid black; outline: none;"
              >
              </v-col>
            </v-row>
          </v-container>
          <small>* 10자 이내의 한글/영어/숫자만 가능합니다.</small>
          <v-spacer></v-spacer>
          <small>(공백불가)</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeModal()"
          >
            닫기
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveNickname()"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import ApiService from '../../index.js'
import { mapGetters } from 'vuex'

export default {

    data() {
        return {
            dialog: true,
            nickname:""
       }
    },
    computed:{
        ...mapGetters([
            "getLoginMember", 
      ]),
        },
    watch: {
      'nickname': function() {
        this.checkNickname()
      }
    },

    methods: {
        async saveNickname() {
            let data;
            data = {
                "nickname":this.nickname.toString().trim()
            }

           if (this.nickname.length < 1){
                return;
            }

            await ApiService.postWithToken("https://apiis.books4dev.me/member/nickname",data)
                      .then(
                            this.dialog = false,
                            this.$router.go(-1),
                          )
                      .catch(error => {
                            if (error.response.status === 406){
                                alert("중복된 닉네임이 존재합니다.")}
                            if (error.response.status === 1001){
                                alert("닉네임은 10자 이내로 가능합니다.")}
                            if (error.response.status === 1002){
                                alert(error.response.data.message)}
                      });
            this.$router.go(this.$router.currentroute);
        },

        checkNickname() {
          const validateNickname = /^(?=.{0,10}$)[ㄱ-ㅎㅏ-ㅣ가-힣\d]*[0-9a-zA-Z]*\d*$|\b/

          if (!validateNickname.test(this.nickname)) {
            alert("10자 이내의 한글/영어/숫자만 가능합니다.")
          }
        },

        closeModal() {
            this.dialog = false;
            this.$router.go(-1);
        },
    }

}
</script>

<style>

</style>