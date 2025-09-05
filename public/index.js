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
    lupeIcon.setAttribute("state", "morph");
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
    errorSound();
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
        <img src="${movieObject.Poster}" alt="Poster do filme ${movieObject.Title}" onclick="openModalToShowTheInfoOfFilm('${movieObject.imdbID}')" onerror="this.src='./img/404.png'">
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
  addingSound();
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
                alt="title" class="poster" onerror="this.src='./img/404.png'">
            </section>
            <section id="sideDescFilm">
            <div id="rating"></div>
              <p> DESCRIÇÂO: ${movieObject.Plot}</p>

              <p>Elenco: ${movieObject.Actors}</p>

              <p>Gênero: ${movieObject.Genre}</p>
            </section>
<div class="modal-footer">
             <button class="closeModal" onclick="closeModal()">
                <svg viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)" fill="#ffffff"> <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
              </button>
              </div>

`;
  ratingStars(movieObject);
  addingSound();
}

function removeFilmOnList(id) {
  movieList = movieList.filter((movie) => movie.imdbID !== id);
  document.getElementById(`movie-card-${id}`).remove();
  if (movieList.length === 0) {
    whenHaveNotFilm.style.display = "flex";
  }
  updateLocalStorage();
  sw.update();
  removeFilmSound();
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUi(movieInfo);
}

btnSearch.addEventListener("click", () => {
  searchButtonClickHander();
  btnClickSound();
});

document.addEventListener("keydown", (eventy) => {
  if (eventy.key === "Enter") {
    lupeIcon.setAttribute("trigger", "in");
    btnClickSound();
    searchButtonClickHander();
  }
});
