import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    avatar: '',
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
    setUser(state, { username, avatar }) {
      state.name = username
      state.avatar = avatar
    }
  },
  actions: {},
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: 'vuex',
      filter: ({ type }) => {
        return !['setUser', 'setHostName'].includes(type)
      }
    })
  ]
})
