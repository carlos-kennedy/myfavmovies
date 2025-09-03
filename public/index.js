const btnSearch = document.querySelector("button.search");
const btnRemoveFromList = document.querySelector("button.rmvFilm");
const lupeIcon = document.querySelector("button.search #lupeicon");
const inputSearchName = document.querySelector("input#searchName");
const inputSearchYear = document.querySelector("input#searchYear");
const myFavsMovieList = document.querySelector("section#yourFilmFavs");
const wrapperFilmsArticle = document.querySelector("article.wrapperFilms");
const whenHaveNotFilm = document.querySelector("div.whenHaveNotFilm");
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

const sw = document.querySelector(".swiper").swiper;

async function searchButtonClickHander() {
  try {
    lupeIcon.setAttribute("trigger", "loop");
    let url = `/api/movies?name=${movieNameParameterGen()}&year=${moviYearParameterGen()}`;
    const res = await fetch(url);
    const data = await res.json();
    lupeIcon.setAttribute("state", "morph-check");
    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    createModal(data);
    btnSearch.classList.add("check");
    modalOverlay.classList.remove("closed");
    btnSearch.classList.remove("error");
    modalOverlay.classList.add("open");
    lupeIcon.setAttribute("trigger", "in");
  } catch (error) {
    lupeIcon.setAttribute("trigger", "in");
    lupeIcon.setAttribute("state", "morph-cross");
    btnSearch.classList.remove("check");
    btnSearch.classList.add("error");
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
  if (movieObject.Poster === "N/A") {
    movieObject.Poster = "./img/404.png";
  }

  whenHaveNotFilm.style.display = "none";
  wrapperFilmsArticle.innerHTML += `
   <section class="yourFilmFavs swiper-slide" id="movie-card-${movieObject.imdbID}">
    <h1>${movieObject.Title}</h1>
    <div class="imgFilmFav">
      <div class="poster">
        <img src="${movieObject.Poster}" alt="Poster do filme ${movieObject.Title}" onclick="openModalToShowTheInfoOfFilm('${movieObject.imdbID}')">
        <button class="rmvFilm" onclick="removeFilmOnList('${movieObject.imdbID}')">  
          <lord-icon src="https://cdn.lordicon.com/egqwwrlq.json" trigger="hover"
            colors="primary:#646e78,secondary:#242424,tertiary:#ebe6ef,quaternary:#3a3347">
          </lord-icon>
        </button>
      </div>
    </div>
</article>
    `;
  sw.update();
}

function isMovieOnList(id) {
  function traccerId(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(traccerId));
}

function openModalToShowTheInfoOfFilm(imdbID) {
  const movieObject = movieList.find((movie) => movie.imdbID === imdbID);
  modalOverlay.classList.remove("closed");
  modalOverlay.classList.add("open");
  modalOverlay.innerHTML = `   
    <section id="sideImg">
              <h2>
                ${movieObject.Title} - ${movieObject.Year}
              </h2>
              <img
                src="${movieObject.Poster}"
                alt="title" class="poster" >
            </section>
            <section id="sideDescFilm">
            <div id="rating"></div>
              <p> DESCRIÇÂO: ${movieObject.Plot}</p>

              <p>Elenco: ${movieObject.Actors}</p>

              <p>Gênero: ${movieObject.Genre}</p>
            </section>
`;
  ratingStars(movieObject);
}

function removeFilmOnList(id) {
  movieList = movieList.filter((movie) => movie.imdbID !== id);
  document.getElementById(`movie-card-${id}`).remove();
  if (movieList.length === 0) {
    whenHaveNotFilm.style.display = "flex";
  }
  updateLocalStorage();
  sw.update();
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUi(movieInfo);
}

btnSearch.addEventListener("click", () => {
  searchButtonClickHander();
});

document.addEventListener("keydown", (eventy) => {
  if (eventy.key === "Enter") {
    lupeIcon.setAttribute("trigger", "in");

    searchButtonClickHander();
  }
});
