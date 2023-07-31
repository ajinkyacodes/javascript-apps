const image = document.getElementById("album-cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const spotifyLink = document.getElementById("spotify-link");
const genre = document.getElementById("genre");
const playistName = document.getElementById("playlist-name");
const songs = [];

function main() {

  const spotifySongs = JSON.parse(localStorage.getItem("spotify-songs"));
  if(spotifySongs === null) window.location.href = "playlist.html";

  const spotifyGenre = JSON.parse(localStorage.getItem("spotify-genre"));
  const spotifyPlaylist = JSON.parse(localStorage.getItem("spotify-playlist"));

  if(spotifyGenre !== null && spotifyPlaylist !== null) {
    genre.innerText = spotifyGenre;
    playistName.innerText = spotifyPlaylist;
  } else {
    document.querySelector(".playlist-details").style.display = "none";
  }
  
  let allTracks = spotifySongs;

  // Music
  allTracks.forEach((track) => {
    if (track.preview_url !== null) {

      songs.push({
        name: track.name,
        displayName: track.displayName,
        artist: track.artist,
        preview: track.preview,
        album_cover: track.album_cover,
        spotifyLink: track.spotifyLink
      });
    }
  });

  // On Load - Select First Song
  loadSong(songs[songIndex]);

	return true;
}

// Check if the music is playing
let isPlaying = false;

// Play or Pause Event Listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.innerHTML =  song.artist.length > 40 ? `<marquee behavior="scroll" direction="left">${song.artist.slice(0,-2)}</marquee>` : song.artist.slice(0,-2);
  music.src = song.preview;
  image.src = song.album_cover;
  spotifyLink.href = song.spotifyLink;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching the duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // Delay switching the currentSeconds Element to avoid NaN
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// Set Progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
spotifyLink.addEventListener("click", pauseSong);

main();
