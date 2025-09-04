const modalOverlay = document.querySelector("#modal");

let currentMovie = {};
function createModal(data) {
  currentMovie = data;
  modalOverlay.innerHTML = `     <section id="sideImg">
  
              <h2>
                ${data.Title} - ${data.Year}
              </h2>
              <img
                src="${data.Poster}"
                alt="${data.Title}" class="poster" 
                onerror="posterExists(this)">
            </section>
            <section id="sideDescFilm">
            <div id="rating"></div>
              <p> DESCRIÇÂO: ${data.Plot}</p>

              <p>Elenco: ${data.Actors}</p>

              <p>Gênero: ${data.Genre}</p>
            </section>
            <div class="modal-footer">
              <button class="addToList" onclick="addCurrentMovieToList()">
                Add to your list
              </button>
              <button class="closeModal" onclick="closeModal()">
                <svg viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)" fill="#ffffff"> <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
              </button>
            </div>`;
  ratingStars(currentMovie);
  if (data.Actors === "N/A" || data.Plot === "N/A" || data.Genre === "N/A") {
    data.Actors = "Desconhecido(s)";
    data.Plot = "Sem descrição disponível..";
    data.Genre = "Desconhecido";
    document.querySelector("button.addToList").style.display = "none";
    sureForAddMovieUnknown();
  }
}

function posterExists(imgPoster) {
  imgPoster.src = "./img/404.png";
  document.querySelector("button.addToList").style.display = "none";
  sureForAddMovieUnknown();
}

function ratingStars(actualMovie) {
  const rating = document.querySelector("#rating");
  const stars = Math.round(actualMovie.imdbRating / 2);
  rating.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= stars) {
      rating.innerHTML += `<lord-icon class="star filled"
    src="https://cdn.lordicon.com/edplgash.json"
    colors="primary:#ffc738,secondary:#242424,tertiary:#ebe6ef"
    trigger="in"
    state="hover-wink">
</lord-icon>`;
    } else {
      rating.innerHTML += `<lord-icon class="star"
    src="https://cdn.lordicon.com/edplgash.json"
    colors="primary:#848484,secondary:#b4b4b4,tertiary:#ebe6ef"
    trigger="in"
    state="hover-wink">
</lord-icon>`;
    }
  }
}

function haveSameFilm() {}

function closeModal() {
  modalOverlay.classList.remove("open");
  modalOverlay.classList.add("closed");
  modalOverlay.classList.remove("movieNotFound");
  btnSearch.classList.remove("error");
  btnSearch.classList.remove("check");
  lupeIcon.setAttribute("state", "morph");
}

function addCurrentMovieToList() {
  if (isMovieOnList(currentMovie.imdbID)) {
    swal({
      title: "Filme já adicionado",
      icon: "info",
    });
    return;
  }
  addToList(currentMovie);
  updateUi(currentMovie);
  updateLocalStorage();
  closeModal();
}

function sureForAddMovieUnknown() {
  swal({
    title: "Filme possui informações desconhecidas",
    text: "Você gostaria de adicioná-lo mesmo assim?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willAdd) => {
    if (willAdd) {
      addCurrentMovieToList();
    } else {
      closeModal();
    }
  });
}
