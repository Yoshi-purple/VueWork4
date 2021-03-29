<template>
  <div class="home">
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
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['users']),
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>
