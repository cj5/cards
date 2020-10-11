<template>
  <header>
    <div class="container">
      <h1 class="heading title">
        <router-link to="/" exact>
          <Logo />
          <span>Cards</span>
        </router-link>
      </h1>
      <nav>
        <ul v-if="!signedIn">
          <li v-if="currentRoute !== 'LogIn'">
            <router-link to="/log-in" class="btn btn-2 sm" role="button">Log in</router-link>
          </li>
          <li class="m-sm" v-if="currentRoute !== 'SignUp'">
            <router-link to="/sign-up" class="btn sm" role="button">Sign up</router-link>
          </li>
        </ul>
        <ul v-else>
          <li>
            <router-link to="/" exact class="btn btn-2 sm" role="button">Log out</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Logo from './Logo'

export default {
  name: 'Header',
  components: {
    Logo,
  },
  computed: {
    currentRoute() {
      return this.$store.state.currentRoute
    },
    signedIn() {
      return this.$store.state.signedIn
    }
  },
}
</script>