import Vue from "vue";
import VueRouter from "vue-router";
import BookList from "./components/book/BookList";
import SearchList from './components/book/SearchList';
import SelectPosition from './components/mypage/SelectPosition'
import GetRefreshToken from './components/login/GetRefreshToken'
import MyWishBook from './components/mypage/MyWishBook'
import MyReadBook from './components/mypage/MyReadBook'
import ChangePosition from './components/mypage/ChangePosition'
import LoginPage from './components/login/LoginPage'
import DetailBook from './components/book/DetailBook'

Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes:[
        { path: '/', component: BookList},
        { path: "/search", component: SearchList},
        { path: "/member/selectPosition", component: SelectPosition},
        { path: "/init", component:GetRefreshToken},

        { path: "/mypage", component:MyReadBook,},
        { path: "/mywish", component:MyWishBook},
        { path: "/member/changePosition", component: ChangePosition},
        { path: "/login", component: LoginPage},
        { path: "/book/:id", component: DetailBook},
    ],
    scrollBehavior() {
      return { top: 0}
    },

})

