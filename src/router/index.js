import Vue from 'vue'
import Router from 'vue-router'

import AdminRoutes from './admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      meta: {
        icon: 'home',
        breadcrumb: []
      }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      meta: {
        breadcrumb: []
      }
    },
    ...AdminRoutes,
  ]
})
