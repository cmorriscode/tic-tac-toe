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
            gameFunctions.checkXWinner(gameBoard)
            // gameFunctions.checkTie(gameBoard)
          } else {
            newBox.textContent = 'O'
            player1.isTurn = true
            player2.isTurn = false
            gameBoard[e.target.id].clicked = 'o'
            gameFunctions.checkOWinner(gameBoard)
            // gameFunctions.checkTie(gameBoard)
          }
        }
      })
    })
  }

  const checkXWinner = (g) => {
    if (g[0].clicked === 'x' && g[1].clicked === 'x' && g[2].clicked === 'x') {
      console.log('Player 1 wins')
    } else if ((g[3].clicked === 'x' && g[4].clicked === 'x' && g[5].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if ((g[6].clicked === 'x' && g[7].clicked === 'x' && g[8].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if ((g[0].clicked === 'x' && g[3].clicked === 'x' && g[6].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if ((g[1].clicked === 'x' && g[4].clicked === 'x' && g[7].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if ((g[2].clicked === 'x' && g[5].clicked === 'x' && g[8].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if ((g[0].clicked === 'x' && g[4].clicked === 'x' && g[8].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if ((g[2].clicked === 'x' && g[4].clicked === 'x' && g[6].clicked === 'x')) {
      console.log('Player 1 wins')
    } else if (checkTie(gameBoard) === undefined) {
      console.log('Tie game!')
    }
  }

  const checkOWinner = (g) => {
    if (g[0].clicked === 'o' && g[1].clicked === 'o' && g[2].clicked === 'o') {
      console.log('Player 2 wins')
    } else if ((g[3].clicked === 'o' && g[4].clicked === 'o' && g[5].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if ((g[6].clicked === 'o' && g[7].clicked === 'o' && g[8].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if ((g[0].clicked === 'o' && g[3].clicked === 'o' && g[6].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if ((g[1].clicked === 'o' && g[4].clicked === 'o' && g[7].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if ((g[2].clicked === 'o' && g[5].clicked === 'o' && g[8].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if ((g[0].clicked === 'o' && g[4].clicked === 'o' && g[8].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if ((g[2].clicked === 'o' && g[4].clicked === 'o' && g[6].clicked === 'o')) {
      console.log('Player 2 wins')
    } else if (checkTie(gameBoard) === undefined) {
      console.log('Tie game!')
    }
  }

  const checkTie = (g) => {
    const check = g.find((box) => 
      box.clicked === 'empty')
    
    return check
  }


  const CreatePlayer1 = () => {
    const name = prompt('Enter Player 1\'s name:')
    let isTurn = true
    return {name, isTurn}
  }

  const CreatePlayer2 = () => {
    const name = prompt('Enter Player 2\'s name:')
    let isTurn = false
    return {name, isTurn}
  }

  return {createGameBoard, checkXWinner, checkOWinner, CreatePlayer1, CreatePlayer2, checkTie}
})()


const gameFlow = () => {
  document.querySelector('.play-game').style.display = 'none'
  document.querySelector('.players p').style.visibility = "visible"
  document.querySelector('.new-game').style.display = "inline-block"
  player1 = gameFunctions.CreatePlayer1()
  player2 =  gameFunctions.CreatePlayer2()
  document.querySelector('.player1').textContent = player1.name
  document.querySelector('.player2').textContent = player2.name
  gameFunctions.createGameBoard()
}

document.querySelector('.play-game').addEventListener('click', gameFlow)





