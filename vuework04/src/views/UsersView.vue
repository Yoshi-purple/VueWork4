<template>
  <div class="home">
    <br />
    <div class="signedInUser">
      <span class="userName">{{ userName }}さん、ようこそ！！</span>
      <!-- <span class="userWallet">残高：{{ loginUser.wallet }}</span> -->
      <!-- <span class="userWallet">残高：{{ uid }}</span> -->
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
  methods: {},
};
</script>

<style>
li {
  list-style: none;
}
</style>
