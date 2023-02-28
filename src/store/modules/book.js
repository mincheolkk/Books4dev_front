import ApiService from "@/"

export default {
    state: {
        resultList: [],
        searchList: [],
        registedList: [],
        kakaoData: "",
        readBook: {},
        wishBookList: [],
        detailBook: {},
        searchKeyword: "",
        popularKeyword: [],
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
        getDetailBook: (state) => {
            return state.detailBook;
        },
        getSearchKeyword: (state) => {
            return state.searchKeyword;
        },
        getPopularKeyword: (state) => {
            return state.popularKeyword;
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
        setDetailBook(state, res) {
            state.detailBook = res;
        },
        setSearchKeyword(state, res) {
            state.searchKeyword = res;
        },
        setPopularKeyword(state, res) {
            state.popularKeyword = res;
        },
        
    },

    actions: {
        async fetchAllBooks({commit}){
            const res = await ApiService.get(`http://localhost:8084/book/all`);
            const resultBook = res.data.body;
            commit("setResultList", resultBook);
            commit("setFilterCount")
            return resultBook;
        },
        
        async searchBook ({commit}, param) {
            // 등록된 책 가져오기
            const resSec  = await ApiService.get(`http://localhost:8084/book/search/readbook?query=${param}`);
            const registeredList = resSec.data;
            commit("setRegistedList", registeredList);
            
            const isbnList = [];
            for (let i = 0; i < registeredList.length; i++) {
                isbnList.push(registeredList[i].isbn);
            }
      
            // 책 검색 가져오기
            const res = await ApiService.get(`http://localhost:8084/kakao/search?query=${param}`);
            const searchBook = res.data.documents;
      
            // 중복 제거
            for (let i=searchBook.length-1; i>=0; i--) {
                if(isbnList.includes(searchBook[i].isbn)){
                    searchBook.splice(i,1);
                }
            }
            commit("setSearchList",searchBook);            
        },

        async filterAllBooks({commit}, param) {
            const res = await ApiService.get(`http://localhost:8084/book/all${param}`);
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            
            return resultBook;
        },
        async fetchReadBook({ commit }) {
            const fetchData = await ApiService.getWithToken(`http://localhost:8084/member/readBook`);
            commit("setReadBook", fetchData.data);
        },
      
        async fetchWishBook({ commit }) {
            const fetchData = await ApiService.getWithToken(`http://localhost:8084/member/wish`);
            commit("setWishBook", fetchData.data);
        },

        async fetchDetailBook({ commit }, id) {
            const fetchData = await ApiService.get(`http://localhost:8084/book/${id}`)
            commit("setDetailBook", fetchData.data);

            return fetchData.data;

        },

        async fetchPopularKeyword({ commit }) {
            const fetchData = await ApiService.get(`http://localhost:8084/book/popular`);
            commit("setPopularKeyword", fetchData.data);
        },

    } 
}