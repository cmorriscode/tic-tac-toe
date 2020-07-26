// Gameboard to control x's and o's
  const gameBoard = [
    {clicked: 'empty', position: 0},
    {clicked: 'empty', position: 1},
    {clicked: 'empty', position: 2},
    {clicked: 'empty', position: 3},
    {clicked: 'empty', position: 4},
    {clicked: 'empty', position: 5},
    {clicked: 'empty', position: 6},
    {clicked: 'empty', position: 7},
    {clicked: 'empty', position: 8},
    ]

  // IIFEs for each game function
const gameFunctions = (() => {
  // Create a div for each object in the gameboard and append to the browser
  const createGameBoard = () => {
    gameBoard.forEach((box, i) => {
      const board = document.querySelector('.game-board')
      let newBox = document.createElement('div')
      newBox.setAttribute('id', i)
      newBox.setAttribute('class', 'game-block')

      board.appendChild(newBox).addEventListener('click', (e) => {
        if (gameBoard[e.target.id].clicked !== 'empty') {
          alert('Pick a spot that hasn\'t been selected')
        } else {
          if (player1.isTurn) {
            newBox.textContent = 'X'
            player1.isTurn = false
            player2.isTurn = true
            gameBoard[e.target.id].clicked = 'x'
            checkXWinner(gameBoard)
            changeBackground()
          } else {
            newBox.textContent = 'O'
            player1.isTurn = true
            player2.isTurn = false
            gameBoard[e.target.id].clicked = 'o'
            checkOWinner(gameBoard)
            changeBackground()
          }
        }
      })
    })
  }
    // Create gameboard specific to playing vs the CPU
    const createGameBoardVsCpu = () => {
    gameBoard.forEach((box, i) => {
      const board = document.querySelector('.game-board')
      let newBox = document.createElement('div')
      newBox.setAttribute('id', i)
      newBox.setAttribute('class', 'game-block')

      board.appendChild(newBox).addEventListener('click', (e) => {
        if (gameBoard[e.target.id].clicked !== 'empty') {
          alert('Pick a spot that hasn\'t been selected')
        } else {
          if (player1.isTurn) {
            newBox.textContent = 'X'
            player1.isTurn = false
            player2.isTurn = true
            gameBoard[e.target.id].clicked = 'x'
            checkXWinner(gameBoard)
            changeBackground()
            startCpuTurn()
          } 
        }
      })
    })
  }

  // Stop players from playing if someone won
  const stopTurns = () => {
    player1.isTurn = false;
    player2.isTurn = false;
  }

  // CPU selects a random box from available selection
  const CpuTurn = () => {
  const availablePositions = gameBoard.filter((box) => {
      return box.clicked === 'empty'
    })
    if (player2.isTurn) {
      const selection = Math.floor(Math.random() * availablePositions.length)
      const boxSelection = availablePositions[selection].position
      gameBoard.forEach((box, i) => {
        if (box.position === boxSelection) {
          gameBoard[i].clicked = 'o'
          document.getElementById(i).textContent = 'O'
        }
      })
      player2.isTurn = false
      player1.isTurn = true
      checkOWinner(gameBoard)
      checkTie(gameBoard)
      changeBackground()
    }
  }

  // One second delay for CPU's turn
  const startCpuTurn = () => {
    setTimeout(CpuTurn, 1000)
  }

  // Result if player 1 wins
  const player1Wins = () => {
    stopTurns()
    const p1 = document.querySelector('.player1-wins h1')
    const p2 = document.querySelector('.player1-wins')
    p1.textContent = `${player1.name} wins the game!`
    p2.style.display = "block"
    player1.wins += 1
    renderWins()

  }

  // Result if player 2 wins
  const player2Wins = () => {
    stopTurns()
    const p1 = document.querySelector('.player2-wins h1')
    const p2 = document.querySelector('.player2-wins')
    p1.textContent = `${player2.name} wins the game!`
    p2.style.display = "block"
    player2.wins += 1
    renderWins()
  }

  // If the game results in a tie
  const tieGame = () => {
    stopTurns()
    const p1 = document.querySelector('.tie-game h1')
    const p2 = document.querySelector('.tie-game')
    p1.textContent = `The game ends in a TIE!`
    p2.style.display = "block"
    renderWins()
  }

  // After each turn, evaluate if a player 1 has won the game
  const checkXWinner = (g) => {
    if (g[0].clicked === 'x' && g[1].clicked === 'x' && g[2].clicked === 'x') {
      player1Wins()
    } else if ((g[3].clicked === 'x' && g[4].clicked === 'x' && g[5].clicked === 'x')) {
      player1Wins()
    } else if ((g[6].clicked === 'x' && g[7].clicked === 'x' && g[8].clicked === 'x')) {
      player1Wins()
    } else if ((g[0].clicked === 'x' && g[3].clicked === 'x' && g[6].clicked === 'x')) {
      player1Wins()
    } else if ((g[1].clicked === 'x' && g[4].clicked === 'x' && g[7].clicked === 'x')) {
      player1Wins()
    } else if ((g[2].clicked === 'x' && g[5].clicked === 'x' && g[8].clicked === 'x')) {
      player1Wins()
    } else if ((g[0].clicked === 'x' && g[4].clicked === 'x' && g[8].clicked === 'x')) {
      player1Wins()
    } else if ((g[2].clicked === 'x' && g[4].clicked === 'x' && g[6].clicked === 'x')) {
      player1Wins()
    } else if (checkTie(gameBoard) === undefined) {
      tieGame()
    }
  }

  // After each turn, evaluate if a player 2 has won the game
  const checkOWinner = (g) => {
    if (g[0].clicked === 'o' && g[1].clicked === 'o' && g[2].clicked === 'o') {
      player2Wins()
    } else if ((g[3].clicked === 'o' && g[4].clicked === 'o' && g[5].clicked === 'o')) {
      player2Wins()
    } else if ((g[6].clicked === 'o' && g[7].clicked === 'o' && g[8].clicked === 'o')) {
      player2Wins()
    } else if ((g[0].clicked === 'o' && g[3].clicked === 'o' && g[6].clicked === 'o')) {
      player2Wins()
    } else if ((g[1].clicked === 'o' && g[4].clicked === 'o' && g[7].clicked === 'o')) {
      player2Wins()
    } else if ((g[2].clicked === 'o' && g[5].clicked === 'o' && g[8].clicked === 'o')) {
      player2Wins()
    } else if ((g[0].clicked === 'o' && g[4].clicked === 'o' && g[8].clicked === 'o')) {
      player2Wins()
    } else if ((g[2].clicked === 'o' && g[4].clicked === 'o' && g[6].clicked === 'o')) {
      player2Wins()
    } else if (checkTie(gameBoard) === undefined) {
      tieGame()
    }
  }

  // Check if there has been a tie
  const checkTie = (g) => {
    const check = g.find((box) => 
      box.clicked === 'empty')
    
    return check
  }

  // Create player 1
  const CreatePlayer1 = () => {
    let name = prompt('Enter Player 1\'s name:')
    !name ? name = 'Player 1' : name = name
    let isTurn = false
    let wins = 0
    return {name, isTurn, wins}
  }

  // Create player 2
  const CreatePlayer2 = () => {
    let name = prompt('Enter Player 2\'s name:')
    !name ? name = 'Player 2' : name = name
    let isTurn = false
    let wins = 0
    return {name, isTurn, wins}
  }

  // Render wins
  const renderWins = () => {
    const queryPlayer1Total = document.querySelector('.player1-total p')
    const queryPlayer2Total = document.querySelector('.player2-total p')
    
    if (!playersCreated) {
      queryPlayer1Total.textContent = 'Wins: 0'
      queryPlayer2Total.textContent = 'Wins: 0'
    } else {
      queryPlayer1Total.textContent = `Wins: ${player1.wins}`
      queryPlayer2Total.textContent = `Wins: ${player2.wins}`
    }
  }

  const renderNames = () => {
    const queryPlayer1Name = document.querySelector('.player1-total h5')
    const queryPlayer2Name = document.querySelector('.player2-total h5')
    queryPlayer1Name.textContent = player1.name
    queryPlayer2Name.textContent = player2.name
  }


  // Begin a new game
  const newGame = () => {
    player1.isTurn = false
    player2.isTurn = false
    player1.wins = 0
    player2.wins = 0
    player1.name = prompt('Enter Player 1\'s name:')
    player2.name = prompt('Enter Player 1\'s name:')

    if (!player1.name) {
      player1.name = 'Player 1'
    }

    if (!player2.name) {
      player2.name = 'Player 2'
    }

    gameBoard.forEach(box => box.clicked = 'empty')

    document.querySelector('.game-board').innerHTML = ''
    document.querySelector('.player1-wins').style.display = 'none'
    document.querySelector('.player1').style.background = '#cdcdcd'
    document.querySelector('.player2').style.background = '#cdcdcd'
    document.querySelector('.player2-wins').style.display = 'none'
    document.querySelector('.tie-game').style.display = 'none'
    gameFlow()
  }

  // Begin a new round
  const newRound = () => {
    player1.isTurn = false
    player2.isTurn = false
    gameBoard.forEach(box => box.clicked = 'empty')

    document.querySelector('.game-board').innerHTML = ''
    document.querySelector('.player1-wins').style.display = 'none'
    document.querySelector('.player1').style.background = '#cdcdcd'
    document.querySelector('.player2').style.background = '#cdcdcd'
    document.querySelector('.player2-wins').style.display = 'none'
    document.querySelector('.tie-game').style.display = 'none'

    if (vsCpu) {
      gameFlowVsCpu()
    } else {
      gameFlow()
    }
  }

  // Change background depending on who's turn it is
  const changeBackground = () => {
    const p1Query = document.querySelector('.player1')
    const p2Query = document.querySelector('.player2')
    if (!player1.isTurn) {
      p2Query.style.background = "#fff"
      p2Query.style.boxShadow = "0 8px 14px rgba(0, 0, 0, .8)"
      p2Query.style.transform = "translateY(-1px) scale(1.1)"
      p1Query.style.background = "#cdcdcd"
      p1Query.style.boxShadow = "0 6px 8px rgba(0, 0, 0, .6)"
      p1Query.style.transform = "translateY(0) scale(1)"
    } else {
      p1Query.style.background = "#fff"
      p1Query.style.boxShadow = "0 8px 14px rgba(0, 0, 0, .8)"
      p1Query.style.transform = "translateY(-1px) scale(1.1)"
      p2Query.style.background = "#cdcdcd"
      p2Query.style.boxShadow = "0 6px 8px rgba(0, 0, 0, .6)"
      p2Query.style.transform = "translateY(0) scale(1)"
    }
  }

  // Randomize who goes first
  const whosFirst = () => {
    const coinFlip = Math.round(Math.random())
    const p1Query = document.querySelector('.player1')
    const p2Query = document.querySelector('.player2')

    coinFlip ? player1.isTurn = true : player2.isTurn = true

    if (player1.isTurn) {
      p1Query.style.background = '#fff'
      p1Query.style.boxShadow = "0 8px 14px rgba(0, 0, 0, .8)"
      p1Query.style.transform = "translateY(-1px) scale(1.1)"
      p2Query.style.background = "#cdcdcd"
      p2Query.style.boxShadow = "0 6px 8px rgba(0, 0, 0, .6)"
      p2Query.style.transform = "translateY(0) scale(1)"
    } else {
      p2Query.style.background = '#fff'
      p2Query.style.boxShadow = "0 8px 14px rgba(0, 0, 0, .8)"
      p2Query.style.transform = "translateY(-1px) scale(1)"
      p1Query.style.background = "#cdcdcd"
      p1Query.style.boxShadow = "0 6px 8px rgba(0, 0, 0, .6)"
      p1Query.style.transform = "translateY(0) scale(1)"
    }
  }

  // Let player select if player vs player or player vs CPU
  const displayGameChoice = () => {
    document.querySelector('.play-game').style.display = 'none'
    document.querySelector('.game-selection').style.display = 'block'
    document.querySelector('.player1-wins').style.display = 'none'
    document.querySelector('.player2-wins').style.display = 'none'
    document.querySelector('.tie-game').style.display = 'none'
  }

  // Create a CPU as player 2
  const createCPU = () => {
    let name = 'CPU'
    let isTurn = false
    let wins = 0
    return {name, isTurn, wins}
  }

  return {createGameBoard, CreatePlayer1, CreatePlayer2, newGame, whosFirst, renderWins, renderNames, newRound, createCPU, displayGameChoice, createGameBoardVsCpu, startCpuTurn}
})()

