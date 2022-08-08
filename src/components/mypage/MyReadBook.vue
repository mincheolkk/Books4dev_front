<template>
  <div>
        <v-btn @click="fetchReadBook()">readbook</v-btn>
        <v-card v-for="(result) in getReadBook.before" v-bind:key="result.isbn" >
            <img :src="result.thumbnail" alt="image"/>
            <p>{{result.title}}</p>
        </v-card>

    </div>
</template>

<script>
export default {
    props:["getReadBook"]
}
</script>

<style>

</style>