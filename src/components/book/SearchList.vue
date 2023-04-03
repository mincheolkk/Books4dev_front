<template>
    <div>
        <popular-keyword />
        <hr class="my-hr">

        <div class="first-text">검색 리스트</div>
        <v-card v-for="(result) in getRegistedList" v-bind:key="result.isbn" class="card-search">
          <div>
            <div class="search-zero">
              <img :src="result.thumbnail" @click="$router.push(`/book/${result.id}`)" alt="image" class="book-img cursor"/>
                <div class="book-detail">
                  <h3 class="book-title cursor" @click="$router.push(`/book/${result.id}`)" >{{result.title}}</h3>
                  <h4 class="authors-style"> {{result.authors}}</h4>
                  <v-spacer></v-spacer>
                  <p class="text-top"> 읽은 사람  {{result.readCount}}명 </p> 
                  <p class="text-bottom"> 리뷰 평점 ★ {{result.avgStar}}</p>
                </div>
            </div>

          <div v-if="result.readCount > 0" class="chart">
            <list-chart v-bind:key="result.isbn" :isbn="result.isbn" :time="result.recommendTime" />
            <canvas :id="result.isbn" height="35"/>
          </div>
        </div>
        <div class="plus-button">
          <comment-dialog v-bind:key="result.isbn" :commentCount="result.commentCount" :bookId="result.id" :bookTitle="result.title" />
          <v-spacer></v-spacer>
          <add-wish v-bind:key="result.isbn" :isbn="result.isbn" :title="result.title" :thumbnail="result.thumbnail" />
          <add-read-book :isbn="result.isbn" class="add-button"/>
        </div>
    </v-card>

    <v-card v-for="info in this.getSearchList" v-bind:key="info.isbn" class="card-search shadow">
        <div class="search-zero">
            <img :src="info.thumbnail" alt="image" class="book-img "/>
            <div class="book-detail">
                <h3 class="book-title">{{info.title}}</h3>
                <h4 class="search-authors">출판사 : {{info.publisher}}</h4>
                <h4 class="search-authors">지은이 : {{info.authors}}</h4>
                <h4 class="search-authors">정가 : {{info.price}}원</h4>
            </div>
        </div>
        <div class="plus-button">
            <v-spacer></v-spacer>
            <add-wish  :bookData="info" />
            <add-read-book :info={info} />
        </div>
        <hr class="bottom-hr">
    </v-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'
import ListChart from './ListChart.vue'
import PopularKeyword from './PopularKeyword.vue'
import CommentDialog from '../comment/CommentDialog.vue'


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
        ListChart,
        PopularKeyword,
        CommentDialog,
    },
    methods: {

    },
    beforeUpdate() {
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth'});
    }
}
</script>

<style scoped>
.card-search {
    width: 100% ;
}

.search-zero {
  padding: 20px 0 0 20px;
  position: relative;
  display: inline-block !important;
  width: 100%;
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
  max-width: 64%;
}
.search-authors {
   overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: nowrap;
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
    margin: 0 20px 20px 20px;
}
.book-img {
  float: left;
  position: relative;
  overflow: hidden;
  border: 1px solid #e6e6e4;
  border-radius: 5px;
}
.book-detail {
  padding: 10px 20px 0 20px;
  float: left;
  position: relative;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  -webkit-line-clamp: 3;
  max-width: 64%;
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
.my-hr {    
    height: 1px;
    background: #e5e5e5;
    border: none;
    margin: 0 20px; 
    margin-top: 0px; 
    margin-bottom: 15px;
}
.comment-button{
  margin-left: 20px;
  display: block;
  max-width: 23px;
}
</style>