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
        <li v-for="(user, index) in users" :key="index">
          {{ user.name }}
          <button @click="openModal(index)">walletを見る</button>
          <button>送る</button>
        </li>
          <CheckWalletModal v-if="modal === true" @close="closeModal" :users="users" :index="index"></CheckWalletModal>
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
      index: null,
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
    openModal(index) {
      this.index = index;
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
