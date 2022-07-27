<template>
  <section> 

    <v-card v-for="item in getSearchList" v-bind:key="item.isbn" style="width: 100%" height="350" class="shadow">
        <v-card-title>{{item.title}}</v-card-title>
        <img :src="item.thumbnail" alt="image" class="shadow"/>
        <p></p>
        <v-spacer></v-spacer>
        <add-read-book :bookData={item} />
        <v-spacer></v-spacer>
        <p></p>
        <add-wish :isbn="item.isbn" :thumbnail="item.thumbnail" :title="item.title" />
        <v-spacer></v-spacer>

        <p></p>
    </v-card>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'

export default {
    name:"SearchList",
    computed: {
        ...mapGetters([
            "getSearchList"
        ])
    },
    components: {
        AddReadBook,
        AddWish
    },
    methods: {

    }
}
</script>

<style>
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
}
</style>