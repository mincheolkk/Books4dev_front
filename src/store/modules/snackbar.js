export default {
    state: {
        snackbarState: false,
        snackbarText: ""
    },

    getters: {
        fetchedSnackBarState(state) {
            return state.snackbarState;
        },
        fetchedSnackBarText(state) {
            return state.snackbarText;
        }
    },

    mutations: {
        setSnackbarState(state, snackbarState) {
            state.snackbarState = snackbarState;
        },
        setSnackbarText(state, snackbarText) {
            state.snackbarText = snackbarText;
        }
    },

    actions: {
        async updateSnackbarState({ commit }, snackbarState) {
            commit("setSnackbarState", snackbarState);
        },
      
        async updateSnackbarText({ commit }, snackbarText) {
            commit("setSnackbarState", true);
            commit("setSnackbarText", snackbarText);
        },

        async closeSnackbarAfterTimeout( { commit }, timeout) {
            setTimeout(() => {
                commit("setSnackbarState", false)
            }, timeout)
        } 
    }
}