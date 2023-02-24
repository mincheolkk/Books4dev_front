<template>
<div>

    <ul class="my-ul">
        <p class="my-text"> 인기 검색어 </p>

        <li v-for="item in getPopularKeyword" :key="item.keyword" class="my-li" >
            <v-button class="like-atag" @click="vuexSearch(item.keyword)"> #{{item.keyword}} </v-button>
        </li>
    </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            "getPopularKeyword",
        ])
    },
    async created() {
        await this.$store.dispatch("fetchPopularKeyword");
    },

    methods:{
      async vuexSearch(keyword) {
            await this.$store.dispatch("searchBook", keyword);
            this.$store.commit('setSearchKeyword', keyword);
            this.$router.push('/search');
        },
    }
}
</script>

<style scoped>
.my-ul {
    display: flex;
    padding: 0px 20px;
    overflow: hidden;
}
.my-li {
    display: inline-flex;
}
.like-atag {
  /* color: gray; */
  /* text-decoration: underline; */
  cursor: pointer;
  margin-right: 10px;

  /* background-color: white; */
  color: gray;
  /* border-radius: 20px; */
  /* padding: 3px 5px; */
  /* border: 1px solid gray; */
  /* line-height: 2; */
}
.my-text{
    color: gray;
    margin-right: 10px;
}
</style>