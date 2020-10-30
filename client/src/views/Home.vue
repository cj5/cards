<template>
  <div class="home mt-6">
    <div class="container">
      <p class="color-1 fz-xl mt-3" v-if="this.$store.state.signedIn">
        Welcome <span class="italic">{{ this.$store.state.username }}!</span>
      </p>
    </div>
    <section class="games">
      <div class="container">
        <div class="flex-grid">
          <router-link :to="gameLink('blackjack')" class="module blackjack">
            <div class="img-wrap flex">
              <img :src="img('blackjack.jpg')" alt="">
              <div class="filter"></div>
            </div>
            <p class="title">Blackjack</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    gameLink(route) {
      if (this.$store.state.signedIn) {
        return `/${route}`
      } else {
        return '/log-in'
      }
    }
  },
}
</script>
