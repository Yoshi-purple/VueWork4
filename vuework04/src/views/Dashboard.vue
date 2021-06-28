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
      <h4>ユーザー名</h4>
      <ul>
        <li v-show="user.name !== loginUser.name" v-for="user in users" :key="user.id">
          {{ user.name }}
          <button @click="openModal(user.id)">walletを見る</button>
          <button>送る</button>
        </li>
          <CheckWalletModal v-if="modal === true" @close="closeModal" :users="users"></CheckWalletModal>
      </ul>
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
import CheckWalletModal from './CheckWalletModal.vue'
export default {
  components: {
    CheckWalletModal,
  },
  data() {
    return {
      modal: false,
    }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters(['uid', 'userName', 'loginUser', 'users']),
  },

  methods: {
    logOut() {
      this.$store.dispatch('logOut');
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false
    },
  },

};
</script>

<style>
</style>
