export default {
    namespaced: true,
    state: {
      isAuthenticated: false
    },
    mutations: {
      login(state) {
        state.isAuthenticated = true;
      }
    },
    actions: {},
    getters: {}
  };
  