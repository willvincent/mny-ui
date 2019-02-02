export default [
  {
    path: '/reset-password/*',
    name: 'Reset Password',
    component: () => import(/* webpackChunkName: "auth-reset-password" */ '@/views/Auth/ResetPassword.vue'),
    meta: {
      auth_route: true,
    },
  },
]
