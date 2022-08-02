<template>
    <div>
        <all-book-filter />
    <v-card v-for="(result) in getResultList" v-bind:key="result.isbn" class="shadow">
        <img :src="result.thumbnail" alt="image" class="shadow"/>
        
        <p>{{result.title}}</p>
        <p>평점 :  {{result.avgStar}}</p>
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
    <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
        <div slot="no-more" style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;">더 이상 불러올 책이 없습니다 :)</div>
    </infinite-loading> -->
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'
import { Chart, registerables } from 'chart.js'
import ListChart from './ListChart.vue'
import AllBookFilter from './AllBookFilter.vue'

// import InfiniteLoading from 'vue-infinite-loading'
// import axios from 'axios';

Chart.register(...registerables)


export default {   
 
  components:{
      ListChart,
      AddReadBook,
      AddWish,
      AllBookFilter
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
      }
      
    }
  },
  computed: {
        ...mapGetters([
            "getResultList"
        ])
    },
  async created() {
    this.allBooks();
    // this.infiniteHandler();
  },

  methods: {
         async allBooks() {
           await this.$store.dispatch("fetchAllBooks")
        },

        wishBook() {
            console.log
        },

        // async infiniteHandler($state) {
        //   await axios.get('http://localhost:8081/test/all/' + (this.limit))
        //   .then(data => {
        //     setTimeout(() => {
        //       console.log("timeOut")
        //       console.log(data);
        //       this.books = data.body

        //       if(data.length) {
        //         this.books = this.books.concat(data)
        //         $state.loaded()
        //         this.limit += 1
        //         console.log("affff", this.books.length, this.limit)
        //       }
        //     }, 1000)
        //   })
        // }
    }, 
}
</script>

<style>
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>