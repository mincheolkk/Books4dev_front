<template>
    <div class="search-base">
        <div class="first-text">검색 리스트</div>
    <v-card v-for="item in getSearchList" v-bind:key="item.isbn" class="card-search shadow">
        <div class="search-zero">
            <img :src="item.thumbnail" alt="image" class="search-img shadow"/>
            <div class="search-detail">
                <h3>{{item.title}}</h3>
                <h4 class="search-authors">출판사 : {{item.publisher}}</h4>
                <h4 class="search-authors">지은이 : {{item.authors}}</h4>
                <h4 class="search-authors">가격 : {{item.price}}</h4>

                <!-- <add-read-book :bookData={item} />
                <add-wish :isbn="item.isbn" :thumbnail="item.thumbnail" :title="item.title" /> -->
            </div>
        </div>
        <div class="plus-button">
            <v-spacer></v-spacer>
            <add-read-book :bookData={item} />
            <add-wish :isbn="item.isbn" :thumbnail="item.thumbnail" :title="item.title" />
        </div>

    </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddReadBook from './AddReadBook.vue'
import AddWish from './AddWish.vue'

export default {
    name:"SearchList",
    computed: {
        ...mapGetters([
            "getSearchList"
        ])
    },
    components: {
        AddReadBook,
        AddWish
    },
    methods: {

    }
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
.search-base {
    /* height: 300px; */
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
</style>