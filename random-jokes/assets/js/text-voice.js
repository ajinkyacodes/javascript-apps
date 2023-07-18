// TEXT TO VOICE FUNCTIONALITY

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
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Stop voice
function cancelVoice() {
    synth.cancel(message);
}