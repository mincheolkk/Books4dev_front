import Vue from "vue";
import VueRouter from "vue-router";
import HomeHeader from "./components/HomeHeader";
import BookInput from "./components/BookInput";
import BookList from "./components/BookList";
import SearchList from './components/SearchList';
import App from './App.vue'


Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    routes:[
        { path: '/', component: App},
        { path: '/home', component: HomeHeader},
        { path: '/ho', component: BookInput},
        { path: '/hom', component: BookList},
        { path: "/search", component: SearchList}

    ]

})

