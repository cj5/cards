<template>
  <div id="app">
    <Header />
    <div class="page-wrap">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  watch: {
    $route() {
      this.$store.commit('setCurrentRoute', this.$route.name)
    }
  },
}
</script>

<style lang="scss">
  @import './styles/app';
</style>