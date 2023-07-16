const statusDisplay = document.querySelector('.game-status');
const cell = document.querySelectorAll('.cell');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            highlightBoxes(winCondition)
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function highlightBoxes(indexes) {
    indexes.forEach(i => {
        cell[i].classList.add('winbox-highlight');
    });
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cell.forEach(cell => cell.classList.remove('winbox-highlight'));
    cell.forEach(cell => cell.innerHTML = "");
}

cell.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);


// Game Color Theme
// document.documentElement.setAttribute('data-theme', 'dark');

const selectedTheme = document.getElementById('theme-select');

// Change Theme Functionality
function switchTheme(theme) {
    if(theme === 'light'){
        selectedTheme.value = 'light';
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
    } else if(theme === 'dark'){
        selectedTheme.value = 'dark';
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if(theme === 'purple-light'){
        selectedTheme.value = 'purple-light';
        localStorage.setItem('theme', 'purple-light');
        document.documentElement.setAttribute('data-theme', 'purple-light');
    } else if(theme === 'purple-dark'){
        selectedTheme.value = 'purple-dark';
        localStorage.setItem('theme', 'purple-dark');
        document.documentElement.setAttribute('data-theme', 'purple-dark');
    } else if(theme === 'coffee-light'){
        selectedTheme.value = 'coffee-light';
        localStorage.setItem('theme', 'coffee-light');
        document.documentElement.setAttribute('data-theme', 'coffee-light');
    } else if(theme === 'coffee-dark'){
        selectedTheme.value = 'coffee-dark';
        localStorage.setItem('theme', 'coffee-dark');
        document.documentElement.setAttribute('data-theme', 'coffee-dark');
    } else if(theme === 'rose-light'){
        selectedTheme.value = 'rose-light';
        localStorage.setItem('theme', 'rose-light');
        document.documentElement.setAttribute('data-theme', 'rose-light');
    } else if(theme === 'rose-dark'){
        selectedTheme.value = 'rose-dark';
        localStorage.setItem('theme', 'rose-dark');
        document.documentElement.setAttribute('data-theme', 'rose-dark');
    } else if(theme === 'blue-light'){
        selectedTheme.value = 'blue-light';
        localStorage.setItem('theme', 'blue-light');
        document.documentElement.setAttribute('data-theme', 'blue-light');
    } else if(theme === 'blue-dark'){
        selectedTheme.value = 'blue-dark';
        localStorage.setItem('theme', 'blue-dark');
        document.documentElement.setAttribute('data-theme', 'blue-dark');
    }
}

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if(currentTheme) switchTheme(currentTheme);

// Event Listener
selectedTheme.addEventListener('change', ()=> switchTheme(selectedTheme.value));