// Begin the game in a player vs player match
const gameFlow = () => {
  document.querySelector('.play-game').style.display = 'none'
  document.querySelector('.new-game').style.display = "inline-block"
  document.querySelector('.game-selection').style.display = 'none'

  if (!playersCreated) {
    player1 = gameFunctions.CreatePlayer1()
    player2 =  gameFunctions.CreatePlayer2()
    playersCreated = true
  } else if (player2.name === 'CPU') {
    player2.name = prompt('Enter Player 1\'s name:')
    player2.name = prompt('Enter Player 2\'s name:')
  }

  document.querySelector('.player1').textContent = player1.name
  document.querySelector('.player2').textContent = player2.name
  gameFunctions.renderWins()
  gameFunctions.renderNames()
  gameFunctions.whosFirst()
  gameFunctions.createGameBoard()
}

// Begin the game in a player vs CPU match
const gameFlowVsCpu = () => {
  document.querySelector('.play-game').style.display = 'none'
  document.querySelector('.new-game').style.display = "inline-block"
  if (!playersCreated) {
    player1 = gameFunctions.CreatePlayer1()
    player2 =  gameFunctions.createCPU()
    playersCreated = true
  }

  document.querySelector('.player1').textContent = player1.name
  document.querySelector('.player2').textContent = player2.name
  gameFunctions.renderWins()
  gameFunctions.renderNames()
  gameFunctions.whosFirst()
  gameFunctions.createGameBoardVsCpu()
  if (player2.isTurn) {
    gameFunctions.startCpuTurn()
  }
}



