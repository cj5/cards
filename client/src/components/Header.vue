<template>
  <header>
    <div class="container">
      <h1 class="heading title">
        <router-link to="/" exact>Cards</router-link>
      </h1>
      <nav>
        <ul>
          <li>
            <router-link to="/register" class="btn btn-2 sm" role="button">Register</router-link>
          </li>
          <li class="m-sm">
            <router-link to="/sign-in" class="btn sm" role="button">Sign in</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>