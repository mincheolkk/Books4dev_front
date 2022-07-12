import Vue from "vue"
import Vuex from "vuex"
import ApiService from "./api";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // resultLists: [],
        searchList: [],
    },

    getters: {
        getResultList: (state) => {
            return state.resultList;
        }
        ,
        getSearchList: (state) => {
            return state.searchList;
        }
    },

    mutations: {
        setResultList(state, resultList) {
            console.log("muta start")
            state.resultList = resultList;
        },
        setSearchList(state, searchList) {
            console.log("muta setSearch");
            console.log(searchList);
            state.searchList = searchList;
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
        async searchBook ({commit}, param) {

            console.log(param);
            // const res = await ApiService.get('http://localhost:8080/todo?query='+payload)
            const res = await ApiService.get(`http://localhost:8080/todo?query=${param}`);

            const searchBook = res.data.documents;
            commit("setSearchList",searchBook);
            return searchBook;
            // return searchList;
        }
    }

})