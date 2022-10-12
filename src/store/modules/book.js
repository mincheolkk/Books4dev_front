import ApiService from "@/"

export default {
    state: {
        resultLists: [],
        searchList: [],
        kakaoData: "",
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
            state.resultList = resultList;
        },
        setSearchList(state, searchList) {
            state.searchList = searchList;
        }
    },

    actions: {
        async fetchAllBooks(){
            const res = await ApiService.get('http://localhost:8081/test/all');
            console.log(res);
            const resultList = res.data.resultList;
            return resultList;
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
    } 
}