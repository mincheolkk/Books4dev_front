import Vue from "vue"
import Vuex from "vuex"
import book from "./modules/book"
import login from "./modules/login"



Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        book,
        login,
    }
});