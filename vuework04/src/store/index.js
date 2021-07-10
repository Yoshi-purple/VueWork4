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
    targetUser:{},
    error: null,
    uid: '',
  },
  getters: {
    users: state => state.users,
    loginUser: state => state.loginUser,
    targetUser: state => state.targetUser,
    userName: state => (state.loginUser ? state.loginUser.displayName : ''),
    uid: state => state.uid,
  },
  mutations: {
    setUserSnapshot (state, userSnapshot) {
      state.users.push({
        name: userSnapshot.data.name,
        wallet: userSnapshot.data.wallet,
        email: userSnapshot.data.email,
        uid: userSnapshot.id
      });
    },
    setTargetUser(state, targetUser) {
      state.targetUser = targetUser;
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
    setUid(state, uid) {
      state.uid = uid
    }
  },
  actions: {
    //ユーザーを新規追加する処理
    addUser ({commit,dispatch}, { name, email, password }) {
      firebase
      .auth ()
      .createUserWithEmailAndPassword (email, password)
      .then((addedUser) => {
        firebase
          .firestore ()
          .collection ('users')
          .doc (addedUser.user.uid)
          .set({
            name,
            email,
            wallet: 500,
          })
          .then(() => {
            firebase
              .firestore ()
              .collection ('users')
              .doc (addedUser.uid)
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
    logIn({ commit, dispatch }, { email, password }) {
      commit('deleteUserSnapshot');//ユーザ一覧の重複を避けるため削除
      firebase
        .auth ()
        .signInWithEmailAndPassword (email, password)
        .then((logInUser) => {
          commit ('logIn', {
            email,
            password,
          });
          firebase
            .firestore ()
            .collection ('users')
            .doc (logInUser.user.uid)
            .get ()
            .then (docRef => {
              if (docRef.exists) {
                commit('setLoginUser', docRef.data());
                dispatch('getUserList', logInUser.user.email);
                commit('setUid',logInUser.user.uid)
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
    //ログインユーザー以外のユーザー情報取得
    getUserList({ commit }, email) {
      firebase.
        firestore()
        .collection('users')
        .where('email', '!=', email )
        .get()
        .then(userSnapshot => {
          userSnapshot.forEach(doc => {
            const docData = {
              data: doc.data(),
              id: doc.id
            }
            commit('setUserSnapshot', docData);
          })
        });
    },
    //渡す対象とログインユーザーのWALLETの書き換え
    updateWallet({ getters }) {
      const receivingUser = getters.targetUser;
      const doSendUser = getters.loginUser;
      const receivingDocRef = firebase.firestore ().collection ('users').doc (receivingUser.uid);
      firebase.firestore().runTransaction(transaction => {
        return transaction.get(receivingDocRef).then((receivingUser) => {
          if (!receivingUser.exists) {
            throw "receivingUser does not exist!";
          }
      })
      }).then(
        firebase.firestore()
          .collection('users')
          .doc(receivingUser.uid)
          .update({ wallet: receivingUser.wallet })
          .then(
            firebase.firestore()
            .collection('users')
            .doc(getters.uid)
            .update({ wallet: doSendUser.wallet })
            .then()
            .catch(err => {
              console.log(err)
            })
          )
          .catch(err => {
            console.log(err)
          })
      ).catch(err => {
        console.log(err);
        })
    },
  },
  modules: {},
});
