new Swiper(".mySwiper", {
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 1,
  spaceBetween: 1,
  centeredSlides: true,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 3,
      spaceBetween: 60,
    },
    1000: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
});
