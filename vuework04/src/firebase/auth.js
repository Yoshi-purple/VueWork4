// import firebase from 'firebase/app';

// import 'firebase/auth';
// import 'firebase/firestore';
// import store from '../store/index';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC7shKU7YhltXKuKZgFZmANxxKJ7bS8wM0',
//   authDomain: 'vuework04.firebaseapp.com',
//   projectId: 'vuework04',
//   storageBucket: 'vuework04.appspot.com',
//   messagingSenderId: '316792669101',
//   appId: '1:316792669101:web:b2395e000f3910b8331724',
// };

// // Initialize Firebase

// export default {
//   init () {
//     firebase.initializeApp (firebaseConfig);
//     firebase.auth ().setPersistence (firebase.auth.Auth.Persistence.SESSION);
//   },
//   logout () {
//     firebase.auth ().signOut ();
//   },
//   onAuth () {
//     firebase.auth ().onAuthStateChanged (user => {
//       user = user ? user : {};
//       store.commit ('setUser', user);
//     });
//   },
// };
