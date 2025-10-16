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
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'scoreDisplay';
scoreDisplay.style.marginTop = '10';