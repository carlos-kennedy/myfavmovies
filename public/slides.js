new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 1,
  centeredSlides: true,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    700: {
      slidesPerView: 3,
      spaceBetween: 60,
    }
  },
});
