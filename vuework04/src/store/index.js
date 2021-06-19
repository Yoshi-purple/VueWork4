import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

Vue.use (Vuex);

export default new Vuex.Store({
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
    },
    logIn ({email, password}) {
      email;
      password;
    },
    setLoginUser (state, loginUser) {
      state.loginUser = loginUser;
    },
  },
  actions: {
    addUser ({commit,dispatch}, {name, email, password, uid}) {
      firebase
      .auth ()
      .createUserWithEmailAndPassword (email, password)
      .then((user) => {
        firebase
          .firestore ()
          .collection ('users')
          .doc (user.user.uid)
          .set({
            name,
            email,
            wallet: 500,
          })
          .then(() => {
            firebase
              .firestore ()
              .collection ('users')
              .doc (user.uid)
              .get ()
              .then (docRef => {
                if (docRef.exists) {
                  commit ('setLoginUser', docRef.data());
                } else {
                  console.log ('No such document!');
                }
              })
            }
          )
          .catch (error => {
            console.log (error);
          });

          alert ('Created user!!'), commit ('addUser', {
            name,
            email,
            uid,
            password,
            wallet: 500,
          });
          dispatch ('logIn', {
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
        .then((user) => {
          commit ('logIn', {
            email,
            password,
          });
          firebase
            .firestore ()
            .collection ('users')
            .doc (user.user.uid)
            .get ()
            .then (docRef => {
              if (docRef.exists) {
                console.log (docRef.data());//後で消す
                commit('setLoginUser', docRef.data());
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

    logOut () {
      firebase.auth().signOut().then(() => {
        console.log ('ログアウトしました。');
      });
    },
  },
  modules: {},
});
