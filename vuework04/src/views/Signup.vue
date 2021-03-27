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
    <router-link to="/login" tag="a">ログインはこちらから</router-link>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
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

  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          this.$router.push('/UsersView.vue'),
          console.log(this.userName, this.email, this.password)
        )
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>

<style></style>
