import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoute: '',
    signedIn: false,
    username: '',
    modalShow: false,
    modalCopy: '',
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
    setModalShow(state, { boolean, copy = '' }) {
      state.modalShow = boolean
      state.modalCopy = copy
    },
  }
})