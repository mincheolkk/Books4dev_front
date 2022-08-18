<template>
    <div>
        <!-- <v-btn @click="fetchReadBook()">readbook</v-btn>
        <v-card v-for="(result) in getReadBook.before" v-bind:key="result.isbn" >
                <img :src="result.thumbnail" alt="image"/>
        <p>{{result.title}}</p></v-card> -->
        <!-- <my-wish-book /> -->
        <!-- <router-view></router-view> -->
        <hr class="my-hr">
        <div class="select-button">
            <ul class="my-ul">
                <li class="my-li">
                    <a href="/mypage" class="my-href">읽은 책</a>
                </li>
                <li class="my-li">
                    <a href="/mypage/wish" class="my-href">관심있는 책</a>
                </li>
            </ul>
        </div>
            <!-- <my-read-book :getReadBook="getReadBook" /> -->
            <!-- <my-wish-book /> -->

    </div>

</template>

<script>
import { mapGetters } from 'vuex'
// import MyReadBook from './MyReadBook.vue'
// import MyWishBook from './MyWishBook.vue'

export default {

    components:{
        // MyReadBook,
        // MyWishBook,
    },

    computed: {
        ...mapGetters(
            ["isLoggedIn", "getReadBook"]
        )
    },

    methods: {
        fetchReadBook() {
        }
    },

    async beforeCreate() {
        await this.$store.dispatch("fetchLoginMember")
        await this.$store.dispatch("fetchReadBook")
    }
}
</script>

<style>
.select-button {
    display: flex;
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
</style>