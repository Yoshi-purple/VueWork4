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
      email: '',
      password: '',
    };
  },

  methods: {
    logIn() {
      if (this.email === '' || this.password === '') {
        return;
      } else {
        this.$store.dispatch('logIn', {
          email: this.email,
          password: this.password,
        });
        this.userName = '';
        this.email = '';
        this.password = '';
      }
    },
  },
};
</script>
