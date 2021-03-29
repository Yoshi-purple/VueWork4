<template>
  <div class="home">
    <h1>ログイン画面</h1>
    <div class="form">
      <label for="emailAddres">メールアドレス </label>
      <input type="text" v-model="email" placeholder="E-mail" />
    </div>
    <div class="form">
      <label for="password">パスワード </label>
      <input type="text" v-model="password" placeholder="Password" />
    </div>
    <ul v-for="user in user" :key="user.id">
      <li>{{ user }}</li>
    </ul>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
    <br />
    <div>
      <button @click="login">ログイン</button>
    </div>
    <router-link to="/" tag="a">新規登録はこちらから</router-link>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      error: null,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },

  methods: {
    login() {
      if (this.email === '' || this.password === '') {
        console.log('karappo');
        return;
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            console.log(user);
            //ページ推移のため、コメントアウトしておく
            this.$router.push('/usersView');
          })
          .catch((error) => {
            this.error = error.message;
            alert(this.error);
          });
        this.userName = '';
        this.email = '';
        this.password = '';
      }
    },
  },
};
</script>
