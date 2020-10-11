import Vue from 'vue'
import Vuex from 'vuex'

import config from '../vue.config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverUrl: config.devServer.proxy['/api'].target,
    currentRoute: '',
    signedIn: false,
  },
  mutations: {
    setCurrentRoute(state, route) {
      state.currentRoute = route
    },
    setSignedIn(state, boolean) {
      state.signedIn = boolean
    }
  }
})