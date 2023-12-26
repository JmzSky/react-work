export default [
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
]
