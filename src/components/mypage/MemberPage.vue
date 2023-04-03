<template>
    <div>
        <hr class="my-hr">
        <div v-if="isOwner()" class="my-logout" @click="logout()">
            <p style="color: #808991;">로그아웃 </p>
        </div>
        
        <div class="select-button">
            <ul class="my-ul">
                <li class="my-li">
                    <a :href="this.memberPage" class="my-href">읽은 책</a>
                </li>
                <li class="my-li">
                    <a :href="this.wishPage" class="my-href">관심있는 책</a>
                </li>
            </ul>
        </div>

        <div class="my-profile">
            <div class="my-profile-img">
                <profile-img />
            </div >
            <div v-if="isOwner()" class="my-type"> 
                <span style="margin-left:35px" class="type-text">{{this.getLoginMember.nickname}}</span>
                <v-img class="icon-search" :src="require(`@/assets/edit.png`)" @click="changeNickname()"></v-img>
            </div>
            <div v-else style="margin-top:3px" class="my-type"> 
                <span class="type-text">{{this.memberNickname}}</span>

            </div>
            <div v-if="isOwner()" class="my-type">
                <span style="margin-left:35px" class="type-text">{{this.memberType}}</span>
                <v-img class="icon-search" :src="require(`@/assets/edit.png`)" @click="changePosition()"></v-img>
            </div>
            <div v-else style="margin-top:3px" class="my-type">
                <span class="type-text">{{this.memberType}}</span>
            </div>
        </div>
    </div>

</template>

<script>
import ProfileImg from './ProfileImg.vue'
import { ReversePositionConverter } from '../../utils/memberUtil'
import { mapGetters } from 'vuex';



export default {
    components:{
        ProfileImg
    },
    computed: {
        ...mapGetters([
            "getLoginMember", "getMemberPage"
      ])
    },
    data() {
        return {
            memberType:"",
            memberNickname:"",
            memberOauth:"",
            wishPage:"",
            memberPage:"",
        }
    },

    methods: {
        isOwner() {
            return this.getLoginMember !== null && this.getLoginMember.oauth === this.getMemberPage.oauth;
        },
        logout() {
          this.$store.dispatch("fetchLogOutMember");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          this.$router.push('/');
        },
        changePosition() {
            this.$router.push('/member/changePosition')
        },
        changeNickname() {
            this.$router.push('/member/changeNickname')
        }
    },

    async beforeCreate() {
        const member = await this.$store.dispatch("fetchMember", this.$route.params.id);
        this.memberType = ReversePositionConverter(member.memberType);
        this.memberNickname = member.nickname;
        this.memberOauth = member.oauth;
        this.wishPage = "/member/wishBook/" + member.oauth;
        this.memberPage = "/member/" +member.oauth

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