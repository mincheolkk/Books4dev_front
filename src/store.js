import Vue from "vue"
import Vuex from "vuex"
import ApiService from "./api";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // resultLists: [],
    },

    getters: {
        getResultList: (state) => {
            return state.resultList;
        }
    },

    mutations: {
        setResultList(state, resultList) {
            console.log("muta start")
            state.resultList = resultList;
        } 
    },

    actions: {
        async fetchAllBooks(){
            console.log("actions 시작");
            const res = await ApiService.get('https://438d14e0-58fe-4eb2-8704-c2b65596f942.mock.pstmn.io/test');
            const resultList = res.data.resultList;

            // commit('setResultList', resultList);
            console.log("22"+resultList);
            return resultList;
        },
        async searchBook(payload) {
            console.log("search book 시작");
            
            const res = await ApiService.get('http://localhost:8080/todo?query='+payload)
            const searchList = res.data.documents
            

            console.log(searchList)            

        }
    }

})