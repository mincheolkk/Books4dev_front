<template>
    <v-row justify="center">
    <v-form ref="dialogForm" >
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
         + 읽은 책
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">개발 직군을 알려주세요</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['BackEnd', 'FrontEnd', 'AI/ML','DATA', 'DevOps']"
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
import { positionConverter } from '../../utils/bookUtil'


export default {
    data() {
        return {
            rules: { ...validator.book },
            dialog: true,
            positionData: "",
            temp:{}

       }
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

            await ApiService.postWithToken("http://localhost:8081/selectPosition", this.temp)
            this.dialog = false;
            this.$router.push('/');
        },
        async closeModal() {
            this.dialog = false;
            this.$router.push('/');
        }
    },
    gohome() {
      
    },

    async beforeCreate() {
        const res = await ApiService.getWithToken("http://localhost:8081/checkPosition");
        await this.$store.dispatch("fetchLoginMember")
        if (res.status === 200) {
            this.$router.push('/'); 
            console.log("go home!");

            // this.$router.push('/');
        }
    }
}    
  
</script>