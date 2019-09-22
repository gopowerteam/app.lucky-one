import Vue from 'vue'
import VueRouter from 'vue-router'

import { ApplicationRouter } from './application_router'
import { IApplicationOption } from '../interfaces'
import { ApplicationStore } from './application_store'

Vue.use(VueRouter)

export class Application {
  private router: ApplicationRouter
  /**
   * 构造函数
   * @param options 初始化参数
   */
  constructor(options: IApplicationOption) {
    // 进行全局混入
    this.mixins()

    // 安装基础插件
    Vue.use(VueRouter)

    // 注册路由扩展
    this.router = new ApplicationRouter(options, ApplicationStore.getStore())

    // 初始化框架
    this.bootstrap(options, () => {
      new Vue({
        router: options.router,
        store: options.store,
        render: h =>
          h(
            'div',
            {
              domProps: {
                id: 'app'
              }
            },
            [h('router-view')]
          )
      }).$mount('#app')
    })
  }

  /**
   * 全局混入
   */
  public mixins() {
    // var Component = Vue.extend({
    //   mixins: [validationMixin]
    // })

    // 添加插件
    Vue.use({
      install: () => {
        Vue.prototype.$app = {
          router: this.router,
          store: ApplicationStore.getStore(),
          state: ApplicationStore.getStore().state
        }
      }
    })
  }

  /**
   * 初始化配置
   * @param options 配置选项
   * @param callback 初始话回调
   */
  private bootstrap({ store, bootstrap }: IApplicationOption, applicationInit) {
    // 安装过滤器
    if (bootstrap.filters) {
      Object.entries(bootstrap.filters(store)).forEach(([key, fun]: [string, any]) => {
        Vue.filter(key, fun)
      })
    }

    // 安装指令
    if (bootstrap.directives) {
      Object.entries(bootstrap.directives(store)).forEach(([key, fun]) => {
        Vue.directive(key, fun as any)
      })
    }

    // 安装插件
    if (bootstrap.plugins) {
      Object.entries(bootstrap.plugins(store)).forEach(([key, plugin]: [string, any]) => {
        Vue.use(plugin)
      })
    }

    // UI实例化
    applicationInit()
  }
}
