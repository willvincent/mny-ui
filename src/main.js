import Vue from 'vue'
import Buefy from 'buefy'
import App from './views/App.vue'
import router from './router'
import store from './store'

import '@riophae/vue-treeselect/dist/vue-treeselect.css';

Vue.config.productionTip = false

Vue.use(Buefy)

// Buefy Overrides
import Snackbar from './components/buefy-overrides/Snackbar'
Vue.use(Snackbar)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
