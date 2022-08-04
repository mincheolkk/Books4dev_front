import Vue from "vue"
import Vuex from "vuex"
import ApiService from "./index";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        resultList: [],
        searchList: [],
        kakaoData: "",
        loginMember: []
    },

    getters: {
        getResultList: (state) => {
            console.log("mapGetter = " + state.resultList);
            return state.resultList;
        }
        ,
        getSearchList: (state) => {
            return state.searchList;
        },
        getLoginMember(state) {
            return state.loginMember;
        },
        isLoggedIn(state) {
            return state.loginMember.length !== 0;
        }
    },

    mutations: {
        setResultList(state, resultList) {
            state.resultList = resultList;
        },
        setSearchList(state, searchList) {
            state.searchList = searchList;
        },
        setLoginMember(state, res) {
            state.loginMember = res;
        },
        setLogoutMember(state) {
            state.loginMember = [];
        }
    },

    actions: {
        async fetchAllBooks({commit}){
            const res = await ApiService.get('http://localhost:8081/test/all');
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            return resultBook;
        },
        async searchBook ({commit}, param) {
            const res = await ApiService.get(`http://localhost:8081/todo?query=${param}`);
            const searchBook = res.data.documents;
            commit("setSearchList",searchBook);
            return searchBook;
        },
        async saveWishList(request) {
            ApiService.post(`http://localhost:8081/book/wish`, request);
        },

        async filterAllBooks({commit}, param){
            const res = await ApiService.get(`http://localhost:8081/test/all${param}`);
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            return resultBook;
        },

        // async callKakao(){
        //     const init = fetch("/api/user/me", {headers: {
        //         'Authorization': 'Bearer ' + accessToken
        //     }})
        //     const result = await init
        //     const data = await result.json()
        //     console.log(data);
            
        // }
        async fetchLoginMember({ commit }) {
            const { res } = await ApiService.getWithToken("http://localhost:8081/me");
            commit("setLoginMember", res);
            return res;
        }
    }

})