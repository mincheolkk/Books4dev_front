<template>
  <section > 
        <P>search Book List</P>
    <!-- <div v-for="(result) in propsdata" v-bind:key="result.documents" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        <p>{{result}}</p>
        <div>{{result.readTimeMap}}</div>
    

    </div> -->
    <div v-for="item in getSearchList" v-bind:key="item.isbn" class="shadow">
            
        <img :src="item.thumbnail" alt="image" class="shadow"/>

            <p>{{item}}</p>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name:"SearchList",
    computed: {
        ...mapGetters([
            "getSearchList"
        ])
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