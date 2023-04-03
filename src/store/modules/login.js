import ApiService from "@/"

export default {
    state: {
        loginMember: null,
        memberPage:"",
    },

    getters: {
        isLoggedIn(state) {
            return state.loginMember !== null;
        },
        getLoginMember(state) {
            return state.loginMember;
        },
        getMemberPage(state) {
            return state.memberPage;
        }
    },

    mutations: {
        setLoginMember(state, res) {
            state.loginMember = res;
        },
        setLogOutMember(state) {
            state.loginMember = null;
        },
        setMemberPage(state, res) {
            state.memberPage = res;
        }
    },

    actions:{
        async fetchLoginMember({ commit }) {
            const res = await ApiService.getWithToken(`https://apiis.books4dev.me/auth/me`);
            if (res.status !== 200) {
                this.$router.push('/');
            }
            commit("setLoginMember", res.data);
            return res;
        },

        async fetchMember({ commit }, id) {
            const res = await ApiService.get(`https://apiis.books4dev.me/member/${id}`);
            commit("setMemberPage", res.data);
            return res.data;
        },
      
      
        async fetchLogOutMember({ commit }) {
            await ApiService.getWithToken(`https://apiis.books4dev.me/auth/out`)
            commit("setLogOutMember");
        },
    }
}