import Vue from 'vue';
import VueRouter from 'vue-router';
import SignUp from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import firebase from 'firebase/app';

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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
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
      if (to.name !== 'Login' && !user) {
        // 認証されていない場合、ログイン画面へ
        next ({name: 'Login'});
      } else {
        next();
      }
    });
  } else {
    next ();
  }
});

export default router;
