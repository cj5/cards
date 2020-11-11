import Vue from 'vue'
import Vuex from 'vuex'

import Blackjack from './games/blackjack'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoute: '',
    signedIn: false,
    username: 'Chris',
    modalShow: false,
    modalCopy: '',
    modalBtnCopy: '',
  },
  mutations: {
    setCurrentRoute(state, route) {
      state.currentRoute = route
    },
    setSignedIn(state, boolean) {
      state.signedIn = boolean
    },
    setUsername(state, username) {
      state.username = username
    },
    setModalShow(state, { boolean, copy = '', btnCopy = '' }) {
      state.modalShow = boolean
      state.modalCopy = copy
      state.modalBtnCopy = btnCopy
    },
  },
  modules: {
    Blackjack,
  }
})