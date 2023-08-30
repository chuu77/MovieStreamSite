const apiKey = "e102b275";
const moviesWrapper = document.querySelector(".movies");
const headingWrapper = document.querySelector(".header__description");
let moviesData = {};
let currentFilter = "NEW_TO_OLD";

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
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`
  );

  moviesData = await movies.json();

  console.log(moviesData);
  moviesWrapper.classList.remove("movies__loading");
  setTimeout(() => {
    renderMovies();
  });
}

function renderMovies() {
  let sortedMovies = [...moviesData.Search];
  if (currentFilter === "OLD_TO_NEW") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }
  if (currentFilter === "NEW_TO_OLD") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  }

  moviesWrapper.innerHTML = sortedMovies
    .map((movie) => moviesHTML(movie))
    .join("");
}

function filterMovies(event) {
  event.preventDefault();
  currentFilter = event.target.value;
  renderMovies();
}

function moviesHTML(movie) {
  return `<div class="movie">
  <figure class="movie__img--wrapper">
    <img src="${movie.Poster}" class="movie__img" alt="${movie.Title}" />
  </figure>
  <div class="movie__title">${movie.Title} (${movie.Year})</div>
</div>`;
}

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}
