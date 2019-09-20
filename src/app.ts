import Vue from 'vue'

import router from './router'
import store from './store'
import { Application } from '~/core'

import { filters, directives, provides, plugins } from '~/shared/extension'

Vue.config.productionTip = false

// 初始化应用
new Application({
  router,
  store,
  launch: () => Promise.resolve(),
  bootstrap: {
    provides,
    plugins,
    directives,
    filters
  }
})
