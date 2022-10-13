<template>
    <div>
        <!-- <v-btn @click="fetchReadBook()">readbook</v-btn>
        <v-card v-for="(result) in getReadBook.before" v-bind:key="result.isbn" >
                <img :src="result.thumbnail" alt="image"/>
        <p>{{result.title}}</p></v-card> -->
        <!-- <my-wish-book /> -->
        <!-- <router-view></router-view> -->
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
            <p>{{this.memberType}}</p>
            <v-img class="icon-search" :src="require(`@/assets/search-icon.png`)" @click="changePosition()"></v-img>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
// import MyReadBook from './MyReadBook.vue'
// import MyWishBook from './MyWishBook.vue'
import ProfileImg from './ProfileImg.vue'
import { ReversePositionConverter } from '../../utils/memberUtil'


export default {

    components:{
        // MyReadBook,
        // MyWishBook,
        ProfileImg
    },

    data() {
        return {
            memberType:""
        }
    },

    computed: {
        ...mapGetters(
            // ["isLoggedIn", "getReadBook","getLoginMember"]
        )
    },

    methods: {
        fetchReadBook() {
        },
        logout() {
          this.$store.dispatch("fetchLogOutMember");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          this.$router.push('/');
        },
        changePosition() {
            this.$router.push('/changePosition')
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
    padding: 10px 30px;
    overflow: hidden;
}
.my-li {
    display: inline-flex;
}
.go-right {
        /* justify-content: center; */
        float: right;

}
.my-href {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 34px;
    /* border-radius: 40px; */
    margin: 6px 2px;
    /* color: #141414; */
    font-size: 16px;
    /* font-weight: 500; */
    /* line-height: 19px; */
    /* letter-spacing: -0.01em; */
        cursor: pointer;
}
.my-profile-img {
    /* justify-content: center; */
        display: inline-flex;
        /* position: absolute */

    text-align: center;
}
.my-profile {
      /* box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03); */

}
.my-logout {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    cursor: pointer;
}
.icon-search {
    max-width: 15px;
    margin-right: 10px;
    cursor: pointer;  
    align-self: center;
      margin-left: ;



}



</style>