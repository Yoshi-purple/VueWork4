<template>
  <div class="home">
    <h1>ログイン画面</h1>
    <div class="form">
      <label for="emailAddres">メールアドレス </label>
      <input type="text" v-model="email" placeholder="E-mail" />
    </div>
    <div class="form">
      <label for="password">パスワード </label>
      <input type="password" v-model="password" placeholder="Password" />
    </div>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <br />
    <div>
      <button @click="logIn">ログイン</button>
    </div>
    <router-link to="/">
      <a>
        新規登録はこちらから
      </a>
      </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      error: null,
    };
  },

  methods: {
    logIn() {
      if (this.email === '' || this.password === '') {
        console.log('全ての項目を入力してください');
        return;
      } else {
        this.$store.dispatch('logIn', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/dashboard'); //ページ推移
        this.userName = '';
        this.email = '';
        this.password = '';
      }
    },
  },
};
</script>
