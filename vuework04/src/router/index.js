import Vue from 'vue';
import VueRouter from 'vue-router';
import SignUp from '../views/Signup.vue';
import Login from '../views/Login.vue';
import UsersView from '../views/UsersView.vue';
import firebase from 'firebase';

Vue.use (VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/usersView',
    name: 'UsersView',
    component: UsersView,
    meta: {requiresAuth: true},
  },
];

const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach ((to, from, next) => {
  const requiresAuth = to.matched.some (record => record.meta.requiresAuth);
  if (requiresAuth) {
    // 認証状態を取得
    firebase.auth ().onAuthStateChanged (user => {
      if (!user) {
        // 認証されていない場合、ログイン画面へ
        next ({name: 'Login'});
        console.log ('ログインしてください');
      } else {
        next ();
      }
    });
  } else {
    next ();
  }
});

export default router;
