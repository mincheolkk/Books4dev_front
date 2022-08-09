<template>
    <div>
        <!-- <v-btn @click="fetchReadBook()">readbook</v-btn>
        <v-card v-for="(result) in getReadBook.before" v-bind:key="result.isbn" >
                <img :src="result.thumbnail" alt="image"/>
        <p>{{result.title}}</p></v-card> -->
        <!-- <my-wish-book /> -->

            <my-read-book :getReadBook="getReadBook" />


    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import ApiService from '..'
import MyReadBook from './MyReadBook.vue'
// import MyWishBook from './MyWishBook.vue'

export default {

    components:{
        MyReadBook,
        // MyWishBook
    },

    computed: {
        ...mapGetters(
            ["isLoggedIn", "getReadBook"]
        )
    },

    methods: {
        fetchReadBook() {

            console.log("in mypage" + this.getReadBook.after[0]);
        }
    },

    async beforeCreate() {
        await this.$store.dispatch("fetchLoginMember")
        await this.$store.dispatch("fetchReadBook")
        // await this.$store.dispatch("fetchWishBook")

    }
}
</script>

<style>

</style>