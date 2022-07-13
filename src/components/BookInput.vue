<template>
    <div class="inputBox shadow">
        <input type="text" v-model="searchTitle" @keyup.enter="vuexSearch()" class="shadow">
        <!-- <li 
            v-for="item in getSearchList"
            v-bind:key="item.isbn"
            >
            <p>{{item}}</p>
        </li> -->
        
        
    </div>
</template>
<script>
import axios from "axios";
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
        async getSearch() {
            if (this.searchTitle.length > 0) {
            
            this.res = await axios.get('http://localhost:8080/todo?query='+this.searchTitle);        
            // this.$router.push('search')
            this.clearInput();
            return this.res;
            }
        },
        async vuexSearch() {

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
}
.inputBox input {
    height: 40px;
    width: 80%;
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
.closeModalBtn {
    color: #42b983;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>