export default [
  {
    path: '/reset-password/*',
    name: 'Reset Password',
    component: () => import(/* webpackChunkName: "auth-reset-password" */ '@/views/Auth/ResetPassword.vue'),
    meta: {
      auth_route: true,
    },
  },
  {
    path: '/verify-email/*',
    name: 'Verify Email',
    component: () => import(/* webpackChunkName: "auth-email-verification" */ '@/views/Auth/EmailVerification.vue'),
    meta: {
      auth_route: true,
    },
  },
]
