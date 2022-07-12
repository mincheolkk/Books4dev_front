import Vue from "vue";
import VueRouter from "vue-router";
import HomeHeader from "./components/HomeHeader";
import BookInput from "./components/BookInput";
import BookList from "./components/BookList";
import SearchList from "./components/SearchList";


Vue.use(VueRouter);

export const router = new VueRouter({

    routes:[
        { path: '/', component: HomeHeader},
        { path: '/', component: BookInput},
        { path: '/', component: BookList},
        { path: '/search', component: SearchList}

    ]

})

