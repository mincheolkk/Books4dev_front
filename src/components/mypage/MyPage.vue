<template>
    <div>
        <v-btn @click="fetchReadBook()">readbook</v-btn>
        <v-card v-for="(result) in getReadBook.before" v-bind:key="result.isbn" >
                <img :src="result.thumbnail" alt="image"/>

        
        <p>{{result.title}}</p></v-card>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import ApiService from '..'

export default {
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

    }
}
</script>

<style>

</style>