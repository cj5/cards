<template>
  <div id="blackjack" class="container">
    <div class="game-wrap">
      <div class="hands">
        <div
          class="player"
          v-for="(i, key_i) in state.players"
          :key="key_i"
        >
          <div
            class="card"
            v-for="(j, key_j) in i.cards"
            :key="key_j"
          >
            <div class="card-value">{{ cardValue(j) }}</div>
            <div class="icon-wrap">
              <svg :class="`icon icon-${cardSuit(j)}`">
                <use :xlink:href="`#icon-${cardSuit(j)}`"></use>
              </svg>
            </div>
            <!-- <img :src="img('card-back.png')" class="card-back" v-if="key_j === 0" /> -->
          </div>
        </div>
      </div>
      <div class="chips">
        <div class="chips-wrap">
          <a
            :class="`chip chip-${key+1}`"
            role="button"
            v-for="(i, key) in state.chipValues"
            :key="key"
          >
            <div class="value-wrap"><span>{{ i }}</span></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blackjack',
  computed: {
    state() {
      return this.$store.state.Blackjack
    }
  },
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
    this.$store.dispatch('Blackjack/initGame')

  }
}
</script>
