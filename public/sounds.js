function addingSound() {
  const audio = new Audio("./sounds/adding.mp3");
  audio.play();
  audio.volume = 0.5;
}
function errorSound() {
  const audio = new Audio("./sounds/error.mp3");
  audio.play();
  audio.volume = 0.5;
}
function removeFilmSound() {
  const audio = new Audio("./sounds/remove-sound.mp3");
  audio.play();
  audio.volume = 0.5;
}
function btnClickSound() {
  const audio = new Audio("./sounds/button-when-click-sound.mp3");
  audio.play();
  audio.volume = 0.1;
}
function notificationSound() {
  const audio = new Audio("./sounds/notification-alert.mp3");
  audio.play();
  audio.volume = 0.5;
}
