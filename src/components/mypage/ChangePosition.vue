
<template>
    <v-row justify="center">
    <v-form ref="dialogForm" >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="280px"
      @keydown.esc="closeModal()"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">개발 직군을 알려주세요</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  :items="['백엔드', '프론트엔드', 'DevOps', '인공지능/머신러닝', '기타 혹은 미정']"
                  label="개발자 직군"
                  v-model="positionData"
                  required
                  :rules="rules.selected"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>* 이 정보는 책 추천에 활용됩니다</small>
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
            @click="addMemberType()"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
  </v-row>
</template>
<script>
import ApiService from '../../index.js'
import validator from '../../utils/validator';
import { positionConverter } from '../../utils/memberUtil'
import { mapGetters } from 'vuex'


export default {
    data() {
        return {
            rules: { ...validator.book },
            dialog: true,
            positionData: "",
            temp:{},
            firstLogin:true
       }
    },

    computed: {
        ...mapGetters([
            "getLoginMember", 
      ]),
    },

    methods:{
        convertPositionData() {
            return positionConverter(this.positionData)
        },

        async addMemberType() {
            if (!this.$refs.dialogForm.validate()) {
                return;
            }
            this.temp = {
                position: this.convertPositionData()
            }

            await ApiService.postWithToken("https://apiis.books4dev.me/member/selectPosition", this.temp)
            if (window.location.href === "https://books4dev.me/member/selectPosition"){
              this.$router.push(`/`);
                return;
            }
            this.$router.push(`/member/${this.getLoginMember.oauth}`);
        },
        async closeModal() {
            if (window.location.href === "https://books4dev.me/member/selectPosition"){
                this.temp = {position: 'ETC'}
                await ApiService.postWithToken("https://apiis.books4dev.me/member/selectPosition", this.temp);
                this.dialog = false;
                this.$router.push('/');
                return;
            }

            if (this.getLoginMember.memberType.length > 1){
                  this.dialog = false;
                  this.$router.push(`/member/${this.getLoginMember.oauth}`)
                  return;
            }
        }
    },

    async beforeCreate() {
       if (window.location.href === "https://books4dev.me/member/selectPosition"){
         const res = await ApiService.getWithToken("https://apiis.books4dev.me/member/checkPosition");
          if (res.status === 200) {
              this.dialog = false;
              this.firstLogin = true;
              this.$router.push('/'); 
          }
          else {
            this.firstLogin = false;
          }
       }
    },

    async beforeDestroy(){
      if (!this.firstLogin){
        this.$router.push('/member/changeNickname');
      }
      await this.$store.dispatch("fetchLoginMember");
    }

}    
  
</script>