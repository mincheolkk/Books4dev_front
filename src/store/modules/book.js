import ApiService from "@/"

export default {
    state: {
        resultList: [],
        searchList: [],
        registedList: [],
        kakaoData: "",
        readBook: {},
        wishBookList: [],
    },

    getters: {
        getResultList: (state) => {
            return state.resultList;
        },
        getSearchList: (state) => {
            return state.searchList;
        },
        getRegistedList: (state) => {
            return state.registedList;
        },
        getReadBook: (state) => {
            return state.readBook;
        },
        getWishBook: (state) => {
            return state.wishBookList;
        },
    },

    mutations: {
        setResultList(state, resultList) {
            state.resultList = resultList;
        },
        setSearchList(state, searchList) {
            state.searchList = searchList;
        },
        setRegistedList(state, searchRegistedList) {
            state.registedList = searchRegistedList;
        },
        setReadBook(state, res) {
            state.readBook = res;
        },
        setWishBook(state, res) {
            state.wishBookList = res;
        },
    },

    actions: {
        async fetchAllBooks({commit}){
            const res = await ApiService.get('/test/all');
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            return resultBook;
        },
        
        async searchBook ({commit}, param) {
            // 등록된 책 가져오기
            const resSec  = await ApiService.get(`/search/readbook?query=${param}`);
            const registeredList = resSec.data;
            commit("setRegistedList", registeredList);
            
            const isbnList = [];
            for (let i = 0; i < registeredList.length; i++) {
                isbnList.push(registeredList[i].isbn);
                console.log("store isbnList = " + isbnList);
            }
      
            // 책 검색 가져오기
            const res = await ApiService.get(`/todo?query=${param}`);
            const searchBook = res.data.documents;
      
            // 중복 제거
            for (let i=searchBook.length-1; i>=0; i--) {
                if(isbnList.includes(searchBook[i].isbn)){
                    searchBook.splice(i,1);
                }
            }
            commit("setSearchList",searchBook);            
        },
        async saveWishList(request) {
            ApiService.post(`/book/wish`, request);
        },
      
        async filterAllBooks({commit}, param) {
            const res = await ApiService.get(`/test/all${param}`);
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            return resultBook;
        },
        async fetchReadBook({ commit }) {
            const fetchData = await ApiService.getWithToken("/test/readBook");
            commit("setReadBook", fetchData.data);
        },
      
        async fetchWishBook({ commit }) {
            const fetchData = await ApiService.getWithToken("/test/wish");
            commit("setWishBook", fetchData.data);
        },
    } 
}