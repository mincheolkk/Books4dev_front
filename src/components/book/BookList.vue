<template>
    <div>
    <all-book-filter />
    <v-card v-for="(result) in getResultList" v-bind:key="result.isbn" class="shadow">
        <img :src="result.thumbnail" alt="image" class="shadow"/>
        
        <p>{{result.title}}</p>
         <v-row justify="center">
        <p>평점</p> <p> </p><star-rating :avgStar="result.avgStar" /><p> {{result.avgStar}}/5</p></v-row>

        <p>등록된 수 : {{result.registerCount}}</p>
        <list-chart v-bind:key="result.isbn" :isbn="result.isbn" :time="result.recommendTimeDto" />
        <canvas :id="result.isbn" height="50"/>
        <p></p>
        <add-read-book :isbn="result.isbn" />
        <v-spacer></v-spacer>
        <p></p>
        <add-wish v-bind:key="result.isbn" :isbn="result.isbn" :title="result.title" :thumbnail="result.thumbnail" />
        <p></p>
    </v-card>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'
import { Chart, registerables } from 'chart.js'
import ListChart from './ListChart.vue'
import AllBookFilter from './AllBookFilter.vue'
import StarRating from '../StarRating.vue'
// import InfiniteLoading from 'vue-infinite-loading'
// import axios from 'axios';

Chart.register(...registerables)


export default {   
 
  components:{
      ListChart,
      AddReadBook,
      AddWish,
      AllBookFilter,
      StarRating
      // InfiniteLoading
      
  },
  data() {
    return {
      books: [],
      limit: 1,
      request: {
          title:"",
          isbn:"",
          thumbnail:""
      },
     
    }},
    
  computed: {
        ...mapGetters([
            "getResultList"
        ])
    },
  async created() {
    this.allBooks();
  },

  methods: {
         async allBooks() {
           await this.$store.dispatch("fetchAllBooks")
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