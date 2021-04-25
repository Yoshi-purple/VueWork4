import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

Vue.use (Vuex);

export default new Vuex.Store ({
  state: {
    users: [],
    loginUser: {},
    error: null,
  },
  getters: {
    users: state => state.users,
    loginUser: state => state.loginUser,
    userName: state => (state.loginUser ? state.loginUser.displayName : ''),
    uid: state => (state.loginUser ? state.loginUser.uid : null),
  },
  mutations: {
    addUser (state, user) {
      state.users.push (user);
      console.log (state.users);
    },
    logIn({email, password}) {
      email;
      password;
    },
    setLoginUser (state, user) {
      state.loginUser = user;
    },
  },
  actions: {
    addUser ({commit}, {name, email, password}) {
      firebase
        .auth ()
        .createUserWithEmailAndPassword (email, password)
        .then (() => {
          firebase
            .auth ()
            .currentUser.updateProfile ({
              displayName: name,
            })
            .then (() => {
              firebase
                .firestore ()
                .collection ('users')
                .doc (email)
                .set ({
                  name: name,
                  email: email,
                  wallet: 500,
                })
                .then (docRef => {
                  console.log (docRef.id);
                })
                .catch (error => {
                  console.log (error);
                });
              firebase
                .firestore ()
                .collection ('users')
                .doc (email)
                .get ()
                .then (docRef => {
                  if (docRef.exists) {
                    commit ('setLoginUser', docRef.data ());
                  } else {
                    console.log ('No such document!');
                  }
                });
              alert ('Created user!!'), commit ('addUser', {
                name,
                email,
                password,
                wallet: 500,
              });
              commit ('logIn', {
                email,
                password,
              });
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
        .then (() => {
          commit ('logIn', {
            email,
            password,
          });
          firebase
            .firestore ()
            .collection ('users')
            .doc (email)
            .get ()
            .then (docRef => {
              if (docRef.exists) {
                commit ('setLoginUser', docRef.data ());
              } else {
                console.log ('No such document!');
              }
            });
        })
        .catch (error => {
          this.error = error.message;
          alert (this.error);
        });
    },
    setLoginUser ({commit}, user) {
      commit ('setLoginUser', user);
    },
  },
  modules: {},
});
