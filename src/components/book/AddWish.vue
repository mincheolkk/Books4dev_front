<template>
  <v-btn 
        text
        x-large
        @click="wishBook()"
        ><p> + 관심있는 책
        </p></v-btn>
</template>

<script>
import ApiService from "../../index";

export default {
    props:['isbn','title','thumbnail'],
    
    methods:{
        wishBook(){
            const request = {
                isbn: this.isbn,
                title: this.title,
                thumbnail: this.thumbnail
            };
            console.log(request);
            // this.$store.dispatch("saveWishList",request);
            ApiService.post(`http://localhost:8080/book/wish`, request);
            }
        }
    }

</script>

<style>

</style>