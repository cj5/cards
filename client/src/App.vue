<template>
  <div id="app" @click="eventOnAppEl($event)">
    <Header />
    <div class="page-wrap">
      <router-view />
    </div>
    <Modal />
  </div>
</template>

<script>
import Header from './components/Header'
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    Header,
    Modal,
  },
  watch: {
    $route() {
      this.$store.commit('setCurrentRoute', this.$route.name)
      // console.clear()
    }
  },
  methods: {
    eventOnAppEl(e) {
      if (e.target.classList.contains('modal-filter')) {
        this.$store.commit('setModalShow', false)
      }
    },
  },
}
</script>

<style lang="scss">
  @import './assets/styles/app';
</style>