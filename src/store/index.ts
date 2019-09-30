import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: new Array(),
    history: new Array(),
    name: '',
    visitor: {
      username: '',
      avatar: ''
    }
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
    setHost(state) {
      state.name = `host:${Math.random()
        .toString(36)
        .substr(2)}`
    },
    setVisitor(state, { username, avatar }) {
      state.visitor = {
        username,
        avatar
      }
    }
  },
  actions: {},
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: 'vuex',
      paths: ['rooms', 'history', 'name']
    })
  ]
})
