import Vue from 'vue'
import Router from 'vue-router'
import { mobileRouter } from './mobile.router'
import { browserRouter } from './browser.router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/host'
    },
    browserRouter,
    mobileRouter
  ]
})
