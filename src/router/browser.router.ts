import { RouteConfig } from 'vue-router'
import BrowserLayout from '~/layouts/browser.layout.vue'
import HomePage from '~/pages/browser/home.page.vue'

export const browserRouter: RouteConfig = {
  path: '/host',
  component: BrowserLayout,
  children: [
    {
      path: '',
      redirect: 'home'
    },
    {
      path: 'home',
      name: 'home',
      component: HomePage
    }
  ]
}
