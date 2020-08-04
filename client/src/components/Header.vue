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
        <ul>
          <li>
            <router-link to="/log-in" class="btn btn-2 sm" role="button">Log in</router-link>
          </li>
          <li class="m-sm">
            <router-link to="/sign-up" class="btn sm" role="button">Sign up</router-link>
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
    Logo
  }
}
</script>