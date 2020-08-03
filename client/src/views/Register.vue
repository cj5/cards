<template>
  <div id="register">
    <div class="container">
      <h2 class="subheading tac">Register</h2>

      <div class="form-wrap">
        <form action="/" method="post" ref="form" @submit="submit">
          <div class="input-wrap">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" v-model="username">
          </div>
          <div class="input-wrap">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" v-model="password">
          </div>
          <!-- <div class="input-wrap">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password">
          </div> -->
          <div class="input-wrap">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" v-model="email">
          </div>
          <input class="btn" type="submit" value="Register">
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'

export default {
  name: 'Register',
  data() {
    return {
      serverUrl: this.$store.state.serverUrl,
      email: '',
      username: '',
      password: '',
      now: '',
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()

      this.now = moment.tz('America/Chicago').format('YYYY-MM-DD hh:mm:ss')

      axios.post(`${this.serverUrl}/api/user`, {
        username: this.username,
        password: this.password,
        email: this.email,
        created_on: this.now,
        last_login: this.now,
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
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
    this.getUsers()
  }
}
</script>