export default [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: () => import('../pages/index')
  }
]
