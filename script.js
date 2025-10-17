// Select Elements
const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');


// Score Tracking
let player1Wins = 0;
let player2Wins = 0;
let ties = 0;


// Display Scores
const scoreDisplay = document.getElementById('scoreDisplay');
scoreDisplay.style.marginTop = '10px';
scoreDisplay.innerHTML = `Player 1: ${player1Wins} | Player 2: ${player2Wins} | Ties: ${ties}`


let currentPlayer = 'X';
let boardState = Array(9).fill('');


// Winning combinations
const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6] //diagonals
];


// Handle cell click
function handleClick(e){
    const index = e.target.dataset.index;

    // Ignore click if the cell has been filled
    if(boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.color = currentPlayer === 'X' ? '#007bff' : '#e74c3c';
    e.target.classList.add('disabled');

    message.classList.remove('messageX', 'messageO', 'messageTie');

    // Check if there is a win or a tie
    if(checkWin(currentPlayer)){
        message.textContent = `Player ${currentPlayer === 'X' ? '1' : 2} Wins!`;

        const msgClass = currentPlayer === 'X' ? 'messageX' : 'messageO';
        message.classList.add(msgClass);

        if(currentPlayer === 'X') player1Wins++; else player2Wins++;
        updateScore(currentPlayer);

        disableBoard();

        const winningCombo = winCombos.find(combo =>
            combo.every(index => boardState[index] === currentPlayer)
        );
        winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });

    } else if(boardState.every(cell => cell !== '')){
        message.textContent = "Tie!";
        ties++;
        updateScore('Tie'); 

        message.classList.add('messageTie');
    } else{

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s Turn`;
    }
}

// Check for the win function
function checkWin(player){
    return winCombos.some(combo => combo.every(index => boardState[index] === player));
}


// Disable the board after one player wins
function disableBoard(){
    cells.forEach(cell => cell.classList.add('disabled'));
}


// Update the score display
function updateScore(lastWinner = null){

    scoreDisplay.classList.remove('scoreX', 'scoreO', 'scoreTie', 'pop');

    if(lastWinner === 'X') scoreDisplay.classList.add('scoreX');
    else if(lastWinner === 'O') scoreDisplay.classList.add('scoreO');
    else if(lastWinner === 'Tie') scoreDisplay.classList.add('scoreTie');

    scoreDisplay.innerHTML = `Player 1: ${player1Wins} | Player 2: ${player2Wins} | Ties: ${ties}`;

    void scoreDisplay.offsetWidth;
    scoreDisplay.classList.add('pop');
}


// Reset game function
function resetGame(){
    boardState.fill('');
    cells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('disabled');
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s Turn`;
    
    message.classList.remove('messageX', 'messageO', 'messageTie');
    scoreDisplay.classList.remove('scoreX', 'scoreO', 'scoreTie');
}


// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);