import { RouteConfig } from 'vue-router'
import BrowserLayout from '~/layouts/browser.layout.vue'
import HomePage from '~/pages/browser/home.page.vue'
import RoomPage from '~/pages/browser/room.page.vue'
import StartDrawing from '~/pages/browser/start-drawing.page.vue'
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
    },
    {
      path: 'room/:token',
      name: 'host-room',
      props: true,
      component: RoomPage
    },
    {
      path: 'start-drawinng/:awardId',
      name: 'draw',
      props: true,
      component: StartDrawing
    }
  ]
}
