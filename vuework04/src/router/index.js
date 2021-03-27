import Vue from 'vue';
import VueRouter from 'vue-router';
import SignUp from '../views/Signup.vue';
import Login from '../views/Login.vue';
import UsersView from '../views/UsersView.vue';

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
  },
];

const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
