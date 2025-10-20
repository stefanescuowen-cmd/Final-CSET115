const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const restartButton = document.querySelector('#restart')

let board = Array(9).fill(null)
let xIsNext = true
let isGameOver = false

const scoreXEl = document.querySelector('#scoreX')
const scoreOEl = document.querySelector('#scoreO')

let scores = {
  X: Number(sessionStorage.getItem('scoreX') || 0),
  O: Number(sessionStorage.getItem('scoreO') || 0)
}

function updateScoreboard(){
  scoreXEl.textContent = scores.X
  scoreOEl.textContent = scores.O
}

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
]

function createBoard(){
  gameBoard.innerHTML = ''
  board.forEach((cell, idx) => {
    const cellEl = document.createElement('div')
    cellEl.classList.add('square')
    cellEl.dataset.index = idx
    if(cell === 'X'){
      const cross = document.createElement('div')
      cross.classList.add('cross')
      cellEl.appendChild(cross)
    } else if(cell === 'O'){
      const circle = document.createElement('div')
      circle.classList.add('circle')
      cellEl.appendChild(circle)
    }
    cellEl.addEventListener('click', onCellClick)
    gameBoard.appendChild(cellEl)
  })
  updateInfo()
}

function onCellClick(e){
  if(isGameOver) return
  const idx = Number(e.currentTarget.dataset.index)
  if(board[idx]) return 

  board[idx] = xIsNext ? 'X' : 'O'
  xIsNext = !xIsNext
  createBoard()
  const winner = checkWinner()
  if(winner){
    isGameOver = true
    highlightWinning(winner.combo)
    infoDisplay.textContent = `${winner.player} wins!`
    scores[winner.player] = (scores[winner.player] || 0) + 1
    sessionStorage.setItem('scoreX', scores.X)
    sessionStorage.setItem('scoreO', scores.O)
    updateScoreboard()
    return
  }
  if(board.every(Boolean)){
    isGameOver = true
    infoDisplay.textContent = "It's a draw"
    return
  }
}

function checkWinner(){
  for(const combo of winningCombos){
    const [a,b,c] = combo
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      return {player: board[a], combo}
    }
  }
  return null
}

function highlightWinning(combo){
  combo.forEach(i => {
    const cell = gameBoard.querySelector(`[data-index="${i}"]`)
    if(cell) cell.classList.add('win')
  })
}

function updateInfo(){
  if(isGameOver) return
  infoDisplay.textContent = `${xIsNext ? 'X' : 'O'} to move`
}

function resetGame(){
  board = Array(9).fill(null)
  xIsNext = true
  isGameOver = false
  createBoard()
}

restartButton?.addEventListener('click', resetGame)

updateScoreboard()
createBoard()