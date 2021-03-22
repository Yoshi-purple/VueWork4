<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <h1>新規登録画面</h1>
    <div class="form">
      <label for="userName">ユーザー名 </label> <input type="text" />
    </div>
    <div class="form">
      <label for="emailAddres">メールアドレス </label> <input type="text" />
    </div>
    <div class="form">
      <label for="password">パスワード </label> <input type="text" />
    </div>
    <router-link to="/" tag="button">新規登録</router-link>
    |
    <router-link to="/about" tag="a">ログインはこちらから</router-link>
  </div>
</template>

<script>
import {} from 'vuex';

export default {
  methods: {},
  computed: {},
};
</script>
