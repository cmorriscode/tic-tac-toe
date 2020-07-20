// Gameboard to control x's and o's
  const gameBoard = [
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    {clicked: 'empty'},
    ]


const gameFunctions = (() => {

  

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

  const player1Wins = () => {
    const p1 = document.querySelector('.player1-wins h1')
    const p2 = document.querySelector('.player1-wins')
    p1.textContent = `${player1.name} wins the game!`
    p2.style.display = "block"
  }

  const player2Wins = () => {
    const p1 = document.querySelector('.player2-wins h1')
    const p2 = document.querySelector('.player2-wins')
    p1.textContent = `${player2.name} wins the game!`
    p2.style.display = "block"
  }

  const tieGame = () => {
    const p1 = document.querySelector('.tie-game h1')
    const p2 = document.querySelector('.tie-game')
    p1.textContent = `The game ends in a TIE!`
    p2.style.display = "block"
  }

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

  const checkTie = (g) => {
    const check = g.find((box) => 
      box.clicked === 'empty')
    
    return check
  }


  const CreatePlayer1 = () => {
    let name = prompt('Enter Player 1\'s name:')
    !name ? name = 'Player 1' : name = name
    let isTurn = false
    return {name, isTurn}
  }

  const CreatePlayer2 = () => {
    let name = prompt('Enter Player 2\'s name:')
    !name ? name = 'Player 2' : name = name
    let isTurn = false
    return {name, isTurn}
  }

  const newGame = () => {
    player1.name = ''
    player2.name = ''
    player1.isTurn = false
    player2.isTurn = false
    gameBoard.forEach(box => box.clicked = 'empty')

    document.querySelector('.game-board').innerHTML = ''
    document.querySelector('.player1-wins').style.display = 'none'
    document.querySelector('.player1').style.background = '#cdcdcd'
    document.querySelector('.player2').style.background = '#cdcdcd'
    document.querySelector('.player2-wins').style.display = 'none'
    document.querySelector('.tie-game').style.display = 'none'
    gameFlow()
  }

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
    // player1.isTurn ? document.querySelector('.player1').style.background = "#ddd" : document.querySelector('.player2').style.background = "#fff"
  }

  return {createGameBoard, CreatePlayer1, CreatePlayer2, newGame, whosFirst}
})()


const gameFlow = () => {
  document.querySelector('.play-game').style.display = 'none'
  document.querySelector('.new-game').style.display = "inline-block"
  player1 = gameFunctions.CreatePlayer1()
  player2 =  gameFunctions.CreatePlayer2()
  document.querySelector('.player1').textContent = player1.name
  document.querySelector('.player2').textContent = player2.name
  gameFunctions.whosFirst()
  gameFunctions.createGameBoard()
}

document.querySelector('.play-game').addEventListener('click', gameFlow)
document.querySelectorAll('.new-game').forEach((button) => button.addEventListener('click', gameFunctions.newGame))
document.querySelector('.rules').addEventListener('click', (e) => {
  e.target.nextElementSibling.style.display = 'block'
})
document.querySelector('.close-rules').addEventListener('click', (e) => {
  e.target.parentElement.style.display = 'none'
})






