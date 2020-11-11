import appStore from '../store'
import { shuffle } from '../../utilities'

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
          })
        } else {
          // Push player object for all previous indexes
          state.players.push({
            name: appStore.state.username + '_' + i,
            cards: [],
            value: null,
            bet: null,
            bank: state.startingBank,
            aces: 0,
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
      // console.log(JSON.stringify(state.cards, null, 2))
    },
    deal(state) {
      for (let i = 0; i < 2; i++) {
        state.players.map(x => {
          x.cards.push(state.cards[state.dealCount])
          let value = parseInt(state.cards[state.dealCount].split('-')[1])
          if (value >= 10) {
            value = 10
          }
          if (value === 1) {
            value = 11
            x.aces++
          }
          x.value += value
          state.dealCount++
        })
      }
      // console.log(JSON.stringify(state.players, null, 2))
    },
    placeBet(state, val) {
      state.players[state.playerTurn].bank -= val
      state.players[state.playerTurn].bet = val
    },
    updatePlayerTurn(state) {
      if (state.playerTurn === state.players.length - 2) {
        state.playerTurn = 0
      } else {
        state.playerTurn++
      }
    },
  },
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  actions: {
    initGame(ctx) {
      ctx.commit('initPlayers')
      ctx.commit('shuffleCards')
      ctx.commit('deal')
    }
  }
}
