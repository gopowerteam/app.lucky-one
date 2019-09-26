import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    rooms: new Array(),
    history: new Array()
  },
  mutations: {
    // 添加房间
    addRoom(state, room: any) {
      state.rooms = [...state.rooms, room]
    },
    addHistory(state, room: any) {
      state.history = [...state.history, room]
    },
    // 设置host名称
    setHostName(state) {
      state.name = `host:${Math.random()
        .toString(36)
        .substr(2)}`
    },
    setVisitorName(state, name) {
      state.name = name
    }
  },
  actions: {},
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: 'vuex'
    })
  ]
})
