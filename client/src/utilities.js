const shuffle = (array) => {
  let currentIndex = array.length, tempValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
}

const hit = (state, currentPlayer) => {
  currentPlayer.cards.push(state.cards[state.dealCount])
  state.dealCount++

  currentPlayer.aces = 0
  currentPlayer.value = 0

  currentPlayer.cards.map(x => {
    let val = parseInt(x.split('-')[1])

    if (val > 10) val = 10

    if (val === 1) {
      val = 11
      currentPlayer.aces++
    }

    currentPlayer.value += val
  })

  if (currentPlayer.value > 21) {
    let subVal = 0
    if (currentPlayer.aces > 0) {
      for (let i = 0; i < currentPlayer.aces; i++) {
        subVal = 10 * (i + 1)
        if (currentPlayer.value - subVal <= 21) {
          currentPlayer.value -= subVal
          break
        }
      }
    }
    if (currentPlayer.value > 21) {
      currentPlayer.value -= subVal
      currentPlayer.bust = true
    }
  }
}

export {
  shuffle,
  hit,
}