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
        commentList: [],
        pageCount:"",
        totalCount:"",
        searchCondition:null,
        inputText:"",
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
        getCommentList: (state) => {
            return state.commentList;
        },
        getPageCount: (state) => {
            return state.pageCount;
        },
        getSearchCondition: (state) => {
            return state.searchCondition;
        },
        getTotalCount: (state) => {
            return state.totalCount;
        },
        getInputText: (state) => {
            return state.inputText;
        }
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
        setCommentList(state, res) {
            state.commentList = res;
        },
        setPageCount(state, res) {
            state.pageCount = res;
        },
        setTotalCount(state, res) {
            state.totalCount = res;
        },
        setSearchCondition(state, res) {
            state.searchCondition = res;
        },
        setInputText(state, res) {
            state.inputText = res;
        }
    },

    actions: {        
        async filterAllBooks({commit}, param) {
            
            const res = await ApiService.get(`https://apiis.books4dev.me/book/all${param}`);
            commit("setResultList", res.data.content);
            commit("setPageCount", res.data.totalPages);
            commit("setTotalCount", res.data.totalElements);
        },

        async searchBook ({commit}, param) {
            // 내 서비스에 등록된 책 가져오기
            const resSec  = await ApiService.get(`https://apiis.books4dev.me/book/search/readbook?query=${param}`);
            const registeredList = resSec.data;
            commit("setRegistedList", registeredList);
            
            const isbnList = [];
            for (let i = 0; i < registeredList.length; i++) {
                isbnList.push(registeredList[i].isbn);
            }
      
            // 카카오 책 검색 가져오기
            const res = await ApiService.get(`https://apiis.books4dev.me/kakao/search?query=${param}`);
            const searchBook = res.data.documents;
      
            // 중복 제거
            for (let i=searchBook.length-1; i>=0; i--) {
                if(isbnList.includes(searchBook[i].isbn)){
                    searchBook.splice(i,1);
                }
            }
            commit("setSearchList",searchBook);    
        },

        async fetchMemberReadBook({ commit }, id){
            const fetchData = await ApiService.get(`https://apiis.books4dev.me/member/${id}/readBook/`);
            commit("setReadBook", fetchData.data);
        },
      
        async fetchMemberWishBook({ commit }, id){
            const fetchData = await ApiService.get(`https://apiis.books4dev.me/member/${id}/wishBook`);
            commit("setWishBook", fetchData.data);
        },

        async fetchDetailBook({ commit }, id) {
            const fetchData = await ApiService.get(`https://apiis.books4dev.me/book/${id}`)
            commit("setDetailBook", fetchData.data);
        },

        async fetchPopularKeyword({ commit }) {
            const fetchData = await ApiService.get(`https://apiis.books4dev.me/book/popular`);
            commit("setPopularKeyword", fetchData.data);
        },
        
        async fetchComment({ commit }, id) {
            const fetchData = await ApiService.get(`https://apiis.books4dev.me/book/${id}/comments`)
            commit("setCommentList", fetchData.data);
        },
    } 
}