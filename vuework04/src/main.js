import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyC7shKU7YhltXKuKZgFZmANxxKJ7bS8wM0',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: '1:316792669101:web:b2395e000f3910b8331724',
  measurementId: 'G-MEASUREMENT_ID',
};
firebase.initializeApp (firebaseConfig);

Vue.config.productionTip = false;

new Vue ({
  router,
  // store,
  render: h => h (App),
}).$mount ('#app');
