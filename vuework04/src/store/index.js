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
    addUser (state, {name, email, password}) {
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
    addUser ({commit}, {name, email, password}) {
      firebase
        .auth ()
        .createUserWithEmailAndPassword (email, password)
        .then (users => {
          console.log (users);
          alert ('Created user!!'), commit ('addUser', {
            name,
            email,
            password,
          });
        })
        .catch (error => {
          this.error = error.message;
        });
    },
    logIn ({commit}, {email, password}) {
      firebase
        .auth ()
        .signInWithEmailAndPassword (email, password)
        .then (user => {
          console.log (user), commit ('logIn', {email, password});
        })
        .catch (error => {
          this.error = error.message;
          alert (this.error);
        });
    },
  },
  modules: {},
});
