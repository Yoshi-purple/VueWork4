import firebase from 'firebase/app';
import 'firebase/auth';
import store from '../store';
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

firebase.auth ().onAuthStateChanged (user => {
  store.commit ('addUser', user);
});
