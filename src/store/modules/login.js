import ApiService from "@/"


export default {
    state: {
        loginMember: null,
    },

    getters: {
        getLoginMember(state) {
            return state.loginMember;
        },
        isLoggedIn(state) {
            return state.loginMember !== null;
        },
    },

    mutations: {
        setLoginMember(state, res) {
            state.loginMember = res;
        },
        setLogOutMember(state) {
            state.loginMember = null;
        },
    },

    actions:{
        async fetchLoginMember({ commit }) {
            const { res } = await ApiService.getWithToken(`http://localhost:8081/me`);
            commit("setLoginMember", res);
            return res;
        },
      
        async fetchLogOutMember({ commit }) {
            await ApiService.getWithToken(`http://localhost:8081/out`)
            commit("setLogOutMember");
        },
    }
}