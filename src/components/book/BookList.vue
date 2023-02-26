<template>
    <div class="base-size">
        <div class="first-text">
          개발자들이 읽은 책들
            <v-img class="switch-view" :src="require(`@/assets/list.png`)" @click="switchTileView()" v-if="listView"></v-img>
            <v-img class="switch-view" :src="require(`@/assets/grid.png`)" @click="switchListView()" v-if="tileView"></v-img>
        </div>

    <all-book-filter class="book-filter" />
    <v-card v-for="(result) in getResultList" v-bind:key="result.isbn" class="card shadow" >
        <div class="card-without-plus" v-if="listView">
          <div class="zero">
            <img :src="result.thumbnail" @click="$router.push(`/books/${result.id}`)" alt="image" class="book-img shadow cursor shadow"/>
            <div class="book-detail">
              <h3 @click="$router.push(`/books/${result.id}`)" class="book-title cursor">{{result.title}}</h3>
              <h4 class="authors-style"> {{result.authors}}</h4>
              <v-spacer></v-spacer>
              <p class="text-top"> 읽은 사람 {{result.readCount}}명 </p> 
              <p class="text-bottom"> 리뷰 평점 ★ {{result.avgStar}}</p>
            </div>
          </div>

          <div class="chart">
            <list-chart v-bind:key="result.isbn" :isbn="result.isbn" :time="result.recommendTime" />
            <canvas :id="result.isbn" height="35"/>
          </div>
        </div>
        <div class="plus-button" v-if="listView">
          <v-spacer></v-spacer>
          <add-wish v-bind:key="result.isbn" :isbn="result.isbn" class="wish-button shadow"/>
          <add-read-book v-bind:key="result.isbn" :isbn="result.isbn" class="add-button"/>
        </div>
    </v-card>
    <book-tile :resultList=getResultList v-if="tileView" />
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'
import { Chart, registerables } from 'chart.js'
import ListChart from './ListChart.vue'
import AllBookFilter from './AllBookFilter.vue'
import BookTile from './BookTile.vue'

Chart.register(...registerables)


export default {   
 
  components:{
      ListChart,
      AddReadBook,
      AddWish,
      AllBookFilter,
      BookTile,
  },

  data() {
    return {
      books: [],
      request: {
          title:"",
          isbn:"",
          thumbnail:""
      },
      listView: true,
      tileView: false,
  }},
    
  computed: {
    ...mapGetters([
        "getResultList"
    ])
  },
  async created() {
    await this.$store.dispatch("fetchAllBooks")
  },
  
  methods: {
    switchTileView() {
      this.listView = false;
      this.tileView = true;
    },
    switchListView() {
      this.listView = true;
      this.tileView = false;
    }
  }
}
</script>

<style scoped>

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
.book-img {
  float: left;
  position: relative;
  overflow: hidden;
  border: 1px solid #e6e6e4;
  border-radius: 5px;
}
.zero {
  padding: 20px 0 0 20px;
  position: relative;
  display: inline-block !important;
  width: 100%;
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
    justify-content: left;
    margin: 0 20px 20px 20px;
    text-align: left;
}

.switch-view {
  max-width: 25px;
  cursor: pointer;  
  align-self: center;
  display: inline-block;
  float: right !important;
  margin-right: 0px !important;
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
  margin-bottom: 1px;
}
.cursor {
  cursor: pointer;
}
.add-button {
  padding-right: 20px;
}

@media screen and (min-width: 768px) {
.switch-view {
  margin-right: 5px !important;
}
}

</style>