<template>
    <div class="base-size">
        <div class="first-text">개발자들이 읽은 책들</div>
    <all-book-filter class="book-filter" />
    <v-card v-for="(result) in getResultList" v-bind:key="result.isbn" class="card shadow">
        <div class="card-without-plus">
          <div class="zero">
            <img :src="result.thumbnail" @click="$router.push(`/books/${result.id}`)" alt="image" class="book-img shadow cursor"/>
            <div class="book-detail">
              <h3 @click="$router.push(`/books/${result.id}`)" class="book-title cursor">{{result.title}}</h3>
              <h4 class="authors-style"> {{result.authors}}</h4>
              <v-spacer></v-spacer>
              <p class="text-top"> 책 등록  {{result.registerCount}} </p> 
              <p class="text-bottom"> 리뷰 평점 ★ {{result.avgStar}}</p>
            </div>
          </div>

          <div class="chart">
            <list-chart v-bind:key="result.isbn" :isbn="result.isbn" :time="result.recommendTimeDto" />
            <canvas :id="result.isbn" height="35"/>
          </div>
        </div>
        <div class="plus-button">
          <v-spacer></v-spacer>
          <add-read-book v-bind:key="result.isbn" :isbn="result.isbn" class="add-button"/>
          <add-wish v-bind:key="result.isbn" :isbn="result.isbn" :title="result.title" :thumbnail="result.thumbnail" class="wish-button shadow"/>
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
            "getResultList","isLoggedIn", "getLoginMember"
        ])
  },
  async created() {
    this.allBooks();
  },

  methods: {
         async allBooks() {
           await this.$store.dispatch("fetchAllBooks")
        },

        checkLogin() {
          console.log("ss");
            if (!this.isLoggedIn) {
              alert("로그인 부탁드립니다 :)")
              location.reload();
              return this.dialog = false;
            }
        },
  }
}
</script>

<style scoped>
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
  text-overflow: ellipsis;
  /* width: 500px; */
  display: block;
  white-space: nowrap;
  -webkit-line-clamp: 3;
  max-width: 235px;
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
.card-without-plus {
  /* position: relative; */
  /* height: 600px; */
}
.chart {
  position: relative;
  display: block;
  height: 100%;
  
}
.text-top {
  border-top: 1px solid rgb(237, 237, 237);
  padding: 8px 0 0 0;

}
.text-bottom {
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 0 0 8px 0;
  color:  #fc4c4d;

}
.authors-style {
  color: gray;
  text-overflow: ellipsis;
  white-space: nowrap;
    overflow: hidden;

}

.plus-button {
  position: relative;
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  
}

.first-text {
    font-size: 22px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #141414;
    min-width: 0px;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    margin: 20px;
}

.book-title {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
    white-space: nowrap;

}
.book-filter {
}
.cursor {
  cursor: pointer;
}

/* @media screen and (max-width:768px) {
  .book-detail {
  padding: 20px 0 0 20px;
  float: left;
  position: relative;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  width: 270px;
  display: block;
  white-space: nowrap;
  -webkit-line-clamp: 3;
}
.book-title {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.zero {
  padding: 20px 0 0 20px;
  position: relative;
  /* display: inline-block !important; */

  /* width: 100%; */
/* }}  */

@media screen and (min-width: 768px) {
   .book-detail {
  padding: 20px 0 0 20px;
  float: left;
  position: relative;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  width: 270px;
  display: block;
  white-space: nowrap;
  -webkit-line-clamp: 3;
}
.book-title {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
    white-space: nowrap;

}

.zero {
  padding: 20px 0 0 20px;
  position: relative;
}

.cursor {
  cursor: pointer;
}

}
</style>