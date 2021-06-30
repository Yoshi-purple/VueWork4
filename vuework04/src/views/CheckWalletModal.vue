  <template >
  <transition name="modal" appear >
    <div class="overlay" @click.self="$emit('close')" >
      <div class="content">
        {{ users[index].name }}さんの残高: {{ users[index].wallet }}
        <footer class="footer">
          <slot name="footer">
            <button @click="$emit('close')">閉じる</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props:['users', 'index'],
  computed: {
  },
  template: {

  },
  methods: {
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