import Vue from 'vue';
import Vuex from 'vuex';
import Account from './account';
import Work from './work';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Account,
    Work,
  },
});
