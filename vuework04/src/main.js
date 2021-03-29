import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as firebase from './firebase/firebase.config.js';

Vue.config.productionTip = false;

new Vue ({
  router,
  store,
  firebase,
  render: h => h (App),
}).$mount ('#app');
