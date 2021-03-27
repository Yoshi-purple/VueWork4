<template>
  <div class="home">
    <h1>ログイン画面</h1>
    <div class="form">
      <label for="emailAddres">メールアドレス </label>
      <input type="text" v-model="email" placeholder="E-mail" />
    </div>
    <div class="form">
      <label for="password">パスワード </label>
      <input type="text" placeholder="Password" />
    </div>
    <div>
      <button>ログイン</button>
    </div>
    <router-link to="/" tag="a">新規登録はこちらから</router-link>
  </div>
</template>

<script>
import {} from 'vuex';

export default {
  methods: {},
  computed: {},
};
</script>
