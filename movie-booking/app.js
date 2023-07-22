const API_KEY = "ef019772f1eb8c9d94c0511ec7aeabe9";
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;

const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();

let ticketPrice = +movieSelect.value;

// Initial count and total set on window load
window.addEventListener("load", ()=> {
	ticketPrice = +movieSelect.value;
	updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Movie select event
movieSelect.addEventListener("change", (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Random Ticket Price Functionality
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fixed Ticket Price
const ticketFixedPrice = {
  0: 12,
  1: 14,
  2: 12,
  3: 11,
  4: 12,
  5: 10,
  6: 13,
  7: 12,
  8: 11,
  9: 14,
};

// Fetching latest movies data
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results.slice(0, 10));
}

// Show Latest Movies in SelectBox
function showMovies(movies) {
  movieSelect.innerHTML = "";

  let i = 0;
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const price = randomIntFromInterval(10, 15);
    const option = document.createElement("option");
    option.value = ticketFixedPrice[i];
    option.innerText = `${title} ($${ticketFixedPrice[i]})`;
    movieSelect.appendChild(option);
    i++;
  });
}

// Get data from localstorage and populate UI
function populateUI() {
  // Get initial movies
  getMovies(API_URL).then(() => {
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  });

  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}
