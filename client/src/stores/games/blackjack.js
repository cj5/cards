import { shuffle } from '../../utilities'

export default {
  namespaced: true,

  state: () => ({
    decksQty: 6,
    cards: null,
    dealCount: null,
    dealerHand: [],
    playerHand: [],
  }),
  mutations: {
    shuffleCards(state) {
      let cards = []
      const suits = [ 's', 'h', 'c', 'd' ]

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
    updateDealerHand(state) {
      console.log('updateDealerHand()')
      state.dealerHand.push(state.cards[state.dealCount])
      state.dealCount++
    },
    updatePlayerHand(state) {
      console.log('updatePlayerHand()')
      state.playerHand.push(state.cards[state.dealCount])
      state.dealCount++
    },
  }
}