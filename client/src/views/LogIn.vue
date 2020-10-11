<template>
  <div id="sign-in">
    <div class="container">
      <h2 class="subheading tac">Log in</h2>

      <div class="form-wrap">
        <div class="form">
          <div class="input-wrap">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username">
          </div>
          <div class="input-wrap">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">
          </div>
          <a @click="logIn" class="btn submit" role="button">Log in</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'

export default {
  name: 'LogIn',
  data() {
    return {
      serverUrl: this.$store.state.serverUrl,
      username: '',
      password: '',
    }
  },
  methods: {
    async logIn() {
      try {
        const request = await AuthService.logIn({
          username: this.username,
          password: this.password,
        })
        console.log(request.data)
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>