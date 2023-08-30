const moviesWrapper = document.querySelector(".movies");
const headingWrapper = document.querySelector(".header__description");
let moviesData = {};

function onSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search__input");
  const search = searchInput.value;
  if (search.trim() !== "") {
    onSearchChange(search);
  }
}

function onSearchChange(search) {
  console.log(search);
  fetchMovies(search);
  removeSearch();
  headingWrapper.classList.add("search__performed");
}

function removeSearch() {
  headingWrapper.classList.remove("search__bar");
}

async function fetchMovies(search) {
  moviesWrapper.classList += " movies__loading";
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=e102b275&s=${search}`
  );
  moviesData = await movies.json();
  console.log(moviesData);
  moviesWrapper.classList.remove("movies__loading");
  renderMovies();
}

function renderMovies() {
  if (filter === "OLD_TO_NEW") {
    moviesData.Search.sort((a, b) => a.Year - b.Year);
  }
  if (filter === "NEW_TO_OLD") {
    moviesData.Search.sort((a, b) => b.Year - a.Year);
  }
  moviesWrapper.innerHTML = moviesData.Search.map((movie) =>
    moviesHTML(movie)
  ).join("");
}

function filterMovies(event) {
  event.preventDefault();
  const filter = event.target.value;
  renderMovies();
}

function moviesHTML(movie) {
  return `<div class="movie">
  <figure class="movie__img--wrapper">
    <img src="${movie.Poster}" class="movie__img" alt="${movie.Title}" />
  </figure>
  <div class="movie__title">${movie.Title}</div>
</div>`;
}
