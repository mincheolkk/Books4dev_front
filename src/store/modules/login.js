import ApiService from "@/"


export default {
    state: {
        loginMember: null,
    },

    getters: {
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
            const res = await ApiService.getWithToken(`http://localhost:8084/me`);
            if (res.status !== 200) {
                this.$router.push('/');
            }
            commit("setLoginMember", res);
            return res;
        },
      
        async fetchLogOutMember({ commit }) {
            await ApiService.getWithToken(`http://localhost:8084/out`)
            commit("setLogOutMember");
        },
    }
}