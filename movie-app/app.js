const API_KEY = 'ef019772f1eb8c9d94c0511ec7aeabe9';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}"><i class="fa fa-star" aria-hidden="true"></i> ${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                <span><b>Released:</b> ${dateFormat(release_date)}</span>
                <p>${overview}</p>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if(vote <= 5) {
        return 'red';
    } else {
        return 'aqua';
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm && searchTerm !='') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});

//Reference (Options): https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
function dateFormat(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let formattedDate  = new Date(date);
    return formattedDate.toLocaleDateString("en-IN", options);
}
