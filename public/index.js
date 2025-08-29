const btnSearch = document.querySelector("button.search");
const btnRemoveFromList = document.querySelector("button.rmvFilm");
const lupeIcon = document.querySelector("button.search #lupeicon");
const inputSearchName = document.querySelector("input#searchName");
const inputSearchYear = document.querySelector("input#searchYear");
const myFavsMovieList = document.querySelector("section#yourFilmFavs");

let movieList = [];
async function searchButtonClickHander() {
  try {
    // /api/movies?name=<nome_do_filme>&year=<ano_do_filme>
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
    modalOverlay.classList.add("open");
  } catch (error) {
    lupeIcon.setAttribute("state", "morph-cross");
    modalOverlay.classList.add("closed");
    btnSearch.classList.add("error");

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

btnSearch.addEventListener("click", () => {
  lupeIcon.setAttribute("trigger", "in");

  searchButtonClickHander();
});

function addToList(movieObject) {
  movieList.push(movieObject);
}

function updateUi(movieObject) {
  myFavsMovieList.innerHTML += `
    <h1>${movieObject.Title}</h1>
    <div class="imgFilmFav">
      <div class="poster">
        <img src="${movieObject.Poster}" alt="Poster do filme ${movieObject.Title}">
        <button class="rmvFilm">
          Remover
          <lord-icon src="https://cdn.lordicon.com/egqwwrlq.json" trigger="hover"
            colors="primary:#646e78,secondary:#242424,tertiary:#ebe6ef,quaternary:#3a3347">
          </lord-icon>
        </button>
      </div>
    </div>
  `;
}

function isMovieOnList(id) {
  function traccerId(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(traccerId));
}