document.querySelector('.play-game').addEventListener('click', gameFunctions.displayGameChoice)

document.querySelector('.pvp').addEventListener('click', () => {
  vsCpu = false
  document.querySelector('.game-selection').style.display = 'none'
  gameFlow()
})

document.querySelector('.pve').addEventListener('click', () => {
  vsCpu = true
  document.querySelector('.game-selection').style.display = 'none'
  gameFlowVsCpu()
})

document.querySelectorAll('.new-game').forEach((button) => button.addEventListener('click', () => {
  player1.wins = 0
  player2.wins = 0
  playersCreated = false
  document.querySelector('.game-board').innerHTML = ''
  gameBoard.forEach((box) => box.clicked = 'empty')
  gameFunctions.displayGameChoice()
} ))

document.querySelectorAll('.new-round').forEach((button) => button.addEventListener('click', gameFunctions.newRound))


document.querySelector('.rules').addEventListener('click', (e) => {
  e.target.nextElementSibling.style.display = 'block'
})

document.querySelector('.close-rules').addEventListener('click', (e) => {
  e.target.parentElement.style.display = 'none'
})


let playersCreated = false
let vsCpu = false



const smartCpuPlay = () => {
  if (g[1].clicked === 'o' && g[2].clicked === 'o') {
    gameBoard[0].clicked = 'o'
    document.getElementById('0').textContent = 'O'
  } else if (g[0].clicked === 'o' && g[2].clicked === 'o') {
    gameBoard[1].clicked = 'o'
    document.getElementById('1').textContent = 'O'
  } else if (g[0].clicked === 'o' && g[1].clicked === 'o') {
    gameBoard[2].clicked = 'o'
    document.getElementById('2').textContent = 'O'
  } else if (g[4].clicked === 'o' && g[5].clicked === 'o') {
    gameBoard[3].clicked = 'o'
    document.getElementById('3').textContent = 'O'
  } else if (g[3].clicked === 'o' && g[5].clicked === 'o') {
    gameBoard[4].clicked = 'o'
    document.getElementById('4').textContent = 'O'
  } else if (g[3].clicked === 'o' && g[4].clicked === 'o') {
    gameBoard[5].clicked = 'o'
    document.getElementById('5').textContent = 'O'
  } else if (g[7].clicked === 'o' && g[8].clicked === 'o') {
    gameBoard[6].clicked = 'o'
    document.getElementById('6').textContent = 'O'
  } else if (g[6].clicked === 'o' && g[8].clicked === 'o') {
    gameBoard[7].clicked = 'o'
    document.getElementById('7').textContent = 'O'
  } else if (g[6].clicked === 'o' && g[7].clicked === 'o') {
    gameBoard[8].clicked = 'o'
    document.getElementById('8').textContent = 'O'
  } else if (g[3].clicked === 'o' && g[6].clicked === 'o') {
    gameBoard[0].clicked = 'o'
    document.getElementById('0').textContent = 'O'
  } else if (g[0].clicked === 'o' && g[6].clicked === 'o') {
    gameBoard[3].clicked = 'o'
    document.getElementById('3').textContent = 'O'
  } else if (g[0].clicked === 'o' && g[3].clicked === 'o') {
    gameBoard[6].clicked = 'o'
    document.getElementById('6').textContent = 'O'
  } else if (g[4].clicked === 'o' && g[7].clicked === 'o') {
    gameBoard[1].clicked = 'o'
    document.getElementById('1').textContent = 'O'
  } else if (g[1].clicked === 'o' && g[7].clicked === 'o') {
    gameBoard[4].clicked = 'o'
    document.getElementById('4').textContent = 'O'
  } else if (g[1].clicked === 'o' && g[4].clicked === 'o') {
    gameBoard[7].clicked = 'o'
    document.getElementById('7').textContent = 'O'
  } else if (g[4].clicked === 'o' && g[8].clicked === 'o') {
    gameBoard[0].clicked = 'o'
    document.getElementById('0').textContent = 'O'
  } else if (g[0].clicked === 'o' && g[8].clicked === 'o') {
    gameBoard[4].clicked = 'o'
    document.getElementById('4').textContent = 'O'
  } else if (g[0].clicked === 'o' && g[4].clicked === 'o') {
    gameBoard[8].clicked = 'o'
    document.getElementById('8').textContent = 'O'
  } else if (g[5].clicked === 'o' && g[8].clicked === 'o') {
    gameBoard[2].clicked = 'o'
    document.getElementById('2').textContent = 'O'
  } else if (g[2].clicked === 'o' && g[8].clicked === 'o') {
    gameBoard[5].clicked = 'o'
    document.getElementById('5').textContent = 'O'
  } else if (g[2].clicked === 'o' && g[5].clicked === 'o') {
    gameBoard[8].clicked = 'o'
    document.getElementById('8').textContent = 'O'
  } else if (g[4].clicked === 'o' && g[6].clicked === 'o') {
    gameBoard[2].clicked = 'o'
    document.getElementById('2').textContent = 'O'
  } else if (g[2].clicked === 'o' && g[6].clicked === 'o') {
    gameBoard[4].clicked = 'o'
    document.getElementById('4').textContent = 'O'
  } else if (g[2].clicked === 'o' && g[4].clicked === 'o') {
    gameBoard[6].clicked = 'o'
    document.getElementById('6').textContent = 'O'
  } 
}