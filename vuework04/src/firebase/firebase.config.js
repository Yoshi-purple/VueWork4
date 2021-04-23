import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../store/index';
const firebaseConfig = {
  apiKey: 'AIzaSyC7shKU7YhltXKuKZgFZmANxxKJ7bS8wM0',
  authDomain: 'vuework04.firebaseapp.com',
  projectId: 'vuework04',
  storageBucket: 'vuework04.appspot.com',
  messagingSenderId: '316792669101',
  appId: '1:316792669101:web:b2395e000f3910b8331724',
  databaseURL: 'https://vuework04.firebaseio.com',
};

firebase.initializeApp (firebaseConfig);
firebase.firestore ();

//ログイン状態の確認
firebase.auth ().onAuthStateChanged (user => {
  if (user) {
    console.log (user);
    user.providerData.forEach (function (profile) {
      // ログインしているユーザ情報をストアにコミット
      store.dispatch ('setLoginUser', user);

      //現在ログインしているユーザの確認のため、コンソールに出力
      console.log ('Sign-in provider: ' + profile.providerId);
      console.log ('  Provider-specific UID: ' + profile.uid);
      console.log ('  Name: ' + profile.displayName);
      console.log ('  Email: ' + profile.email);
      console.log ('  wallet: ' + profile.wallet);
    });
  } else {
    console.log ('ログインしてください');
  }
});
