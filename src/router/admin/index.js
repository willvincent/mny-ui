export default [
  {
    path: '/admin/users/user-list',
    name: 'User List',
    component: () => import(/* webpackChunkName: "admin-user-list" */ '../../views/Admin/Users/UserList.vue'),
    meta: {
      icon: 'view-list',
      breadcrumb: [
        { name: 'Admin', path: '/admin' }
      ]
    }
  }
]