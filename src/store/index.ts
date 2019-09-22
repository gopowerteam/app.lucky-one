import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '001',
    rooms: new Array(),
    history: new Array()
  },
  mutations: {
    addRoom(state, room: any) {
      state.rooms = [...state.rooms, room]
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
