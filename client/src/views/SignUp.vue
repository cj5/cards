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
            <div class="flex rel">
              <input :type="passwordType" id="password" name="password" class="password" v-model="password">
              <a
                ref="password"
                class="togglePassword icon-eye"
                @click="togglePassword"
                @keydown.enter="togglePassword"
                tabindex="0"
              ></a>
            </div>
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
import AuthService from '../services/AuthService'

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      now: '',
      error: '',
      passwordType: 'password',
    }
  },
  methods: {
    async signUp() {
      this.error = ''
      this.now = this.$dayjs().format(process.env.VUE_APP_TIME_FORMAT)

      try {
        const response = await AuthService.signUp({
          username: this.username,
          password: this.password,
          email: this.email.toLowerCase(),
          created_on: this.now,
          last_login: this.now,
        })
        console.log(response.data)
        this.$router.push('log-in').catch(() => {})
        this.$store.commit('setModalShow', {
          boolean: true,
          copy: 'You have successfully signed up for the Cards App',
          btnCopy: 'Log in',
        })
      } catch (error) {
        console.log('CATCH block:', error.response)
        setTimeout(() => {
          this.error = error.response.data
        }, 200)
      }
    },
    togglePassword() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        this.$refs.password.classList.add('active')
      } else {
        this.passwordType = 'password'
        this.$refs.password.classList.remove('active')
      }
    },
  },
}
</script>