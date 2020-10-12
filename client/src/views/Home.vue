<template>
  <div class="home">
    <div class="container">
      <h2 class="subheading mt-6">Hey, it’s the cards app.</h2>
      <p class="color-1 fz-xl mt-3" v-if="this.$store.state.signedIn">
        Welcome <span class="italic">{{ this.$store.state.username }}!</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
