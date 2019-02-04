export default [
  {
    path: '/admin/users/add',
    name: 'Add User',
    component: () => import(/* webpackChunkName: "user-add-edit" */ '@/views/Admin/Users/AddEdit.vue'),
    meta: {
      icon: 'account-plus',
      breadcrumb: [
        { name: 'Admin', path: '/admin' }
      ]
    }
  },
  {
    path: '/admin/users/edit/:uid',
    name: 'Edit User',
    component: () => import(/* webpackChunkName: "user-add-edit" */ '@/views/Admin/Users/AddEdit.vue'),
    props: true,
    meta: {
      icon: 'account-edit',
      breadcrumb: [
        { name: 'Admin', path: '/admin' }
      ]
    }
  }
]
