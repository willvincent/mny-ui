import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import modules from './modules';

// import { syncSettings } from './plugins/syncSettings';

const vuexLocal = new VuexPersistence({
  key: 'mny',
  modules: ['auth'],
  storage: window.localStorage,
});
Vue.use(Vuex);

const store = {
  modules,
  plugins: [vuexLocal.plugin],
};

export default new Vuex.Store(store);
