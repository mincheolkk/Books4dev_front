<template>
  <div class="filter-box">
    <v-select
      class="filters"
      v-model="memberType"
      v-on:change="onChange"
      item-text="text"
      item-value="key"
      :items=memberTypeMap
      hide-details
      placeholder="개발자 직군"
      menu-props="auto"
      single-line
    ></v-select>
    <v-select
      class="filters"
      v-model="recommendType"
      v-on:change="onChange"
      item-text="text"
      item-value="key"
      :items=recommendTypeMap
      menu-props="auto"
      placeholder="추천 시기"
      hide-details
      single-line
    ></v-select>
    <v-select
      class="filters"
      v-model="sortType"
      v-on:change="onChange"
      item-text="text"
      item-value="key"
      :items=sortTypeMap
      menu-props="auto"
      placeholder="조회 순서"
      hide-details
      single-line
      overflow="auto"
    ></v-select>
  </div>
</template>

<script>


export default {
  data() {
    return {
        memberTypeMap: [
            { key: "All", text: "모든 개발자" },
            { key: "BackEnd", text: "백엔드" },
            { key: "FrontEnd", text: "프론트" },
            { key: "DevOps", text:"DevOps"},
            { key: "AInML", text:"인공지능/머신러닝"},
            { key: "ETC", text:"기타 혹은 미정"},
        ],
        
        sortTypeMap: [
            { key: "STAR", text: "평점 높은 순" },
            { key: "COUNT", text: "많이 읽은 순" },
            { key: "WISH", text: "관심 많은 순" },
            { key: "COMMENT", text: "댓글 많은 순" },

        ],
        
        recommendTypeMap: [
            { key: "All", text: "추천 시기" },
            { key: "before", text: "취업 전" },
            { key: "after", text: "0-2년차" },
            { key: "threeYear", text: "3-5년차" },
            { key: "sixYear", text: "6년차 이상" },
            { key: "anyTime", text: "언제든 좋음"}
        ],

        memberType: "",
        sortType:"",
        recommendType:"",
        tempUrl:"",
    };
  },

  methods:{
        async createFilterUrl () {
           return "?memberType="+this.memberType+
                        "&"+"sortType="+this.sortType+
                        "&"+"recommendType="+this.recommendType;
           
        },
       
       async onChange() {
        this.tempUrl = await this.createFilterUrl();
        this.$store.commit("setSearchCondition", this.tempUrl);

        await this.$store.dispatch("filterAllBooks",this.tempUrl);
    }
  }
}
</script>

<style scoped>
.filter-box {
  display: flex;
  align-items: center;
  justify-content: left;
  font-family: "Noto Sans KR", sans-serif;
  margin-left: 20px;
}

.filters {
  padding: 0;
  margin-right: 20px;
  text-align: center;
  white-space: nowrap; 
}

</style>
