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
    startingBank: 500,
    chipValues: [1, 5, 10, 25, 50, 100],
  }),
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  mutations: {
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
      console.log(JSON.stringify(state.cards, null, 2))
    },
    initPlayers(state) {
      for (let i = 0; i < state.playersQty + 1; i++) {
        if (i === state.playersQty) {
          // Push dealer object on last index of players array
          state.players.push({
            cards: [],
            value: null,
          })
        } else {
          // Push player object for all previous indexes
          state.players.push({
            cards: [],
            value: null,
            action: null,
            bank: state.startingBank,
          })
        }
      }
    },
    deal(state) {
      for (let i = 0; i < 2; i++) {
        state.players.map(x => {
          x.cards.push(state.cards[state.dealCount])
          state.dealCount++
        })
      }
      console.log(JSON.stringify(state.players, null, 2))
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
