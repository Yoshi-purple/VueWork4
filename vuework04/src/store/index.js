import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    logIn (state, {email, password}) {
      firebase
        .auth ()
        .signInWithEmailAndPassword (email, password)
        .then (user => {
          console.log (user);
        })
        .catch (error => {
          this.error = error.message;
          alert (this.error);
        });
    },
    updateUser (state, {displayName, email, password}) {
      const user = {
        displayName,
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
    logIn ({commit}, user) {
      commit ('logIn', user);
    },
    updateUser ({commit}, user) {
      commit ('updateUser', user);
    },
  },
  modules: {},
});
