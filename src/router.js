import Vue from "vue";
import VueRouter from "vue-router";
import BookList from "./components/book/BookList";
import SearchList from './components/book/SearchList';
import GetRefreshToken from './components/login/GetRefreshToken'
import ChangePosition from './components/mypage/ChangePosition'
import LoginPage from './components/login/LoginPage'
import DetailBook from './components/book/DetailBook'
import ChangeNickname from './components/mypage/ChangeNickname'
import MemberReadBook from './components/mypage/MemberReadBook'
import MemberWishBook from './components/mypage/MemberWishBook'



Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes:[
        { path: '/', component: BookList},
        { path: "/search", component: SearchList},
        { path: "/member/selectPosition", component: ChangePosition},
        { path: "/init", component:GetRefreshToken},
        { path: "/member/changePosition", component: ChangePosition},
        { path: "/login", component: LoginPage},
        { path: "/book/:bookId", component: DetailBook},
        { path: "/member/changeNickname", component: ChangeNickname},
        { path: "/member/:id", component: MemberReadBook},
        { path: "/member/wishBook/:id", component: MemberWishBook},

    ],
    scrollBehavior(to) {

        if (to.hash) {
          return { selector: to.hash };
        }
        
        return { x: 0, y: 0 };
    }
    

})

