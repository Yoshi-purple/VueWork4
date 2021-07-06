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
          <button @click="openCheckModal(index)">walletを見る</button>
          <button @click="openSendModal(index)">送る</button>
        </li>
          <CheckWalletModal v-if="checkModal === true" @close="closeModal" :users="users" :index="index"></CheckWalletModal>
          <SendWalletModal v-if="sendModal === true" @close="closeModal" :users="users" :index="index">
          </SendWalletModal>
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
import SendWalletModal from './SendWalletModal.vue'
export default {
  components: {
    CheckWalletModal,
    SendWalletModal,
  },
  data() {
    return {
      checkModal: false,
      sendModal: false,
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
    openCheckModal(index) {
      this.index = index;
      this.checkModal = true;
    },
    openSendModal(index) {
      this.index = index;
      this.sendModal = true;
    },
    closeModal() {
      this.checkModal = false
      this.sendModal = false
    },
  },

};
</script>

<style>
</style>
