<template>
  <div class="home">
    <h1>新規登録画面</h1>
    <div class="form">
      <label for="userName">ユーザー名 </label>
      <input type="text" placeholder="Username" v-model="userName" />
    </div>
    <div class="form">
      <label for="emailAddres">メールアドレス </label>
      <input type="email" v-model="email" placeholder="E-mail" />
    </div>
    <div class="form">
      <label for="password">パスワード </label>
      <input type="password" placeholder="Password" v-model="password" />
    </div>

    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <br />
    <div>
      <button @click="signUp">新規登録</button>
    </div>
    <router-link to="/login">
      <a>
        ログインはこちらから
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      error: null,
    };
  },
  computed: {},

  methods: {
    signUp () {
      if (this.email === '' || this.password === '') {
        alert('ユーザー情報を全て入力してください');
      } else {
        this.$store.dispatch ('addUser', {
          name: this.userName,
          email: this.email,
          password: this.password,
        });
        this.$router.push ('/dashboard'); //ページ推移
        this.userName = '';
        this.email = '';
        this.password = '';
      }
    },
  },
};
</script>

<style></style>
