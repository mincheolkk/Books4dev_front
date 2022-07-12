<template>
  <section > 
        <P>searchBo o k List!</P>
    <!-- <div v-for="(result) in propsdata" v-bind:key="result.documents" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        <p>{{result}}</p>
        <div>{{result.readTimeMap}}</div>
    

    </div> -->
    </section>
</template>

<script>


export default {
    props: ['propsdata'],

    methods: {
        // findBook(payload) {
        //     this.$store.dispatch("")
        // }
    }
}
</script>

<style>

</style>