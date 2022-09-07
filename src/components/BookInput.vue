<template>
    <div class="input-zero">
        <div class="input-first">
            <label class="input-label">
             <v-img class="icon-search" :src="require(`@/assets/search-icon.png`)" @click="vuexSearch()"></v-img>
             <p></p>
            <input type="text" v-model="searchTitle" placeholder="읽거나 보고싶은 개발 책을 검색해주세요" @keyup.enter="vuexSearch()" class="input-input shadow">        
            </label>
        </div>
    </div>

</template>
<script>
// import axios from "axios";
import { mapGetters } from 'vuex';


export default {
    components: {

    },

    computed: {
        ...mapGetters([
            "getSearchList"
        ])
    },

    data() {
        return {
            searchTitle: "",
            res:""
        }
    },
    methods: {

        clearInput() {
        // input 박스 초기화 방법
            this.searchTitle = '';
        }
        ,
        // async getSearch() {
        //     if (this.searchTitle.length > 0) {
            
        //     this.res = await axios.get('http://localhost:8081/todo?query='+this.searchTitle);        
        //     // this.$router.push('search')
        //     this.clearInput();
        //     return this.res;
        //     }
        // },
        async vuexSearch() {
            if (this.searchTitle.length < 1){
                return;
            }
            this.res = await this.$store.dispatch("searchBook", this.searchTitle );
            this.$router.push('search').catch(()=>{});
        }
    },
}
</script>
<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    width: 100%;
}
.inputBox input {
    height: 40px;
    width: 80%;
    border-style: none;
    font-size: 0.9rem;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.input-zero {
    position: relative;
    width: 60%;
}
.input-first {
    margin: 12px 0;
}
.input-label {
    background: #f0f0f0;
    border: 1px solid rgba(0, 0, 0, 0.5%);
    border-radius: 8px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    padding: 0 11px;
    height: 40px;
}
.input-input {
    flex: 1;
    min-width: 0;
    height: 100%;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: #141414;
    /* caret-color: #1E9EFF; */
}
.icon-search {
    max-width: 15px;
    margin-right: 10px;
    cursor: pointer;

}
@media screen and (max-width:768px) {
    .placeholder {
        color: red;
    }
}
</style>