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
          <div class="error" v-if="error" v-html="error"></div>
          <button
            @click="logIn"
            @keydown.enter.prevent="logIn"
            class="btn submit"
            role="button">
            Log in
          </button>
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
      username: '',
      password: '',
      now: '',
      error: '',
      passwordType: 'password',
    }
  },
  methods: {
    async logIn() {
      this.error = ''
      this.now = this.$dayjs().format(process.env.VUE_APP_TIME_FORMAT)

      try {
        const response = await AuthService.logIn({
          username: this.username,
          password: this.password,
          last_login: this.now,
        })
        console.log('TRY block:', response.data)
        this.$store.commit('setSignedIn', true)
        this.$store.commit('setUsername', response.data.username)
        this.$router.push('/').catch(() => {})
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