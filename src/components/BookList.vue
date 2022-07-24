<template>
    <div>
        
    <v-card v-for="(result) in this.books" v-bind:key="result.detailData.isbn" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        
        <p>{{result.detailData.title}}</p>
        <list-chart v-bind:key="result.detailData.isbn" :isbn="result.detailData.isbn" :time="result.readTimeMap" />
        <canvas :id="result.detailData.isbn" height="50"/>
        <p></p>
        <add-dialog :bookData="result.detailData" />
        <v-spacer></v-spacer>
        <p></p>
        <add-wish v-bind:key="result.detailData.isbn" :isbn="result.detailData.isbn" :title="result.detailData.title" :thumbnail="result.detailData.thumbnail" />
        <p></p>
    </v-card>
    </div>

</template>

<script>
import AddDialog from './AddDialog.vue'
import AddWish from './AddWish.vue'
import { Chart, registerables } from 'chart.js'
import ListChart from './ListChart.vue'
Chart.register(...registerables)


export default {   
 
  components:{
      ListChart,
      AddDialog,
      AddWish
      
  },
  data() {
    return {
      books: [],
      request: {
          title:"",
          isbn:"",
          thumbnail:""
      }
      
    }
  },

  async created() {
    this.allBooks();
  },

  methods: {
         async allBooks() {
          this.books =  await this.$store.dispatch("fetchAllBooks")
        },

        wishBook() {
            console.log
        },
    },
}
</script>

<style>
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>