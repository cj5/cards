<template>
  <div id="sign-in">
    <div class="container">
      <h2 class="subheading tac">Log in</h2>

      <div class="form-wrap">
        <form action="/" method="post" ref="form" @submit="submit">
          <div class="input-wrap">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username">
          </div>
          <div class="input-wrap">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">
          </div>
          <input class="btn" type="submit" value="Log in">
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'

export default {
  name: 'LogIn',
  data() {
    return {
      serverUrl: this.$store.state.serverUrl,
      username: '',
      password: '',
      now: '',
      users: '',
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()

      this.now = moment.tz('America/Chicago').format('YYYY-MM-DD hh:mm:ss')

      console.log(JSON.stringify(this.users, null, 2))
    },
    getUsers() {
      axios.get(`${this.serverUrl}/api/users`)
        .then(res => {
          // console.log(JSON.stringify(res.data, null, 2))
          this.users = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted() {
    this.getUsers()
  },
}
</script>