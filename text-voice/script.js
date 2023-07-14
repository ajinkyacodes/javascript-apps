const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const clearBtn = document.getElementById('clear');
const stopVoice = document.getElementById('stop-voice-btn');

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