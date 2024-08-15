new ShowContent(".assortment__table-color");
new ShowContent(".assortment__table-button", true);

const buttons = document.querySelectorAll(".assortments");

const form = document.querySelector(".assortment__form-wrapper");

document.body.addEventListener("click", ({ target }) => {
  if (target.classList.contains("assortment__menu-button")) {
    form.classList.toggle("assortment__form-wrapper--active");
  }
});

class Checkbox {
  constructor(className) {
    this.checkboxItems = document.querySelectorAll(className);

    [...this.checkboxItems].forEach((node) => {
      console.log(node.children.length);
      const length = node.children.length;

      if (length > 5) {
        this.check(node);
      }
    });
  }

  check = (node) => {
    const elements = [...node.children].slice(5);
    elements.forEach((el) => (el.style.display = "none"));
    const button = document.createElement("button");
    const buttonTwo = document.createElement("button");
    button.type = "button";
    buttonTwo.type = "button";
    button.classList.add("assortment__form-button");
    buttonTwo.classList.add("assortment__form-button");
    button.textContent = "Показать еще";
    buttonTwo.textContent = "Свернуть";
    buttonTwo.style.display = "none";
    button.addEventListener("click", () => {
      elements.forEach((el) => (el.style.display = "block"));
      buttonTwo.style.display = 'block'
      button.style.display = 'none'
    });

    buttonTwo.addEventListener("click", () => {
      elements.forEach((el) => (el.style.display = "none"));
      button.style.display = 'block'
      buttonTwo.style.display = 'none'
    });
    node.after(button);
    node.after(buttonTwo);
  };
}

new Checkbox(".assortment__filter-list");

const prices = document.querySelectorAll(".assortment__price-input");

[...prices].forEach((price) => {
  price.addEventListener("input", ({ target }) => {
    target.value = target.value.replaceAll(/[^0-9]/g, "");
  });
});
