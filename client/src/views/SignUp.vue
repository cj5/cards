<template>
  <div id="register">
    <div class="container">
      <h2 class="subheading tac">Sign up</h2>

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
          <!-- <div class="input-wrap">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password">
          </div> -->
          <div class="input-wrap">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" v-model="email">
          </div>
          <div class="error" v-if="error" v-html="error"></div>
          <button @click="signUp" @keydown.enter.prevent="signUp" class="btn submit" role="button">Sign up</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import AuthService from '../services/AuthService'

export default {
  name: 'SignUp',
  data() {
    return {
      serverUrl: this.$store.state.serverUrl,
      username: 'pickle',
      password: '@FromClient5',
      email: 'pickle@email.com',
      now: '',
      error: '',
    }
  },
  methods: {
    async signUp() {
      this.now = moment.tz('America/Chicago').format('YYYY-MM-DD hh:mm:ss')

      try {
        const response = await AuthService.signUp({
          username: this.username,
          password: this.password,
          email: this.email,
          created_on: this.now,
          last_login: this.now,
        })
        console.log(response.data)
        this.$router.push('log-in').catch(()=>{})
      } catch (error) {
        console.log('CATCH block:', error.response)
        this.error = error.response.data
      }
    },
  },
}
</script>