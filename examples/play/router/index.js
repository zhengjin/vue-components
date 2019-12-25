/* eslint-disable no-console */
import Vue from 'vue'
import Router from 'vue-router'

// import store from '../store/store'
// import * as types from '../store/types'

let home = r => require.ensure([], () => r(require('../../pages/home')), 'home')
let segmentation = r => require.ensure([], () => r(require('../../pages/segmentation/Segmentation')), 'segmentation')

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/segmentation',
    component: segmentation,
    meta: {
      requireAuth: true
    }
  }
]
const pathes = routes.map(i => i.path)

// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  console.log(`进入页面${to.fullPath}`)
  console.log(`离开页面${from.fullPath}`)
  if (to.matched.some(r => r.meta.requireAuth)) {
    // if (store.state.token) {
    //     next();
    // }
    // else {
    //     next({
    //         path: '/login',
    //         query: {redirect: to.fullPath}
    //     })
    // }
    next()
  } else {
    next()
  }
})
export {pathes, router}
