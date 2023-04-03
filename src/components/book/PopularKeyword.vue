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
            this.$store.commit("setInputText",keyword);        
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
  cursor: pointer;
  margin-right: 10px;
  color: gray;
}
.my-text{
    color: gray;
    margin-right: 10px;
}
</style>