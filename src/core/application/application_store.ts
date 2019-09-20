import Vuex from 'vuex'

/**
 * 应用内部数据存储
 */
export class ApplicationStore {
  private static _store: any

  public static getStore() {
    if (!this._store) {
      this._store = this.createStore()
    }

    return this._store
  }

  private static createStore() {
    return new Vuex.Store({
      state: {
        // 系统准备状态
        ready: false,
        // 当前布局
        layout: 'loading'
      },
      getters: {
        layout(state) {
          return `${state.layout.replace(/^\S/, s => s.toUpperCase())}Layout`
        }
      },
      mutations: {
        /**
         * 更新系统启动状态
         * @param state 数据对象
         */
        ready(state) {
          state.ready = true
        },
        /**
         * 更新当前布局
         * @param state 数据对象
         * @param layout  布局对象
         */
        updateLayout(state, layout) {
          state.layout = layout
        }
      }
    })
  }
}
