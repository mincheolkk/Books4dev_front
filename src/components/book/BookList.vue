<template>
    <div>
    <all-book-filter />
    <v-card v-for="(result) in getResultList" v-bind:key="result.isbn" class="shadow">
        <div class="zero">
          <img :src="result.thumbnail" alt="image" class="book-img shadow"/>
          <div class="book-detail">
            <h3>{{result.title}}</h3>
            <h4 class="authors-style">지은이 {{result.authors}}</h4>
            <v-spacer></v-spacer>
            <p class="text-top">평점 {{result.avgStar}} </p> 
            <p class="text-bottom">등록된 수 : {{result.registerCount}}</p>
          </div>
        </div>
        <!-- <p>개발자들이 추천 하는 시기</p> -->
        <div class="first">
        <list-chart v-bind:key="result.isbn" :isbn="result.isbn" :time="result.recommendTimeDto" />
        <canvas :id="result.isbn" height="30"/>

        <add-read-book :isbn="result.isbn" />
        <v-spacer></v-spacer>
        <p></p>
        <add-wish v-bind:key="result.isbn" :isbn="result.isbn" :title="result.title" :thumbnail="result.thumbnail" />
        <p></p>
        </div>
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
// import StarRating from '../StarRating.vue'
// import InfiniteLoading from 'vue-infinite-loading'
// import axios from 'axios';

Chart.register(...registerables)


export default {   
 
  components:{
      ListChart,
      AddReadBook,
      AddWish,
      AllBookFilter,
      // StarRating
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
.book-detail {
  padding: 0 0 0 40px;
  float: left;
  position: relative;
  padding-top: 20px;
  overflow: hidden;
  text-align: left;

}
.book-img {
  float: left;
  position: relative;
  overflow: hidden;
}
.zero {
  padding: 20px 0 0 20px;
  position: relative;
  display: inline-block !important;
      width: 100%;

}
.first {
  position: relative;
  display: block;
}
.text-top {
  border-top: 1px solid rgb(237, 237, 237);
  padding: 8px 0 0 0;

}
.text-bottom {
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 0 0 8px 0;

}
.authors-style {
  color: gray;
}
</style>