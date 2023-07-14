const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const clearBtn = document.getElementById('clear');
const stopVoice = document.getElementById('stop-voice-btn');

// SpeechSynthesis: speaking property
const synth = window.speechSynthesis;

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

// Stop voice
function cancelVoice() {
  synth.cancel(message);
}

// Clear Text Button
function clearText() {
  textarea.value = '';
}

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

// To clear the text
clearBtn.addEventListener('click', clearText);

// To Cancel the voice
stopVoice.addEventListener('click', cancelVoice);
