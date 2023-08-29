const search = localStorage.getItem("search");
const moviesWrapper = document.querySelector(".movies");
const headingWrapper = document.querySelector(".header__description");

function onSearchChange(event) {
  const search = event.target.value;
  localStorage.setItem("search", search);
  removeSearch();
  headingWrapper.classList.add("search__performed");
}

function removeSearch() {
  headingWrapper.classList.remove("search__bar");
}

async function renderMovies(filter) {
  moviesWrapper.classList += " movies__loading";
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=e102b275&s=${search}`
  );
  const moviesData = await movies.json();
  moviesWrapper.classList.remove("movies__loading");

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
  renderMovies(event.target.value);
}

function moviesHTML(movie) {
  return `<div class="movie">
  <figure class="movie__img--wrapper">
    <img src="${movie.poster}" class="movie__img" alt="" />
  </figure>
  <div class="movie__title">${movie.title}</div>
</div>`;
}

setTimeout(() => {
  renderMovies();
});
