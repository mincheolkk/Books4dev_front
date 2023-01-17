<template>
    <div>
        <div class="first-text">검색 리스트</div>
        <v-card v-for="(result) in getRegistedList" v-bind:key="result.isbn" class="card-search shadow">
          <div>
            <div class="search-zero">
            <img :src="result.thumbnail" @click="$router.push(`/books/${result.id}`)" alt="image" class="book-img shadow cursor"/>
            <div class="book-detail">
              <h3 class="book-title cursor" @click="$router.push(`/books/${result.id}`)" >{{result.title}}</h3>
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
          <add-read-book :isbn="result.isbn" class="add-button"/>
          <add-wish v-bind:key="result.isbn" :isbn="result.isbn" :title="result.title" :thumbnail="result.thumbnail" />
        </div>
    </v-card>

    <v-card v-for="item in this.getSearchList" v-bind:key="item.isbn" class="card-search shadow">
        <div class="search-zero">
            <img :src="item.thumbnail" alt="image" class="search-img shadow"/>
            <div class="search-detail">
                <h3>{{item.title}}</h3>
                <h4 class="search-authors">출판사 : {{item.publisher}}</h4>
                <h4 class="search-authors">지은이 : {{item.authors}}</h4>
                <h4 class="search-authors">정가 : {{item.price}}원</h4>

                <!-- <add-read-book :bookData={item} />
                <add-wish :isbn="item.isbn" :thumbnail="item.thumbnail" :title="item.title" /> -->
            </div>
        </div>
        <div class="plus-button">
            <v-spacer></v-spacer>
            <add-read-book :bookData={item} />
            <add-wish v-bind:key="item.isbn" :isbn="item.isbn" :thumbnail="item.thumbnail" :title="item.title" />
        </div>

    </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'
import ListChart from './ListChart.vue'


export default {
    name:"SearchList",
    computed: {
        ...mapGetters([
            "getSearchList", 
            "getRegistedList"
        ])
    },
    data() {
        return {
            fixedSearchList: [],
            isbnList: []
       }
    },
    
    components: {
        AddReadBook,
        AddWish,
        ListChart
    },
    methods: {

    },

}
</script>

<style scoped>
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
}
.card-search {
    width: 100% ;
    /* height: 290px;  */

}

.search-zero {
  padding: 20px 0 0 20px;
  position: relative;
  display: inline-block !important;
  width: 100%;
  /* height: 250px; */
}
.search-img { 
  float: left;
  position: relative;
  overflow: hidden;
}
.search-detail {
  padding: 0 0 0 40px;
  float: left;
  position: relative;
  padding-top: 20px;
  overflow: hidden;
  text-align: left;
}
.search-authors {
  color: gray;
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
    text-overflow: ellipsis;
    display: flex;
    margin: 20px;
}
.book-img {
  float: left;
  position: relative;
  overflow: hidden;
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
}
.authors-style {
  color: gray;
  text-overflow: ellipsis;
  white-space: nowrap;
    overflow: hidden;
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
.book-title {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.cursor {
  cursor: pointer;
}
</style>