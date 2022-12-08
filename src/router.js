import Vue from "vue";
import VueRouter from "vue-router";
// import HomeHeader from "./components/HomeHeader";
// import BookInput from "./components/BookInput";
import BookList from "./components/book/BookList";
import SearchList from './components/book/SearchList';
import SelectPosition from './components/login/SelectPosition'
import NewLogin from './components/login/NewLogin'
// import App from './App.vue'
// import MyPage from './components/mypage/MyPage'
import MyWishBook from './components/mypage/MyWishBook'
import MyReadBook from './components/mypage/MyReadBook'
import ChangePosition from './components/mypage/ChangePosition'


Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes:[
        // { path: '/', component: App},
        // { path: '/home', component: HomeHeader},
        // { path: '/home', component: BookInput},
        { path: '/', component: BookList},
        { path: "/search", component: SearchList},
        { path: "/selectPosition", component: SelectPosition},
        { path: "/init", component:NewLogin},
        { path: "/mypage", 
          component:MyReadBook,
        },
        { path: "/mywish", component:MyWishBook},
        { path: "/changePosition", component: ChangePosition}
        // { path: "/myread", component:My}

    ]

})

