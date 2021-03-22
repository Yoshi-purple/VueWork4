import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);

export default new Vuex.Store ({
  state: {
    users: [{name: 'testA', email: 'testA@test.com'}],
  },
  mutations: {},
  actions: {},
  modules: {},
});
