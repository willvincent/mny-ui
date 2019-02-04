import Vue from 'vue'
import Router from 'vue-router'

import AdminRoutes from './admin'
import AuthRoutes from './auth'
import UserRoutes from './user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      meta: {
        icon: 'home',
        breadcrumb: []
      }
    },

    ...AdminRoutes,
    ...AuthRoutes,
    ...UserRoutes,
  ]
})
