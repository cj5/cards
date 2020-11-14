<template>
  <div id="blackjack">
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
            <img
              :src="img('card-back.png')"
              class="card-back"
              v-if="key_i === state.players.length - 1 && key_j === 0"
              ref="cardBack"
            />
          </div>
          <div class="player-label">
            <div class="flex">
              <span class="icon-user"></span>
              <p class="player-name" ref="playerName"></p>
            </div>
            <div class="player-value bold hide" ref="playerValue">10</div>
          </div>
          <div class="bust-filter hide">
            <p>Bust</p>
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
      <div class="dashboard directions" v-if="directions !== ''">
        <p class="bold" v-html="directions"></p>
      </div>
      <div class="dashboard action" v-if="state.roundState !== 'dealer'">
        <div class="bet" v-if="state.roundState === 'betting'">
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
            <p class="btn-sm-replace tac fwn mt-1" v-else>Place a bet</p>
          </div>
        </div>
        <div class="play flex fdc" v-else-if="state.roundState === 'playing'">
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
              @click="double"
              @keyup.enter="double"
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
      canDouble: true,
      canSplit: false,
      canInsure: false,
    }
  },
  computed: {
    state() {
      return this.$store.state.Blackjack
    },
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
        this.$store.commit('Blackjack/setRoundState', 'playing')
        this.$refs.player.map(x => x.classList.remove('pre-deal'))
        this.updatePlayerWidth()
        this.updatePlayerValue()
      } else {
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.bet}`
      }

      this.updatePlayerTurn()

      if (this.state.roundState === 'betting') {
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.bet}`
      } else if (this.state.roundState === 'playing') {
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.play}`
      }

      this.updateActive()
    },
    allInBet() {
      this.currentBet = this.state.players[this.state.playerTurn].bank
    },
    resetBet() {
      this.currentBet = 0
    },

    // PLAYING ACTIONS
    stand() {
      if (this.state.playerTurn === this.state.players.length - 2) {
        this.dealer()
      }
      if (this.state.roundState === 'playing') {
        this.updatePlayerTurn()
        this.directions = `${this.state.players[this.state.playerTurn].name}, ${this.dirs.play}`
      }
    },
    hit() {
      this.$store.commit('Blackjack/hit')
      this.updatePlayerValue()
      this.updatePlayerWidth()
      this.checkBust()
    },
    double() {
      this.state.players[this.state.playerTurn].bet *= 2
      this.$store.commit('Blackjack/hit')
      this.updatePlayerValue()
      this.updatePlayerWidth()
      this.checkBust('double')
    },
    dealer() {
      this.$store.commit('Blackjack/setRoundState', 'dealer')
      this.$refs.player.map(x => x.classList.remove('active'))
      this.$refs.cardBack[0].classList.add('hide')
      this.updatePlayerValue()

      let dealer = this.state.players[this.state.players.length - 1]
      while (dealer.value < 17) {
        this.$store.commit('Blackjack/hit', true)
        this.updatePlayerValue()
        this.updatePlayerWidth()
        this.checkBust()
      }
      this.checkBust()

      this.payout()
    },
    payout() {
      let dealer = this.state.players[this.state.players.length - 1]

      for (let i = 0; i < this.state.players.length - 1; i++) {
        let player = this.state.players[i]

        if (!player.bust) {
          if (dealer.bust) {
            console.log(`Dealer busted so Chris_${i} BEAT the dealer`)
            let amount = player.bet * 2
            this.$store.commit('Blackjack/payout', { i, amount })
          } else if (player.value > dealer.value) {
            console.log(`Chris_${i} did not bust and BEAT the dealer, ${player.value}-${dealer.value}`)
            let amount = player.bet * 2
            this.$store.commit('Blackjack/payout', { i, amount })
          } else if (player.value === dealer.value) {
            console.log(`Chris_${i} did not bust and PUSHED with the dealer`)
            let amount = player.bet
            this.$store.commit('Blackjack/payout', { i, amount })
          } else if (player.value < dealer.value && !dealer.bust) {
            console.log(`Chris_${i} did not bust but LOST to the dealer, ${dealer.value}-${player.value}`)
          }
        } else {
          console.log(`Chris_${i} busted so LOST to the dealer`)
        }
      }

      setTimeout(() => {
        this.nextRound()
        console.log('nextRound() ==================')
      }, 5000)
    },
    nextRound() {
      this.$store.commit('Blackjack/setRoundState', 'betting')
      this.updatePlayerTurn()
      this.$refs.cardBack[0].classList.remove('hide')
      this.$refs.player.map(x => {
        x.classList.add('pre-deal')
        x.childNodes[x.childNodes.length - 1].classList.add('hide')
      })
      this.state.players.map((x, i) => {
        if (x.bank === 0) this.$store.commit('Blackjack/bankHandout', i)
      })
      this.directions = `${this.state.players[0].name}, ${this.dirs.bet}`
      this.updatePlayerValue()
      this.updatePlayerWidth()
      this.$store.commit('Blackjack/returnHands')
      this.$store.commit('Blackjack/deal')
    },

    // UI
    updatePlayerTurn() {
      console.log('updatePlayerTurn()')
      this.$store.commit('Blackjack/updatePlayerTurn')
      this.updateActive()
    },
    updatePlayerWidth() {
      this.$nextTick(() => {
        this.$refs.player.map(x => {
          let cardQty = x.childNodes.length - 2
          let cardWidth = x.childNodes[1].offsetWidth
          let cardOffset = 30 // match to `$card-offset` in blackjack.scss
          let w = ((cardQty - 1) * cardOffset) + cardWidth
          x.style.width = w + 'px'
        })
      })
    },
    updatePlayerValue() {
      this.$refs.player.map((x, i) => {
        this.$refs.playerValue[i].textContent = this.state.players[i].value
        if (this.state.roundState !== 'betting') {
          this.$refs.playerValue[i].classList.remove('hide')
        } else {
          this.$refs.playerValue[i].classList.add('hide')
        }
        if (this.state.roundState === 'playing') {
          // dealer
          if (i === this.state.players.length - 1) {
            let val = parseInt(this.state.players[i].cards[1].split('-')[1])
            if (val > 10) val = 10
            if (val === 1) val = 11
            this.$refs.playerValue[i].textContent = val
          } else {
            this.$refs.playerValue[i].textContent = this.state.players[i].value
          }
        }
      })
    },
    updateActive() {
      this.$refs.player.map(x => x.classList.remove('active'))
      this.$refs.player[this.state.playerTurn].classList.add('active')
    },
    checkBust(playType = '') {
      if (this.state.roundState === 'dealer') {
        const s = '<br>Starting next round...'
        let dealerIndex = this.state.players.length - 1
        let dealer = this.state.players[dealerIndex]
        if (dealer.bust) {
          let el = this.$refs.player[dealerIndex]
          el.childNodes[el.childNodes.length - 1].classList.remove('hide')
          this.directions = `Dealer busted with ${dealer.value} ${s}`
        } else {
          this.directions = `Dealer has ${dealer.value} ${s}`
        }
      } else {
        for (let i = 0; i < this.state.players.length; i++) {
          if (this.state.players[i].bust && i === this.state.playerTurn) {
            let el = this.$refs.player[i]
            el.childNodes[el.childNodes.length - 1].classList.remove('hide')
            if (i === this.state.players.length - 2) {
              this.dealer()
            } else {
              this.updatePlayerTurn()
              break
            }
          }
          if (!this.state.players[i].bust && i === this.state.playerTurn) {
            if (playType === 'double') {
              if (i === this.state.players.length - 2) {
                this.dealer()
              } else {
                this.updatePlayerTurn()
                break
              }
            }
          }
        }
      }
    }
  },
  created() {
    this.$store.dispatch('Blackjack/initGame')
  },
  mounted() {
    this.$refs.player.map((x, i) => {
      if (i === this.$refs.player.length - 1) {
        this.$refs.playerName[i].textContent = 'Dealer'
      } else {
        this.$refs.playerName[i].textContent = this.state.players[i].name
      }
    })
    this.directions = `${this.state.players[0].name}, ${this.dirs.bet}`
    this.updatePlayerWidth()
  }
}
</script>
