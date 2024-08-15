new Swiper(".stocks__slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".stocks__pagination",
    clickable: true,
  },
  breakpoints: {
    600: {
      slidesPerView: 2,
    },

    1000: {
      slidesPerView: 4,
		
    },
  },
});

const officeTop = document.querySelector(".office__wrapper-top");
const officeCompanies = document.querySelector(".office__companies");
const officeTitle = document.querySelector(".office__companies-title");

document.body.addEventListener("click", ({ target }) => {
  if (target == officeTitle && officeTitle) {
    target.classList.toggle("office__companies-title--active");
    officeCompanies.classList.toggle("office__companies--active");
  } else if (target.classList.contains("office__companies-button")) {
    officeTitle.children[0].textContent = target.textContent;
    officeTitle.classList.remove("office__companies-title--active");
    officeCompanies.classList.remove("office__companies--active");
  } else if(officeCompanies) {
    target.classList.remove("office__companies-title--active");
    officeCompanies.classList.remove("office__companies--active");
  }
});

const officeNumber = document.querySelector(".office__form-number");
if (officeNumber) {
	officeNumber.addEventListener("input", ({ target }) => {
		if (!target.value.startsWith('+7')) target.value = "+7" + target.value;
		target.value = target.value.replace(/(?!^\+)\D/g, "");
		if (target.value.length) {
		  target.value = target.value.slice(0, 12);
		}
	 });
}

