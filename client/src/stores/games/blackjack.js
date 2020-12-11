import appStore from '../store'
import { shuffle, hit } from '../../utilities'

export default {
  namespaced: true,

  state: () => ({
    decksQty: 6,
    cards: null,
    playersQty: 2,
    players: [],
    dealCount: 0,
    playerTurn: 0,
    startingBank: 1000,
    chipValues: [1, 5, 10, 25, 50, 100],
    handout: 5,
    roundState: 'betting',
  }),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  mutations: {
    initPlayers(state) {
      for (let i = 0; i < state.playersQty + 1; i++) {
        if (i === state.playersQty) {
          // Push dealer object on last index of players array
          state.players.push({
            cards: [],
            value: null,
            aces: 0,
            bust: false,
          })
        } else {
          // Push player object for all previous indexes
          state.players.push({
            name: appStore.state.username + '_' + i,
            cards: [],
            value: null,
            bet: null,
            bank: state.startingBank,
            play: null,
            aces: 0,
            bust: false,
          })
        }
      }
    },
    shuffleCards(state) {
      let cards = []
      const suits = ['s', 'h', 'c', 'd']

      for (let i = 0; i < state.decksQty; i++) {
        for (let j = 0; j < suits.length; j++) {
          for (let k = 1; k <= 13; k++) {
            cards.push(`${suits[j]}-${k}`)
          }
        }
      }

      state.cards = shuffle(cards)
      state.cards = [
        'c-1', // p-0
        'd-1', // p-1
        'd-3', // d
        's-10', // p-0
        'h-10', // p-1
        'h-4', // d
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      //   'h-4',
      ]
    },
    deal(state) {
      for (let i = 0; i < 2; i++) {
        state.players.map(x => {
          hit(state, x)
        })
      }
    },
    placeBet(state, val) {
      state.players[state.playerTurn].bank -= val
      state.players[state.playerTurn].bet = val
    },
    hit(state, isDealer = false) {
      if (isDealer) {
        hit(state, state.players[state.players.length - 1])
      } else {
        hit(state, state.players[state.playerTurn])
      }
    },
    payout(state) {
      let dealer = state.players[state.players.length - 1]

      for (let i = 0; i < state.players.length - 1; i++) {
        let player = state.players[i]
        let winAmount

        if (player.play === 'double') {
          player.bank -= player.bet
          player.bet *= 2 // double current bet
          winAmount = Math.floor((player.bet * 2))
        } else {
          winAmount = player.bet * 2
        }

        if (!player.bust) {
          if (dealer.bust) {
            console.log(`Dealer busted so Chris_${i} BEAT the dealer`)
            state.players[i].bank += winAmount
          } else if (player.value > dealer.value) {
            console.log(`Chris_${i} did not bust and BEAT the dealer, ${player.value}-${dealer.value}`)
            state.players[i].bank += winAmount
          } else if (player.value === dealer.value) {
            console.log(`Chris_${i} did not bust and PUSHED with the dealer`)
            let amount = player.bet
            state.players[i].bank += amount
          } else if (player.value < dealer.value && !dealer.bust) {
            console.log(`Chris_${i} did not bust but LOST to the dealer, ${dealer.value}-${player.value}`)
          }
        } else {
          console.log(`Chris_${i} busted so LOST to the dealer`)
        }
      }
    },
    returnHands(state) {
      state.players.map(x => {
        x.cards = []
        x.value = null
        x.bet = null
        x.aces = null
        x.bust = false
        x.play = null
      })
    },
    bankHandout(state, i) {
      state.players[i].bank = state.handout
    },
    updatePlayerTurn(state) {
      if (state.playerTurn === state.players.length - 2) {
        state.playerTurn = 0
      } else {
        state.playerTurn++
      }
    },
    setRoundState(state, str) {
      state.roundState = str
    },
    updatePlay(state, str) {
      state.players[state.playerTurn].play = str
    },
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  actions: {
    initGame({ commit }) {
      commit('initPlayers')
      commit('shuffleCards')
      commit('deal')
    }
  }
}
