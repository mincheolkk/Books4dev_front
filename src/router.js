import Vue from "vue";
import VueRouter from "vue-router";
// import HomeHeader from "./components/HomeHeader";
// import BookInput from "./components/BookInput";
import BookList from "./components/BookList";
import SearchList from './components/SearchList';
import SelectPosition from './components/SelectPosition'
import NewLogin from './components/NewLogin'
// import App from './App.vue'


Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    routes:[
        // { path: '/', component: App},
        // { path: '/home', component: HomeHeader},
        // { path: '/home', component: BookInput},
        { path: '/', component: BookList},
        { path: "/search", component: SearchList},
        { path: "/selectPosition", component: SelectPosition},
        { path: "/init", component:NewLogin}

    ]

})

