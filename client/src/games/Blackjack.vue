<template>
  <div id="blackjack" class="container">
    <div class="game-wrap">
      <div class="hands">
        <div
          :class="`player pre-deal ${key_i === 0 ? 'active' : ''}`"
          v-for="(i, key_i) in state.players"
          :key="key_i"
          ref="player"
        >
          <div
            class="card"
            v-for="(j, key_j) in i.cards"
            :key="key_j"
          >
            <div class="card-value">
              <div class="flex fdc aic">
                <span>{{ cardValue(j) }}</span>
                <svg :class="`icon icon-${cardSuit(j)}`">
                  <use :xlink:href="`#icon-${cardSuit(j)}`"></use>
                </svg>
              </div>
            </div>
            <div class="icon-wrap">
              <svg :class="`icon icon-${cardSuit(j)}`">
                <use :xlink:href="`#icon-${cardSuit(j)}`"></use>
              </svg>
            </div>
            <img :src="img('card-back.png')" class="card-back" />
          </div>
        </div>
      </div>
      <div class="dashboard chips">
        <div class="chips-wrap">
          <a
            :class="`chip chip-${key+1}`"
            role="button"
            v-for="(i, key) in state.chipValues"
            :key="key"
            @click="bet(i)"
            @keyup.enter="bet(i)"
          >
            <div class="value-wrap"><span>{{ i }}</span></div>
          </a>
        </div>
      </div>
      <div class="dashboard bank">
        <p class="username">{{ this.$store.state.username }}_{{ state.playerTurn }}</p>
        <div class="flex">
          <p class="subheading mr-1">Bank:</p>
          <p class="bank-value">{{ state.players[state.playerTurn].bank }}</p>
        </div>
      </div>
      <div class="dashboard directions">
        <p class="bold" v-html="directions"></p>
      </div>
      <div class="dashboard action">
        <div class="bet" v-if="roundState === 'betting'">
          <div class="flex">
            <p class="subheading mr-1 mb-2">Current bet:</p>
            <p>{{ currentBet }}</p>
          </div>
          <div class="flex fdc">
            <div class="flex btn-group">
              <a
                role="button"
                class="btn btn-2 sm"
                @click="allInBet"
                @keyup.enter="allInBet"
              >All in</a>
              <a
                role="button"
                class="btn btn-2 sm"
                @click="resetBet"
                @keyup.enter="resetBet"
              >Reset</a>
            </div>
            <a
              role="button"
              class="btn sm tac"
              @click="placeBet"
              @keyup.enter="placeBet"
              v-if="currentBet > 0"
            >Place bet</a>
            <p class="tac fwn mt-1" v-else>Place a bet</p>
          </div>
        </div>
        <div class="play flex fdc" v-else-if="roundState === 'playing'">
          <div class="flex btn-group">
            <a
              role="button"
              class="btn sm"
              @click="stand"
              @keyup.enter="stand"
            >Stand</a>
            <a
              role="button"
              class="btn sm"
              @click="hit"
              @keyup.enter="hit"
            >Hit</a>
          </div>
          <div class="flex btn-group" v-if="canDouble || canSplit || canInsure">
            <a
              role="button"
              class="btn btn-2 sm"
              v-if="canDouble"
            >Double</a>
            <a
              role="button"
              class="btn btn-2 sm"
              v-if="canSplit"
            >Split</a>
            <a
              role="button"
              class="btn btn-2 sm"
              v-if="canInsure"
            >Insure</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blackjack',
  data() {
    return {
      directions: null,
      dirs: {
        bet: 'place your bet',
        play: 'make your move',
      },
      currentBet: 0,
      roundState: 'betting',
      canDouble: false,
      canSplit: false,
      canInsure: false,
    }
  },
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

    // BETTING ACTIONS
    bet(val) {
      if (this.currentBet + val <= this.state.players[this.state.playerTurn].bank) {
        this.currentBet += val
      }
    },
    placeBet() {
      this.$store.commit('Blackjack/placeBet', this.currentBet)
      this.currentBet = 0

      if (this.state.playerTurn === this.state.players.length - 2) {
        this.roundState = 'playing'
        this.$refs.player[this.state.players.length - 1].classList.remove('pre-deal')
        this.$refs.player[0].classList.remove('pre-deal')
        this.updatePlayerWidth()
      } else {
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.bet}`
      }

      this.$store.commit('Blackjack/updatePlayerTurn')

      if (this.roundState === 'betting') {
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.bet}`
      } else if (this.roundState === 'playing') {
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.play}`
      }

      this.$refs.player.map(x => x.classList.remove('active'))
      this.$refs.player[this.$store.state.Blackjack.playerTurn].classList.add('active')
    },
    allInBet() {
      this.currentBet = this.state.players[this.state.playerTurn].bank
    },
    resetBet() {
      this.currentBet = 0
    },

    // PLAYING ACTIONS
    stand() {

    },
    hit() {
      this.state.players[this.state.playerTurn].cards.push(this.state.cards[this.state.dealCount])
      this.updatePlayerWidth()

      this.state.dealCount++
    },

    updatePlayerWidth() {
      this.$nextTick(() => {
        this.$refs.player.map(x => {
          let cardQty = x.childNodes.length
          let cardWidth = x.childNodes[0].offsetWidth
          // match to `$card-offset` in blackjack.scss
          let cardOffset = 30
          let w = ((cardQty - 1) * cardOffset) + cardWidth
          x.style.width = w + 'px'
        })
      })
    },
  },
  created() {
    this.$store.dispatch('Blackjack/initGame')
  },
  mounted() {
    this.directions = `${this.state.players[0].name}, ${this.dirs.bet}`
    this.updatePlayerWidth()

    console.log(JSON.stringify(this.state.players[0], null, 2))
  }
}
</script>
