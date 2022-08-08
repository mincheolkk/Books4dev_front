import ApiService from "@/"


export default {
    state: {
        loginMember: []
    },

    getters: {
        getLoginMember(state) {
            return state.loginMember;
        },
        isLoggedIn(state) {
            return state.loginMember.length !== 0;
        }
    },

    mutations: {
        setLoginMember(state, res) {
            state.loginMember = res;
        },
        setLogOutMember(state) {
            state.loginMember = [];
        }
    },

    actions:{
        async fetchLoginMember({ commit }) {
            const { res } = await ApiService.getWithToken("http://localhost:8081/me");
            commit("setLoginMember", res);
            return res;
        }
    }
}