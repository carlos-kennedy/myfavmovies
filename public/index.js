const btnSearch = document.querySelector("button.search");
const btnRemoveFromList = document.querySelector("button.rmvFilm");
const lupeIcon = document.querySelector("button.search #lupeicon");
const inputSearchName = document.querySelector("input#searchName");
const inputSearchYear = document.querySelector("input#searchYear");
const myFavsMovieList = document.querySelector("section#yourFilmFavs");
const wrapperFilmsArticle = document.querySelector("article.wrapperFilms");
const h1WhenNoMovies = document.querySelector("section h1");
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

async function searchButtonClickHander() {
  try {
    let url = `/api/movies?name=${movieNameParameterGen()}&year=${moviYearParameterGen()}`;
    const res = await fetch(url);
    const data = await res.json();
    lupeIcon.setAttribute("state", "morph-check");

    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    createModal(data);
    h1WhenNoMovies.style.visibility = "visible";
    btnSearch.classList.add("check");
    modalOverlay.classList.remove("closed");
    modalOverlay.classList.add("open");
  } catch (error) {
    btnSearch.classList.remove("check");
    btnSearch.classList.add("error");
    lupeIcon.setAttribute("state", "morph-cross");
    modalOverlay.classList.add("closed");

    swal({
      title: error.message,
      icon: "error",
    });
  }
}

function movieNameParameterGen() {
  if (inputSearchName.value === "") {
    throw new Error("Deve ser preenchido com o nome do filme");
  }

  return inputSearchName.value.split(" ").join("+");
}

function moviYearParameterGen() {
  if (inputSearchYear.value === "") {
    return "";
  }
  if (Number.isNaN(Number(inputSearchYear.value))) {
    btnSearch.classList.add("error");
    throw new Error("O ano do filme é inválido");
  } else if (inputSearchYear.value <= 1890) {
    btnSearch.classList.add("error");
    throw new Error("O ano do filme é inválido");
  }
  return `${inputSearchYear.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function updateUi(movieObject) {
  h1WhenNoMovies.style.visibility = "hidden";
  wrapperFilmsArticle.innerHTML += `
   <section class="yourFilmFavs" id="movie-card-${movieObject.imdbID}">
    <h1>${movieObject.Title}</h1>
    <div class="imgFilmFav">
      <div class="poster">
        <img src="${movieObject.Poster}" alt="Poster do filme ${movieObject.Title}">
        <button class="rmvFilm" onclick="removeFilmOnList('${movieObject.imdbID}')">  
          <lord-icon src="https://cdn.lordicon.com/egqwwrlq.json" trigger="hover"
            colors="primary:#646e78,secondary:#242424,tertiary:#ebe6ef,quaternary:#3a3347">
          </lord-icon>
        </button>
      </div>
    </div>
</article>
    `;
}

function isMovieOnList(id) {
  function traccerId(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(traccerId));
}

function removeFilmOnList(id) {
  movieList = movieList.filter((movie) => movie.imdbID !== id);
  document.getElementById(`movie-card-${id}`).remove();
  updateLocalStorage();
  h1WhenNoMovies.style.visibility = "visible";
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

// Faz com que rode apenas uma vez para que o arquivo seja lido
for (const movieInfo of movieList) {
  updateUi(movieInfo);
}

btnSearch.addEventListener("click", () => {
  lupeIcon.setAttribute("trigger", "in");

  searchButtonClickHander();
});
