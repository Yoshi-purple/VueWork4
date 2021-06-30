import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import router from '../router';

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
    setUserSnapshot (state, userSnapshot) {
      state.users.push({
        name: userSnapshot.name,
        wallet: userSnapshot.wallet,
      });
    },
    deleteUserSnapshot(state) {
      state.users.length = 0;
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
    //ユーザーを新規追加する処理
    addUser ({commit,dispatch}, { name, email, password }) {
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
          alert ('登録完了'),
          dispatch ('logIn', {
            email,
            password,
          });
        })

        .catch (error => {
          this.error = error.message;
        });
    },
    //ログイン処理
    logIn ({commit,dispatch}, {email, password}) {
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
                commit('setLoginUser', docRef.data());
                console.log(user)//後で消す
                dispatch('getUserList', user.user.email)
                router.push('/dashboard')
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
    //ログアウト処理
    logOut ({commit}) {
      firebase.auth().signOut().then(() => {
        commit('deleteUserSnapshot')
      })
      .catch(() => {
        console.log('ログアウトに失敗しました')
      });
    },
    //全てのユーザー情報取得
    getUserList({ commit }, email) {
      firebase.
        firestore()
        .collection('users')
        .where('email', '!=', email )
        .get()
        .then(userSnapshot => {
          userSnapshot.forEach(doc => {
            console.log(doc.data())
            commit('setUserSnapshot', doc.data());
          })
        });
    },
  },
  modules: {},
});
