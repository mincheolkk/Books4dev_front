import Vue from "vue"
import Vuex from "vuex"
import book from "./modules/book"
import login from "./modules/login"
import snackBar from "./modules/snackBar";


Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        book,
        login,
        snackBar
    }
});