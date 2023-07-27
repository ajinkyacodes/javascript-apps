let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const scoresDiv = document.querySelector(".scores");
const resultDiv = document.querySelector(".result > p");
const resetButton = document.getElementById("reset-button")

const rockDiv = document.getElementById("rock");
const paperDiv = document.getElementById("paper");
const scissorsDiv = document.getElementById("scissors");

var defeatSound = new Audio(
  "https://praxeds.github.io/theodinproject-rock-paper-scissors/assets/audios/wronganswer-37702.mp3"
);
var victorySound = new Audio(
  "https://praxeds.github.io/theodinproject-rock-paper-scissors/assets/audios/correct-choice-43861.mp3"
);

// Generating computer choice at random
const getComputerChoice = () => {
  const choiceList = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random()*3);
  return (choiceList[randomNumber]);
};

// Convert lowercase choice to uppercase
const convertToUp = (word) => {
  switch(word) {
    case "rock":
      return "Rock";
      break;
    case "paper":
      return "Paper";
      break;
    case "scissors":
      return "Scissors";
      break;
  }
};

// Output for user win
const win = (userChoice, computerChoice) => {
  userScore++;
  userScoreSpan.innerHTML = userScore;
  const randomWin = ["beats", "smashes", "destroys", "obliterates"];
  const randomNumber = Math.floor(Math.random() * 4);
  const winEmojis = ["😁", "💃🏽", "👏🏽", "😅", "😎", "🙌🏽"];
  const randomNumberEmoji = Math.floor(Math.random() * 6);

  resultDiv.innerHTML = `${convertToUp(userChoice)} ${randomWin[randomNumber]} ${convertToUp(computerChoice)}. You win! ${winEmojis[randomNumberEmoji]}`;
  resultDiv.setAttribute("class","result-win");
  victorySound.play();

  document.getElementById(userChoice).classList.add('win-border')
  setTimeout(() => document.getElementById(userChoice).classList.remove('win-border'), 600);
};

// Output for user lose / computer win
const lose = (userChoice, computerChoice) => {
  computerScore++;
  computerScoreSpan.innerHTML = computerScore;
  const randomWin = ["beaten by", "smashed by", "destroyed by", "obliterated by"];
  const randomNumber = Math.floor(Math.random() * 4);
  const loseEmojis = ["😩", "😾", "💩", "😭", "😡", "🤨", "🤦🏽"];
  const randomNumberEmoji = Math.floor(Math.random() * 7);

  resultDiv.innerHTML = `${convertToUp(userChoice)} ${randomWin[randomNumber]} ${convertToUp(computerChoice)}. You lose! ${loseEmojis[randomNumberEmoji]}`;
  resultDiv.setAttribute("class","result-lose");
  defeatSound.play();

  document.getElementById(userChoice).classList.add('lose-border');
  setTimeout(() => document.getElementById(userChoice).classList.remove('lose-border'), 600);

};

// Output for tie
const tie = (userChoice, computerChoice) => {
  const tieEmojis = ["🤯", "😱", "🙈", "🧐", "🙀", "🙃"];
  const randomNumberEmoji = Math.floor(Math.random() * 6);

  resultDiv.innerHTML = `${convertToUp(userChoice)} matches ${convertToUp(computerChoice)}. It's a tie! ${tieEmojis[randomNumberEmoji]}`;
  resultDiv.setAttribute("class","result-tie");

  document.getElementById(userChoice).classList.add('tie-border');
  setTimeout(() => document.getElementById(userChoice).classList.remove('tie-border'), 600);
};

// Comparing computerChoice and userChoice
const game = (userChoice) => {
  const computerChoice = getComputerChoice();

  switch (userChoice + computerChoice) {
    case "paperrock":
    case "rockscissors":
    case "scissorspaper":
      win(userChoice, computerChoice);
      break;

    case "rockpaper":
    case "scissorsrock":
    case "paperscissors":
      lose(userChoice, computerChoice);
      break;

    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      tie(userChoice, computerChoice);
      break;
  }
};

const resetScores = () => {
  computerScore = 0;
  computerScoreSpan.innerHTML = computerScore
  userScore = 0;
  userScoreSpan.innerHTML = userScore;
  resultDiv.innerHTML = "Who will win the game?";
  resultDiv.removeAttribute("class");
};

const main = () => {
  rockDiv.addEventListener('click', () => game("rock"));
  paperDiv.addEventListener('click', () => game("paper"));
  scissorsDiv.addEventListener('click', () => game("scissors"));
  resetButton.addEventListener('click', () => resetScores());
};

main();
