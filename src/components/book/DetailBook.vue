<template>
    <div>
        <v-card class="v-card"> 
            <v-img class="icon-search" :src="require(`@/assets/back.png`)" @click="$router.go(-1)"></v-img>
            <img :src="getDetailBook.thumbnail" alt="image" class="book-img shadow"/>
                        <h2> {{this.getDetailBook.title}} </h2>

              <div class="book-info">
              <div class="h2-div">
                  <h2 class="h2-line">책 정보</h2>
              </div>
                <p> 저자 : {{getDetailBook.authors}} </p>
                <p v-if="getDetailBook.translators.length > 0"> 번역자 : {{getDetailBook.translators}} </p>

                <p> 출판날짜 : {{getDetailBook.releaseDate.substr(0,10)}} </p>
                <p> 출판사 : {{getDetailBook.publisher}} </p>
                <p> isbn : {{getDetailBook.isbn}} </p>
                <p> 정가 : {{getDetailBook.price}} </p>
               
              <div class="h2-div" >
                <h2 class="h2-line">책 소개</h2>
              </div>
                <p v-if="getDetailBook.contents.length > 1" class="infos"> {{getDetailBook.contents}} </p>
                <p v-else> 소개 글이 없습니다. </p>
            
              <div class="h2-div">
                <h2 class="h2-line"> 리뷰 </h2>
              </div>
              <div v-if="getDetailBook.count.readCount > 0">
                <p> 읽은 사람 : {{getDetailBook.count.readCount}}명 </p>
                <p v-if="getDetailBook.count.wishCount !== 0"> 관심 있는 사람 : {{getDetailBook.count.wishCount}}명 </p>
                <p class="text-bottom"> 리뷰 평점 ★ {{getDetailBook.star.avgStar}} ({{getDetailBook.count.readCount}}명) </p>
              </div>
                <h2 class="h2-line" style="margin-bottom: 10px;"> 연관 검색어 </h2>
              </div>

            <div>
              <ul class="my-ul">
                <li v-for="item in getDetailBook.topKeywordList" :key="item.keyword" class="my-li" >
                  <v-button class="like-atag cursor" @click="vuexSearch(item.keyword)"> #{{item.keyword}} </v-button>
                </li>
              </ul>
            </div>
            <div >
                <div v-if="getDetailBook.count.readCount > 0" class="chart">
                  <list-chart v-bind:key="getDetailBook.isbn" :isbn="getDetailBook.isbn" :time="getDetailBook.recommendTime" />
                  <canvas :id="getDetailBook.isbn" height="35"/>
                </div>
              <div class="plus-button">
                <div>
                  <v-img class="comment-button" :src="require(`@/assets/red-comment.svg`)" style="margin-top: 5px;"></v-img>
                </div>
                <p style="margin-left : 7px; margin-top: 7px;">{{getDetailBook.count.commentCount}}</p>
                <v-spacer></v-spacer>
                <add-wish v-bind:key="getDetailBook.isbn" :isbn="getDetailBook.isbn" class="wish-button shadow"/>
                <add-read-book v-bind:key="getDetailBook.isbn" :isbn="getDetailBook.isbn" class="add-button"/>
              </div>
            </div>
        </v-card>
        <add-comment :bookId="getDetailBook.id" />
        <comment-list :bookId="getDetailBook.id" />
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

import ListChart from './ListChart.vue'
import { Chart, registerables } from 'chart.js'
import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'
import CommentList from '../comment/CommentList.vue'
import AddComment from '../comment/AddComment.vue';


Chart.register(...registerables)


export default {

    components:{
      ListChart,
      AddReadBook,
      AddWish,
      CommentList,
      AddComment,
    },

    computed: {
        ...mapGetters([
            "getDetailBook", "getCommentList"
        ])
    },
    async beforeCreate(){
      await this.$store.dispatch("fetchDetailBook", this.$route.params.bookId);
    },

    methods:{
      async vuexSearch(keyword) {
            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            this.$store.commit("setInputText",keyword);        
            this.$store.commit('setSearchKeyword', keyword);
            this.$router.push('/search');
            await this.$store.dispatch("searchBook", keyword);
        },
    },
}
</script>

<style scoped>
.chart {
  position: relative;
  display: block;
  height: 100%; 

}
.infos {
  font-size: 17px;
  margin-right: 15px;
  margin-bottom: 0;
  color: #6d819c;
}
.plus-button {
  position: relative;
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  
}

.cursor {
  cursor: pointer;
}
.add-button {
  padding-right: 20px;
}
.like-atag {
  margin-right: 7px;
  margin-bottom: 0.875rem;
  background: white;
  border: 1px solid gray;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.875rem;
  color: gray;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}
.my-ul {
    display: flex;
    padding-left: 20px;
    overflow: hidden;
}
.my-li {
    display: inline-flex;
}

.book-info {
  float: left;
  position: relative;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
  padding: 0;
  min-width:97%
}
.book-img {
  border: 1px solid #e6e6e4;
  border-radius: 5px;
}

.text-bottom {
  
  padding: 0 0 8px 0;
  color:  #fc4c4d;
}
.h2-line {
    display: inline-block;
    font-size: 20px;
    color: #59667a;
    font-weight: 700;
}
.h2-div {
  margin-bottom: 15px;
  padding: 10px 0 8px 0;
  border-bottom: 1.5px solid #7d8e9e;
  margin-right: 20px;
}
.for-line {
  margin-top: 15px;
  padding: 10px 0 8px 0;
  border-top: 1.5px solid #7d8e9e;
  margin-right: 40px;
  margin-left: 20px;
}

.hr {
  margin-right: 20px;
  border: 0.1 lightgray;
  width: 100%;
  height: 1px;
}
.related-keyword {
  margin-left: 20px;
  text-align: left;
  width: 100px;
}
.icon-search {
  max-width: 20px;
  margin-left: 20px;
  cursor: pointer;
  margin-top: 5px;
}
.my-text{
  text-align: left;
  margin-right: 10px;
}
.comment-button{
  margin-left: 20px;
  display: block;
  max-width: 23px;
}

</style>