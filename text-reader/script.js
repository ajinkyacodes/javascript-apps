const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const readBtn = document.getElementById('read');
const clearBtn = document.getElementById('clear');
const stopVoice = document.getElementById('stop-voice-btn');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandma'
  },
  {
    image: './img/movie.jpg',
    text: "I want to watch a movie"
  },
  {
    image: './img/song.jpg',
    text: "I want to listen to a song"
  },
  {
    image: './img/cricket.jpg',
    text: "I want to play cricket"
  },
  {
    image: './img/coding.jpg',
    text: "I want to code"
  },
  {
    image: './img/cooking.jpg',
    text: "I want to cook food"
  },
  {
    image: './img/reading.jpg',
    text: "I want to read a book"
  },
  {
    image: './img/money.jpg',
    text: "I want to earn money"
  },
  {
    image: './img/shopping.jpg',
    text: "I want to go shopping"
  },
  {
    image: './img/dance.jpg',
    text: "I want to dance"
  },
  {
    image: './img/swimming.jpg',
    text: "I want to go swimming"
  },
  {
    image: './img/hiking.jpg',
    text: "I want to go hiking"
  },
  {
    image: './img/travel.jpg',
    text: "I want to travel"
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// SpeechSynthesis: speaking property
const synth = window.speechSynthesis;

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Stop voice
function cancelVoice() {
  synth.cancel(message);
}

// Clear Text Button
function clearText() {
  textarea.value = '';
}

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

// To clear the text
clearBtn.addEventListener('click', clearText);

// To Cancel the voice
stopVoice.addEventListener('click', cancelVoice);


getVoices();