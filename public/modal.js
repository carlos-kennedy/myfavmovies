const modalOverlay = document.querySelector("#modal");

let currentMovie = {};
function createModal(data) {
  currentMovie = data;
  if (data.Poster === "N/A") {
    data.Poster = './img/404.png" ';
  }
  modalOverlay.innerHTML = `     <section id="sideImg">
              <h2>
                ${data.Title} - ${data.Year}
              </h2>
              <img
                src="${data.Poster}"
                alt="title" class="poster">
            </section>
            <section id="sideDescFilm">
            <div id="rating"></div>
              <p> DESCRIÇÂO: ${data.Plot}</p>

              <p>Elenco: ${data.Actors}</p>

              <p>Gênero: ${data.Genre}</p>
            </section>

            <button class="addToList" onclick="addCurrentMovieToList()">
              Add to your list
            </button>`;
  ratingStars(currentMovie);
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
document.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
