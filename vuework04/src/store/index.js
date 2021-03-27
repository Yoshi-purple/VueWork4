import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);

export default new Vuex.Store ({
  state: {
    user: [],
  },
  mutations: {
    addUser (state, {name, email, password}) {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      state.user.push (user);
    },
  },
  getters: {},
  actions: {
    addUser ({commit}, user) {
      commit ('addUser', user);
    },
  },
  modules: {},
});
