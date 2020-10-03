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
          <a @click="signUp" class="btn submit" role="button">Sign up</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'
import AuthenticationService from '../services/AuthenticationService'

export default {
  name: 'SignUp',
  data() {
    return {
      serverUrl: this.$store.state.serverUrl,
      username: '',
      password: '',
      email: '',
      now: '',
      error: '',
    }
  },
  methods: {
    async signUp() {
      this.now = moment.tz('America/Chicago').format('YYYY-MM-DD hh:mm:ss')

      try {
        const response = await AuthenticationService.signUp({
          username: this.username,
          password: this.password,
          email: this.email,
          created_on: this.now,
          last_login: this.now,
        })
        console.log(response.data)
      } catch (error) {
        console.log('ERROR:', error.response)
        this.error = error.response.data
      }
    },
    // submit(e) {
    //   e.preventDefault()

    //   this.now = moment.tz('America/Chicago').format('YYYY-MM-DD hh:mm:ss')

    //   axios.post(`${this.serverUrl}/api/user`, {
    //     username: this.username,
    //     password: this.password,
    //     email: this.email,
    //     created_on: this.now,
    //     last_login: this.now,
    //   })
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    getUsers() {
      axios.get(`${this.serverUrl}/api/users`)
        .then(res => {
          console.log(JSON.stringify(res.data, null, 2))
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    // this.getUsers()
  }
}
</script>