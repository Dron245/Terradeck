class Table {
  constructor() {
    this.buttons = document.querySelectorAll(".statistics__contractor");
    this.active;

    [...this.buttons].forEach((button) => {
      button.addEventListener("click", () => {
        const parent = button.parentElement.parentElement;

        if (!this.active) {
          this.active = parent;
        } else if(this.active !== parent) {
          this.active.classList.remove("statistics__table-item--active");
        }
        this.active = parent;
        parent.classList.toggle("statistics__table-item--active");
      });
    });
  }
}

new Table();

const filterButton = document.querySelector(".statistics__filter-button");
const statisticsFilter = document.querySelector(".statistics__filter");
if (filterButton) {
	filterButton.addEventListener("click", () => {
  statisticsFilter.classList.toggle("statistics__filter--active");
});
}

