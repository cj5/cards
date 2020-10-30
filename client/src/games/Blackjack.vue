<template>
  <div id="blackjack" class="container">
    <div class="game-wrap">
      <div class="dealer">
        <div
          class="card"
          v-for="(i, key) in this.$store.state.Blackjack.dealerHand"
          :key="key"
        >
          <div class="card-value">{{ cardValue(i) }}</div>
          <div class="icon-wrap">
            <svg :class="`icon icon-${cardSuit(i)}`">
              <use :xlink:href="`#icon-${cardSuit(i)}`"></use>
            </svg>
          </div>
          <img :src="img('card-back.png')" class="card-back" v-if="key === 0" />
        </div>
      </div>
      <div class="player">
        <div
          class="card"
          v-for="(i, key) in this.$store.state.Blackjack.playerHand"
          :key="key"
        >
          <div class="card-value">{{ cardValue(i) }}</div>
          <div class="icon-wrap">
            <svg :class="`icon icon-${cardSuit(i)}`">
              <use :xlink:href="`#icon-${cardSuit(i)}`"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blackjack',
  methods: {
    cardValue(val) {
      let value = val.split('-')[1]

      if (value === '1') {
        value = 'A'
      } else if (value === '11') {
        value = 'J'
      } else if (value === '12') {
        value = 'Q'
      } else if (value === '13') {
        value = 'K'
      }

      return value
    },
    cardSuit(val) {
      let suit = val.split('-')[0]

      if (suit === 's') {
        suit = 'spades'
      } else if (suit === 'h') {
        suit = 'heart'
      } else if (suit === 'c') {
        suit = 'clubs'
      } else if (suit === 'd') {
        suit = 'diamonds'
      }

      return suit
    },
  },
  mounted() {
    this.$store.commit('Blackjack/shuffleCards')

    this.$store.state.Blackjack.dealCount++ // Burn the first card

    this.$store.commit('Blackjack/updatePlayerHand')
    this.$store.commit('Blackjack/updatePlayerHand')

    this.$store.commit('Blackjack/updateDealerHand')
    this.$store.commit('Blackjack/updateDealerHand')
  }
}
</script>
