<template>
        <div>   
            <p @click="checkWish()">sss</p>
                <v-card v-for="(result) in this.getWishBook" v-bind:key="result.isbn" >
                    <!-- <img :src="result.thumbnail" alt="image"/> -->
                    <p>{{result.title}}</p>
                </v-card>
                <!-- <p>s</p> -->
        </div>

</template>

<script>
import { mapGetters } from 'vuex'


export default {
    computed: {
        ...mapGetters(
            ["getWishBook"]
        )
    },
    methods: {
        checkWish() {
            console.log("checkWish() + " + this.getWishBook);
        }
    },
    async beforeCreate() {
        console.log("wish book");
        await this.$store.dispatch("fetchWishBook")
    }
    ,
    created() {
        console.log("getWishBook = " + this.getWishBook )
    }

}
</script>

<style>

</style>