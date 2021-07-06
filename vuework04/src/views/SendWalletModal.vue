  <template >
  <transition name="modal" appear >
    <div class="overlay" @click.self="$emit('close')" >
      <div class="content">
        <div class="myWallet">
          あなたの残高: {{ loginUser.wallet }}
        </div>
        <div>
          <input type="text" v-model="sentWallet" style="width:60%">
        </div>
        <footer class="footer">
          <button @click="$emit('close')">閉じる</button>
          <button @click="doSend(users[index])">送る</button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
return {
  sentWallet: '',
}
  },
  props:['index','users'],
  computed: {
    ...mapGetters(['loginUser']),
  },
  methods: {
    doSend(targetUser) {
      if(this.sentWallet === '') {
        alert('金額を入力してください')
      } else {
        this.$store.commit('setLoginUser', {
          name: this.loginUser.name,
          email: this.loginUser.email,
          wallet: this.loginUser.wallet - this.sentWallet,
        });
        targetUser.wallet = Number(targetUser.wallet) + Number(this.sentWallet);
        this.$store.commit('setTargetUser',targetUser);
        this.$store.dispatch('updateWallet');
        this.$store.dispatch('updateTargetWallet');
        this.sentWallet = '';
        this.$emit('close');
      }
    }
  },
}
</script>
<style>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s;

}
.modal-enter, .modal-leave {
  opacity: 0
}
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
li {
  list-style: none;
}

.overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  z-index: 2;
  width: 10%;
  padding: 1em;
  background: #fff;
  border-radius: 10px;
}

</style>