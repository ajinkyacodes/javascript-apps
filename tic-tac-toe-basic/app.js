const statusDisplay = document.querySelector('.game-status');
const cell = document.querySelectorAll('.cell');
const selectedTheme = document.getElementById('theme-select');

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
    indexes.forEach(i => cell[i].classList.add('winbox-highlight'));
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;
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

// Change Theme Functionality
function switchTheme(theme) {
    const colorThemes = ['light', 'dark', 'purple-light', 'purple-dark', 'coffee-light', 'coffee-dark', 'rose-light', 'rose-dark', 'blue-light','blue-dark'];
    if(colorThemes.includes(theme)) {
        selectedTheme.value = theme;
        localStorage.setItem('ttt-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('ttt-theme');
if(currentTheme) switchTheme(currentTheme);

// Event Listeners
cell.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
selectedTheme.addEventListener('change', ()=> switchTheme(selectedTheme.value));
