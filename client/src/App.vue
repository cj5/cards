<template>
  <div id="app">
    <div class="container">
      <h1>Cards bruh</h1>
      <p>Username: {{ username }}</p>
    </div>
  </div>
</template>

<script>
import config from '../vue.config'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      devUrl: config.devServer.proxy["/api"].target,
      username: '',
    }
  },
  methods: {
    getData() {
      axios.get(`${this.devUrl}/api/users`)
        .then(res => {
          console.log(res)
          this.username = res.data[0].username
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss">
  @import './styles/app';
</style>