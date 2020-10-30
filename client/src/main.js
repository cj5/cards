import Vue from 'vue'
import App from './App.vue'
import store from './stores/store'
import VueRouter from 'vue-router'
import router from './router'
import dayjs from 'dayjs'

Object.defineProperty(Vue.prototype, '$dayjs', { value: dayjs })

Vue.mixin({
  methods: {
    img(img) {
      return require(`./assets/images/${img}`)
    },
  }
})

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
