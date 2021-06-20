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
      <router-link to="/">
        <button>
          登録画面
        </button>
      </router-link>
      <router-link to="/logIn">
        <button>
          ログイン画面
        </button>
      </router-link>
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
