new Swiper(".top__slider", {
  spaceBetween: 10,
  loop: true,
//   autoplay: {
//     delay: 3000,
//   },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".top__slider-next",
    prevEl: ".top__slider-prev",
  },
});

new Swiper(".top__slider-news", {
  spaceBetween: 10,
  slidesPerView: 1,
  loop: true,

  breakpoints: {
    768: {
      spaceBetween: 40,
      slidesPerGroup: 1,
      loop: true,
      slidesPerView: "auto",
    },
  },
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".top__slider-next",
    prevEl: ".top__slider-prev",
  },
});
