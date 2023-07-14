const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice() {
  message.voice = "Google US English";
}

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});
