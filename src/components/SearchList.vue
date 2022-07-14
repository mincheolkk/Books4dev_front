<template>
  <section> 
        <P></P>
    <!-- <div v-for="(result) in propsdata" v-bind:key="result.documents" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        <p>{{result}}</p>
        <div>{{result.readTimeMap}}</div>
    

    </div> -->
    <v-card v-for="item in getSearchList" v-bind:key="item.isbn" style="width: 70%" height="300" class="shadow">
        <v-card-title>{{item.title}}</v-card-title>

        <!-- <v-row align="left"> -->
        <img :src="item.thumbnail" alt="image" class="shadow"/>
        <!-- </v-row> -->

        <add-dialog :bookData={item} />
            
    </v-card>

    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import AddDialog from './AddDialog.vue'


export default {
    name:"SearchList",
    computed: {
        ...mapGetters([
            "getSearchList"
        ])
    },
    components: {
        AddDialog
    },
    methods: {
        // findBook(payload) {
        //     this.$store.dispatch("")
        // }
    }
}
</script>

<style>

</style>