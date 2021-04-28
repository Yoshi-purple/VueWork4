<template>
  <div class="home">
    <br />
    <div class="signedInUser">
      <span class="userName">{{ loginUser.name }}さん、ようこそ！！</span>
      <span class="userWallet">残高：{{ loginUser.wallet }}</span>
    </div>
    <div>
      <h3>ユーザ一覧</h3>
    </div>

    <div>
      <router-link tag="button" to="/">登録画面</router-link>
      <router-link tag="button" to="/login">ログイン画面</router-link>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase/firebase.config';
// import 'firebase/auth';
import store from '../store/index';
import { mapGetters } from 'vuex';
export default {
  name: 'UsersView',
  computed: {
    ...mapGetters(['uid', 'userName', 'loginUser']),
  },
  methods: {
    changeLoginUser() {
      //ログイン状態の確認
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);

          // ログインしているユーザ情報をストアにコミット
          store.dispatch('setLoginUser', user);

          //現在ログインしているユーザの確認のため、コンソールに出力
          console.log('  Name: ' + user.displayName);
          console.log('  Email: ' + user.email);
          console.log('  wallet: ' + user.wallet);
        } else {
          console.log('ログインしてください');
        }
      });
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>
