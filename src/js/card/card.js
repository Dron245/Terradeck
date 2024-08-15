const swiper = new Swiper(".card__image-slider", {
  slidesPerGroup: 1,
  spaceBetween: 10,
  slidesPerView: 5,
  breakpoints: {
    768: {
      direction: "vertical",
    },
  },
});

new Swiper(".card__slider", {
  pagination: {
    el: " .card__pagination",
    clickable: true,
  },

  thumbs: {
    swiper: swiper,
  },
  navigation: {
    prevEl: ".card__slider-prev",
    nextEl: ".card__slider-next",
  },
});

const cardWrapper = document.querySelector(".card__wrapper");
const cardPagination = document.querySelector(".card__pagination");

new ShowContent(".card__table-color");



