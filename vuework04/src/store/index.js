import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use (Vuex);

export default new Vuex.Store ({
  state: {
    users: [],
    error: null,
  },
  mutations: {
    addUser (state, {email, password}) {
      firebase
        .auth ()
        .createUserWithEmailAndPassword (email, password)
        .then (alert ('Created user!!'))
        .catch (error => {
          this.error = error.message;
        });
    },
    updateUser (state, {name, email, password}) {
      const user = {
        name,
        email,
        password,
      };
      state.users.push (user);
    },
  },
  getters: {
    users (state) {
      return state.users;
    },
  },
  actions: {
    addUser ({commit}, user) {
      commit ('addUser', user);
    },
    updateUser ({commit}, user) {
      commit ('updateUser', user);
    },
  },
  modules: {},
});
