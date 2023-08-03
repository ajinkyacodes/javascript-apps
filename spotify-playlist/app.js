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
const songs = [];

// Spotify Toeken
const clientId = "48b75718e8954b2584c354edb7016720";
const clientSecret = "99ffc3b75ee04b69b9a5a8c19d7b9980";

// private methods
const _getToken = async () => {

	const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
					'Content-Type' : 'application/x-www-form-urlencoded', 
					'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
			},
			body: 'grant_type=client_credentials'
	});

	const data = await result.json();
	return data.access_token;
}

const _getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const _getPlaylistByGenre = async (token, genreId) => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists.items;
};

const _getTracks = async (token, tracksEndPoint) => {
  const limit = 10;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data.items;
};

const _getTrack = async (token, trackEndPoint) => {
  const result = await fetch(`${trackEndPoint}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data;
};

async function main() {
  const token = await _getToken();
  const genres = await _getGenres(token); // 1: Bollywood
  const playlist = await _getPlaylistByGenre(token, genres[1].id);
  const tracks = await _getTrack(token, playlist[0]["tracks"]["href"]);
  const allTracks = tracks.items; // slice(0, 20) for selecting Top 20 tracks

  // Music
  allTracks.forEach((track) => {
    if (track.track.preview_url !== null) {

      artists = "";
      track.track.artists.forEach(element => {
        artists = element.name+', '+artists; 
      });

      songs.push({
        name: track.track.name,
        displayName: track.track.name,
        artist: artists,
        preview: track.track.preview_url,
        album_cover: track.track.album.images[0].url,
        spotifyLink: track.track.uri
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
