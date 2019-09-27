import { RouteConfig } from 'vue-router'
import MobileLayout from '~/layouts/mobile.layout.vue'
import RoomPage from '~/pages/mobile/room.page.vue'
import LoginPage from '~/pages/mobile/login.page.vue'

export const mobileRouter: RouteConfig = {
  path: '/visitor',
  component: MobileLayout,
  children: [
    {
      path: 'login',
      name: 'login',
      props: true,
      component: LoginPage
    },
    {
      path: 'room/:token',
      name: 'visitor-room',
      props: true,
      component: RoomPage
    }
  ]
}
