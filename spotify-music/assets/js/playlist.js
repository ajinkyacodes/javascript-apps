const APIController = (function () {
  // Spotify Toeken
  const clientId = "48b75718e8954b2584c354edb7016720";
  const clientSecret = "99ffc3b75ee04b69b9a5a8c19d7b9980";

  // private methods
  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  };

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
    const result = await fetch(`${tracksEndPoint}`, {
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

  return {
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    },
  };
})();

// UI Module
const UIController = (function () {
  //object to hold references to html selectors
  const DOMElements = {
    selectGenre: "#select_genre",
    selectPlaylist: "#select_playlist",
    buttonSubmit: "#btn_submit",
    divSongDetail: "#song-detail",
    hfToken: "#hidden_token",
    divSonglist: ".song-list",
  };

  //public methods
  return {
    //method to get input fields
    inputField() {
      return {
        genre: document.querySelector(DOMElements.selectGenre),
        playlist: document.querySelector(DOMElements.selectPlaylist),
        tracks: document.querySelector(DOMElements.divSonglist),
        submit: document.querySelector(DOMElements.buttonSubmit),
        songDetail: document.querySelector(DOMElements.divSongDetail),
      };
    },

    // need methods to create select list option
    createGenre(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document
        .querySelector(DOMElements.selectGenre)
        .insertAdjacentHTML("beforeend", html);
    },

    createPlaylist(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document
        .querySelector(DOMElements.selectPlaylist)
        .insertAdjacentHTML("beforeend", html);
    },

    resetPlaylist() {
      this.inputField().playlist.innerHTML = "";
    },

    storeToken(value) {
      document.querySelector(DOMElements.hfToken).value = value;
    },

    getStoredToken() {
      return {
        token: document.querySelector(DOMElements.hfToken).value,
      };
    },
  };
})();

const APPController = (function (UICtrl, APICtrl) {
  // get input field object ref
  const DOMInputs = UICtrl.inputField();

  // get genres on page load
  const loadGenres = async () => {
    //get the token
    const token = await APICtrl.getToken();
    //store the token onto the page
    UICtrl.storeToken(token);
    //get the genres
    const genres = await APICtrl.getGenres(token);
    //populate our genres select element
    genres.forEach((element) => UICtrl.createGenre(element.name, element.id));
  };

  // create genre change event listener
  DOMInputs.genre.addEventListener("change", async () => {
    //reset the playlist
    UICtrl.resetPlaylist();
    //get the token that's stored on the page
    const token = UICtrl.getStoredToken().token;
    // get the genre select field
    const genreSelect = UICtrl.inputField().genre;
    // get the genre id associated with the selected genre
    const genreId = genreSelect.options[genreSelect.selectedIndex].value;
    // ge the playlist based on a genre
    const playlist = await APICtrl.getPlaylistByGenre(token, genreId);
    // create a playlist list item for every playlist returned
    playlist.forEach((p) => UICtrl.createPlaylist(p.name, p.tracks.href));

    const spotifyGenre = genreSelect.options[genreSelect.selectedIndex].text;
    localStorage.setItem('spotify-genre', JSON.stringify(spotifyGenre))

    document.getElementById("btn_submit").innerText = "Go to playlist";
    document.getElementById("btn_submit").removeAttribute("disabled");
  });

  // create submit button click event listener
  DOMInputs.submit.addEventListener("click", async (e) => {
    // prevent page reset
    e.preventDefault();
    //get the token
    const token = UICtrl.getStoredToken().token;
    // get the playlist field
    const playlistSelect = UICtrl.inputField().playlist;
    // get track endpoint based on the selected playlist
    const tracksEndPoint =
      playlistSelect.options[playlistSelect.selectedIndex].value;
    // get the list of tracks
    const tracks = await APICtrl.getTracks(token, tracksEndPoint);

    // Music Logic
    let songs = [];
    let allTracks = tracks;

    allTracks.forEach((track) => {
      if (track.track.preview_url !== null) {
        artists = "";
        track.track.artists.forEach((element) => {
          artists = element.name + ", " + artists;
        });

        songs.push({
          name: track.track.name,
          displayName: track.track.name,
          artist: artists,
          preview: track.track.preview_url,
          album_cover: track.track.album.images[0].url,
          spotifyLink: track.track.uri,
        });
      }
    });

    localStorage.setItem("spotify-songs", "");
    localStorage.setItem("spotify-songs", JSON.stringify(songs));

    const spotifyPlaylist = playlistSelect.options[playlistSelect.selectedIndex].text;
    localStorage.setItem("spotify-playlist", JSON.stringify(spotifyPlaylist));

    window.location.href = "index.html";
  });

  return {
    init() {
      console.log("App is starting");
      loadGenres();
    },
  };
})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();
