const startGameBtn = document.getElementById('start-game-btn');
const pChoiceText = document.getElementById('player-choice-text');
const cChoiceText = document.getElementById('computer-choice-text');
const gameText = document.getElementById('game-text');
const winnerText = document.getElementById('winner-text');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER WINS';
const GAME_TEXT = 'Rock, Paper, Scissors';

let gameIsRunning = false;

const getPlayerChoice = function() {
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();
    if(selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert(`Invalid Choice! We chose ${DEFAULT_USER_CHOICE} for you.`);
        return DEFAULT_USER_CHOICE;
    }
    return selection;
}

const getComputerChoice = function() {
    const randomValue = Math.random();
    if(randomValue < 0.34) {
        return ROCK;
    } else if(randomValue <0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
}

const DEFAULT_USER_CHOICE = getComputerChoice();

const getWinner = function(cChoice, pChoice) {
    if(cChoice === pChoice) {
        return RESULT_DRAW;
    } else if((cChoice === ROCK && pChoice == PAPER) || (cChoice === PAPER && pChoice === SCISSORS) || (pChoice === SCISSORS && pChoice === ROCK)) {
        return RESULT_PLAYER_WINS;
    } else {
        return RESULT_COMPUTER_WINS;
    }
}

startGameBtn.addEventListener('click', function(){
    console.clear();
    gameIsRunning = true;
    console.log('Game is starting...');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);
    console.log('------------------------');
    console.log(GAME_TEXT);
    console.log('Player Choice: ',playerChoice);
    console.log('Computer Choice: ',computerChoice);
    console.log("Result: "+winner);
    console.log('------------------------');
    pChoiceText.textContent = "Player Choice: "+playerChoice;
    cChoiceText.textContent = "Computer Choice: "+computerChoice;
    gameText.textContent = GAME_TEXT;
    winnerText.textContent = "Result: "+winner;
});