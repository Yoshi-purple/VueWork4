<template>
  <div class="home">
    <br />
    <div class="signedInUser">
      <span class="userName">{{ loginUser.name }}さん、ようこそ！！</span>
      <span class="userWallet">残高：{{ loginUser.wallet }}</span>

      <button @click="logOut">ログアウト</button>
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
import { mapGetters } from 'vuex';

export default {
  name: 'UsersView',
  computed: {
    ...mapGetters(['uid', 'userName', 'loginUser']),
  },

  methods: {
    logOut() {
      this.$store.dispatch('logOut');
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>
