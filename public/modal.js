const modalOverlay = document.querySelector("#modal");
const htmlRoot = document.querySelector("html");

let currentMovie = {};
function createModal(data) {
  htmlRoot.style.overflow = "hidden";
  currentMovie = data;
  modalOverlay.innerHTML = `     <section id="sideImg">
              <h2>
                ${data.Title} - ${data.Year}
              </h2>
              <img
                src="${data.Poster}"
                alt="title">
            </section>

            <section id="sideDescFilm">
              <p> DESCRIÇÂO: ${data.Plot}</p>

              <p>Elenco: ${data.Actors}</p>

              <p>Gênero: ${data.Genre}</p>
            </section>

            <button class="addToList" onclick="addCurrentMovieToList()">
              Add to your list
            </button>`;
}

function haveSameFilm() {}

function closeModal() {
  modalOverlay.classList.remove("open");
  modalOverlay.classList.add("closed");
  htmlRoot.style.overflow = "auto";
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

modalOverlay.addEventListener("click", closeModal);
