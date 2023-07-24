const API_KEY = "ef019772f1eb8c9d94c0511ec7aeabe9";
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;

const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const open = document.getElementById('open');

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const infoImage = document.querySelector(".movie-content img");
const movieTitle = document.querySelector(".movie-content .movie-info .title");
const released = document.querySelector(".movie-content .movie-info .released");
const overview = document.querySelector(".movie-content .movie-info .overview");
const seatsUL = document.getElementById("seats-booked-ul");
const showDate = document.querySelector(".movie-content .show-date-time .date");
const modalHeader = document.querySelector(".modal-header h3");
const seatsBookedText = document.querySelector(".seats-booked h5");
const amountPaidText = document.querySelector(".movie-content .amount-paid");
const screenNumber = document.querySelector(".movie-content .screen-number");
const bookingID = document.getElementById("booking-id");
const movieRatings = document.getElementById("movie-rantings");
const titleInfo = document.getElementById("title-info");
const seatsText = document.querySelector(".text .seats-text");

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

  //Counting Selected Seat Numbers
	const selectedSeatNumbers = document.querySelectorAll('.seat.selected');
	let seatNumbers = [];
	for(let i=1; i<selectedSeatNumbers.length; i++) {
		seatNumbers.push(selectedSeatNumbers[i].getAttribute('id'));
	}
  localStorage.setItem("seat-numbers", JSON.stringify(seatNumbers));

  const bookID = Math.floor(Math.random() * 100000000);
  const screen1to5 = Math.floor(Math.random() * 5) + 1;
  // Book Ticket Text 
  if(selectedSeatsCount===0 || selectedSeatsCount * ticketPrice === 0) {
    seatsText.innerText = "seats";
    open.style.visibility = "hidden";
    amountPaidText.visibility = "hidden";
  } else if(selectedSeatsCount==1) {
    seatsText.innerText = "seat";
    open.style.visibility = "visible";
    open.innerText = 'Book Ticket';
    modalHeader.innerHTML = `Ticket Booked`;
    seatsBookedText.innerText = "Seat Booked";
    bookingID.innerText = `BOOKING ID: ${bookID}`;
    amountPaidText.innerHTML = `<h5>Total Amount: <span>$${selectedSeatsCount * ticketPrice} (tax incl.)</span></h5>`;
    screenNumber.innerText = `SCREEN${screen1to5}`;
  } else {
    seatsText.innerText = "seats";
    open.innerText = 'Book Tickets';
    modalHeader.innerHTML = `Tickets Booked`;
    seatsBookedText.innerText = `Seats Booked (${selectedSeatsCount})`;
    bookingID.innerText = `BOOKING ID: ${bookID}`;
    amountPaidText.innerHTML = `<h5>Total Amount: <span>$${selectedSeatsCount * ticketPrice} (tax incl.)</span></h5>`;
    screenNumber.innerText = `SCREEN${screen1to5}`;
  }
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

  // moviesData = JSON.stringify(movies);
 localStorage.setItem('movies-data', JSON.stringify(movies));

  movieSelect.innerHTML = "";

  let i = 0;
  movies.forEach((movie) => {
    const { id, title, poster_path, vote_average, overview, release_date } = movie;
    const price = randomIntFromInterval(10, 15);
    const option = document.createElement("option");
    option.value = ticketFixedPrice[i];
    option.setAttribute('id', id);
    option.innerText = `${title} ($${ticketFixedPrice[i]})`;
    movieSelect.appendChild(option);
    i++;
  });
}

// Add Movie Info inside modal
function addMovieInfo() {
  const seatNumbers = JSON.parse(localStorage.getItem('seat-numbers'));
  const movieID = movieSelect.options[movieSelect.selectedIndex].getAttribute("id");
  const moviesData = JSON.parse(localStorage.getItem("movies-data"));
  const singleMovie = moviesData.find(item => item.id == movieID);
  infoImage.setAttribute("src",IMG_PATH + singleMovie.poster_path);
  movieTitle.innerText = singleMovie.title;
  released.innerText = dateFormat(singleMovie.release_date);
  movieRatings.innerHTML = `<i class="fas fa-star"></i>${singleMovie.vote_average} (${formatVotes(singleMovie.vote_count)} Votes)`;
  overview.innerText = singleMovie.overview;
  titleInfo.innerHTML = `<i class="fas fa-ticket-alt"></i> ${singleMovie.title}`;
  seatsUL.innerHTML = "";
  seatNumbers.forEach(sno => {
    const li = document.createElement("li");
    li.innerText = sno;
    seatsUL.appendChild(li);
  });
  showDate.innerText = tomorrowDate();
}

// Show modal
open.addEventListener('click', () => {
  addMovieInfo();
  modal.classList.add('show-modal');
});

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);

// Date Format
function dateFormat(date) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  let formattedDate  = new Date(date);
  return formattedDate.toLocaleDateString("en-IN", options);
}

// Format Tomorrows Date
function tomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  return dateFormat(tomorrow.setDate(tomorrow.getDate() + 1));
}

// format votes
function formatVotes(votes) {
  if(votes < 1000) {
    return votes;
  } else if(votes > 999 && votes < 1000000) {
    const formattedVotes = Math.abs(votes) > 999 ? Math.sign(votes)*((Math.abs(votes)/1000).toFixed(1)) + 'K' : Math.sign(votes)*Math.abs(votes);
    return formattedVotes;
  } else if(votes > 99999 && votes < 1000000000) {
    const formattedVotes = Math.abs(votes) > 99999 ? Math.sign(votes)*((Math.abs(votes)/1000000).toFixed(1)) + 'M' : Math.sign(votes)*Math.abs(votes);
    return formattedVotes;
  } else if(votes > 99999999) {
    const formattedVotes = Math.abs(votes) > 99999999 ? Math.sign(votes)*((Math.abs(votes)/1000000000).toFixed(1)) + 'B' : Math.sign(votes)*Math.abs(votes);
    return formattedVotes;
  }
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
