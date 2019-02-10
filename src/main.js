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

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('accountTypes', function (value) {
  if (!value) return ''
  switch (value) {
    case 'ADMIN':
      return 'Administrator';
    case 'CLIENT':
      return 'Client';
    default:
      return value;
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
