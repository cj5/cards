import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('./views/SignUp.vue')
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: () => import('./views/LogIn.vue')
  },
  {
    path: '/blackjack',
    name: 'BlackJack',
    component: () => import('./games/Blackjack.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
