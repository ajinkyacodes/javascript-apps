const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const switchBtn = document.getElementById('toggle-theme-btn');
const selectedTheme = document.getElementById('theme-select');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
    // If current display value is 0, replace it, if not then add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed then don't add decimal
    if(awaitingNextValue) return;
    // If no decimal then add one
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent Multiple Operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset All Values, Display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Change Theme Functionality
function switchTheme(theme) {
    if(theme === 'light'){
        selectedTheme.value = 'light';
        localStorage.setItem('theme', 'light');
        switchBtn.children[0].classList.replace('fa-moon', 'fa-sun');
        document.documentElement.setAttribute('data-theme', 'light');
    } else if(theme === 'dark'){
        selectedTheme.value = 'dark';
        localStorage.setItem('theme', 'dark');
        switchBtn.children[0].classList.replace('fa-sun', 'fa-moon');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if(theme === 'green'){
        selectedTheme.value = 'green';
        localStorage.setItem('theme', 'green');
        switchBtn.children[0].classList.replace('fa-sun', 'fa-moon');
        document.documentElement.setAttribute('data-theme', 'green');
    } else if(theme === 'gray'){
        selectedTheme.value = 'gray';
        localStorage.setItem('theme', 'gray');
        switchBtn.children[0].classList.replace('fa-sun', 'fa-moon');
        document.documentElement.setAttribute('data-theme', 'gray');
    }
}

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if(currentTheme) switchTheme(currentTheme);

// Event Listener
clearBtn.addEventListener('click', resetAll);
selectedTheme.addEventListener('change', ()=> switchTheme(selectedTheme.value));
