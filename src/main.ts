import { AccountModule } from '@/lib/AccountModule';
import { WorkModule } from '@/lib/WorkModule';
import Vue from 'vue';
import ElectronStore from 'electron-store';
import App from './App.vue';
import router from './router';
import store from './store';

import 'typeface-roboto/index.css';

Vue.config.productionTip = false;

const electronStore = new ElectronStore();
const accountModule = new AccountModule(store, electronStore, router);
const workModule = new WorkModule(store, electronStore);

new Vue({
  router,
  store,
  provide: {
    accountModule,
    workModule,
  },
  render: (h) => h(App),
}).$mount('#app');
