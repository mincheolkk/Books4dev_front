<template>
  <div class="filter-box">
    <br />
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

      v-model="sortType"
      v-on:change="onChange"

      item-text="text"
      item-value="key"
      :items=sortTypeMap
      menu-props="auto"
      placeholder="조회 순서"
      hide-details
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
    <!-- <v-btn
            color="blue darken-1"
            text
            @click="goFilter()"
          >
            조회
          </v-btn> -->


  </div>
</template>

<script>


export default {
  data() {
    return {
        memberTypeMap: [
            { key: "All", text: "모든 개발자" },
            { key: "BackEnd", text: "백엔드 개발자" },
            { key: "FrontEnd", text: "프론트 개발자" }            
        ],
        
        sortTypeMap: [
            { key: "COUNT", text: "등록 많은 순" },
            { key: "STAR", text: "평점 높은 순" }
        ],
        
        recommendTypeMap: [
            { key: "All", text: "모든 시기" },
            { key: "before", text: "취업 전" },
            { key: "after", text: "취업 후 ~ 2년" },
            { key: "twoYear", text: "취업 후 2년 ~ 5년" },
            { key: "fiveYear", text: "취업 후 5년 ~ 10년" },
            { key: "tenYear", text: "취업 후 10년 ~ "}
        ],

        memberType: "",
        sortType:"",
        recommendType:"",
        tempUrl:"",
    };
  },

  methods:{
        async createFilterUrl () {
           return "?"+"memberType="+this.memberType+
                        "&"+"sortType="+this.sortType+
                        "&"+"recommendType="+this.recommendType;
           
        },
       
       async onChange() {
        this.tempUrl = await this.createFilterUrl();

        this.$store.dispatch("filterAllBooks",this.tempUrl);
    }
  }
}
</script>

<style scoped>
.filter-box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR", "Noto Sans JP", sans-serif;
}

.filters {
  padding: 0;
  width: 10em;
  max-width: 12em;
  margin-right: 50px;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  text-align: center;
  
  
}

.filters:last-child {
  margin-right: 0;
}

.filter-box.mobile {
  margin-top: 30px;
  justify-content: center;
  margin-right: 0;
}

.filters.mobile {
  max-width: 100px;
  margin: 0 10px 15px 0;
}
</style>
