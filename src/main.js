import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store'

import Snackbar from './components/buefy-overrides/Snackbar'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Buefy)
// Vue.use(BuefyOverrides.Snackbar)

Vue.use(Snackbar)