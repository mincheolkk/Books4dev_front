<template>
    <div>
        <hr class="my-hr">
        <div class="my-logout" @click="logout()">
                <p>로그아웃 </p>
        </div>

        <div class="select-button">
            <ul class="my-ul">
                <li class="my-li">
                    <a href="/mypage" class="my-href">읽은 책</a>
                </li>
                <li class="my-li">
                    <a href="/mywish" class="my-href">관심있는 책</a>
                </li>
            </ul>
        </div>

        <div class="my-profile">
            <div class="my-profile-img">
                <profile-img />
            </div>
            <p>나</p>
            <div class="my-type">
                <span class="type-text">{{this.memberType}}</span>
                <v-img class="icon-search" :src="require(`@/assets/edit2.png`)" @click="changePosition()"></v-img>
            </div>
        </div>
    </div>

</template>

<script>
import ProfileImg from './ProfileImg.vue'
import { ReversePositionConverter } from '../../utils/memberUtil'

export default {
    components:{
        ProfileImg
    },

    data() {
        return {
            memberType:""
        }
    },

    methods: {
        logout() {
          this.$store.dispatch("fetchLogOutMember");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          this.$router.push('/');
        },
        changePosition() {
            this.$router.push('/member/changePosition')
        }
    },

    async beforeCreate() {
       const member = await this.$store.dispatch("fetchLoginMember");
       this.memberType = ReversePositionConverter(member.data.memberType);
    }
}
</script>

<style scoped>
.select-button {
    display: flex;
    align-items: center;
  justify-content: left;
}
.my-hr {    
    height: 1px;
    background: #e5e5e5;
    border: none;
    margin: 0 20px; 
    margin-top: 0px; 
}
.my-ul {
    display: flex;
    padding: 10px 10px;
    overflow: hidden;
}
.my-li {
    display: inline-flex;
}
.go-right {
        float: right;

}
.my-href {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 34px;
    margin: 6px 2px;
    font-size: 16px;
    cursor: pointer;
}
.my-profile-img {
    display: inline-flex;
    text-align: center;
}
.my-logout {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    cursor: pointer;
}
.icon-search {
    max-width: 17px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;  
    align-self: center;
    display: inline-block;
    margin-left: 10px;
}
.type-text {
    width: 250px;
}
.my-type {
    margin-top: -10px;
    position: relative;

}
li a {
  color: #808991;
  font-weight: normal;
  text-decoration: none;
}


li a:active, li a:focus, li a:hover {
  color: black;
  font-weight: 600;
}


</style>