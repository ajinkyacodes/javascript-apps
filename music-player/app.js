const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
      name: 'ArabicKuthu',
      displayName: 'Arabic Kuthu | Beast',
      artist: 'Anirudh Ravichander, Jonita Gandhi',
    },
    {
      name: 'BijleeBijlee',
      displayName: 'Bijlee Bijlee',
      artist: 'Harrdy Sandhu',
    },
    {
      name: 'Bumro',
      displayName: 'Bumro | Notebook',
      artist: 'Vishal Mishra, Kamaal Khan',
    },
    {
      name: 'ButtaBomma',
      displayName: 'Butta Bomma',
      artist: 'Armaan Malik',
    },
    {
      name: 'ManikeMageHithe',
      displayName: 'Manike Mage Hithe',
      artist: 'Yohani, Satheeshan',
    },
    {
      name: 'NaatuNaatu',
      displayName: 'Naatu Naatu | RRR',
      artist: 'Rahul Sipligunj, Kaala Bhairava',
    },
    {
      name: 'Pasoori',
      displayName: 'Pasoori | Coke Studio',
      artist: 'Ali Sethi, Shae Gill',
    },
    {
      name: 'Pinjra',
      displayName: 'Pinjra | Coke Studio',
      artist: 'Sanam Puri, Jonita Gandhi',
    },
    {
      name: 'Rangabati',
      displayName: 'Rangabati | Coke Studio',
      artist: 'Sona Mohapatra',
    },
    {
      name: 'TumTum',
      displayName: 'Tum Tum | Enemy',
      artist: 'Sri vardhini',
    }
];

// Check if the music is playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => { isPlaying ? pauseSong() : playSong(); });

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
