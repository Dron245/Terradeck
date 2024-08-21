class Controllers {
  constructor() {
    const inputControllers = document.querySelectorAll(".input-controller");
    if (!inputControllers.length) return;

    [...inputControllers].forEach((controller) => {
      const input = controller.querySelector(".input-controller__number");
      const plusButton = input.nextElementSibling;
      const minusButton = input.previousElementSibling;
		if (input.closest('.card__table-point')) {
			const addToCartButton = input.closest('.card__table-point').querySelector('.card__table-button');
      input.addEventListener("input", ({ target }) => {
        target.value = target.value.replace(/\D+/g, "");
        if (target.value.length < 1) {
          target.value = 0;
        } else if (target.value[0] == 0) {
          target.value = target.value.slice(1);
        }
        this.updateHref(addToCartButton, target.value); // Используйте this для вызова метода

      });
      plusButton.addEventListener("click", () => this.plusValue(input, addToCartButton));
      minusButton.addEventListener("click", () => this.minusValue(input, addToCartButton));
		}
      
    });
  }

  plusValue(input, button) {
    console.log("a");
    input.value = Number(input.value) + 1;
    this.updateHref(button, input.value); // Используйте this для вызова метода

  }

  minusValue(input, button) {
    if (input.value > 0) input.value = Number(input.value) - 1;
    this.updateHref(button, input.value); // Используйте this для вызова метода

  }
   updateHref(button, value) {
    const href = button.getAttribute('href');
    button.setAttribute('href', href.replace(/amount=\d+/, 'amount=' + value));
  }
}




class ShowContent {
  constructor(innerButtonsClass, bool, all = false) {
    const innerButtons = document.querySelectorAll(innerButtonsClass);
    this.class = innerButtonsClass.slice(1);
    this.innerClass = "";
    this.innerButtons = innerButtons;
    this.active = null;
    this.bool = bool;

    if (all) {
      [...innerButtons].forEach((button) =>
        button.addEventListener("click", this.showContentAll)
      );
    } else {
      [...innerButtons].forEach((button) =>
        button.addEventListener("click", this.showContent)
      );
    }
  }

  showContent = (e) => {
    let className = this.innerClass;
    let parent = e.target.parentElement;
    if (this.bool) parent = e.target.nextElementSibling;

    if (this.innerClass.length == 0) {
      className = parent.className;
      this.innerClass = className;
    }

    if (this.active && this.active !== parent) {
      this.active.classList.remove(className + "--active");
      if (this.bool) {
        this.active.previousElementSibling.classList.remove(
          this.class + "--active"
        );
      }
    }
    if (this.bool) {
      e.target.classList.toggle(this.class + "--active");
    }
    parent.classList.toggle(className + "--active");
    this.active = parent;
  };

  showContentAll = (e) => {
    let className = this.innerClass;
    let parent = e.target.parentElement;

    if (this.innerClass.length == 0) {
      className = parent.className;
      this.innerClass = className;
    }

    parent.classList.toggle(className.concat("--visible"));
  };
}

class ChangeContents {
  constructor() {
    const content = document.querySelector(".change-contents");

    if (!content) return;
    this.items = {};
    this.itemActive = null;
    this.buttonActive = null;

    [...content.querySelectorAll(".change-contents__item")].forEach((node) => {
      if (node.classList.contains("change-contents__item--active"))
        this.itemActive = node;
      this.items[node.dataset.index] = node;
    });

    [...content.querySelectorAll(".change-contents__button")].forEach(
      (button) => {
        if (button.classList.contains("change-contents__button--active")) {
          this.buttonActive = button;
        }
        button.addEventListener("click", this.showContent);
      }
    );
  }

  showContent = (e) => {
    const btn = e.target;
	if (btn.classList.contains('change-contents__button--active')) {
		return
	}
    if (this.buttonActive && this.buttonActive !== btn) {
      this.buttonActive.classList.remove("change-contents__button--active");
    }
    btn.classList.toggle("change-contents__button--active");
    this.buttonActive = btn;

    this.items[btn.dataset.index].classList.toggle(
      "change-contents__item--active"
    );
    if (this.itemActive && this.itemActive !== this.items[btn.dataset.index]) {
      this.itemActive.classList.remove("change-contents__item--active");
    }

    this.itemActive = this.items[btn.dataset.index];
  };
}

class ButtonSelect {
  constructor() {
    const buttons = document.querySelectorAll(".button-select");
    this.active = {};
    if (!buttons.length) return;

    [...buttons].forEach((button, index) => {
      const wrapper = button.nextElementSibling;
  
      [...wrapper.children].forEach((el) => {
        el.addEventListener("click", () => {
          if (this.active[index])
            this.active[index].classList.remove(
              "select-wrapper__button--active"
            );
          this.active[index] = el;
          this.giveValue(button, el);
          el.closest('.arrange__wrapper').querySelector('input[type="hidden"]').value = el.getAttribute('data-name')
        });
        if (el.classList.contains("select-wrapper__button--active")) {
          this.active[index] = el;
          this.giveValue(button, el);
        }
      });

    

      if (!this.active[index]) {
        button.classList.add("button-select--empty");
        button.getElementsByTagName("span")[0].textContent =
          button.dataset.placeholder;
      }
    });
  }

  giveValue(button, el) {
    if (button.classList.contains("button-select--empty")) {
      button.classList.remove("button-select--empty");
    }
    button.getElementsByTagName("span")[0].textContent = el.textContent;
    button.classList.remove("button-select--active");
    el.parentElement.classList.remove("select-wrapper__button--active");
  }
}

new ChangeContents();
new ButtonSelect();
new Controllers();

const headerProfileButton = document.querySelector(".header__profile");
const profileMenu = document.querySelector(".header__profile-menu");
if (headerProfileButton)
  headerProfileButton.addEventListener("click", () =>
    profileMenu.classList.toggle("header__profile-menu--active")
  );

const menu = document.querySelector(".menu");
const main = document.querySelector(".main");
const panel = document.querySelector(".panel");
const adminMain = document.querySelector(".admin-main");

function search(tag, className) {
  if (!tag) return false;
  if (tag.classList.contains(className)) {
    return true;
  }
  return search(tag.parentElement, className);
}

const popup = document.querySelector(".popup");
let active;
let activeSetting;

document.body.addEventListener("click", ({ target }) => {
  if (menu && target.classList.contains("header__button")) {
    menu.classList.toggle("menu--active");
    main.classList.toggle("main--overflow");
  } else if (
    menu &&
    !search(target, "menu") &&
    menu.classList.contains("menu--active")
  ) {
    menu.classList.remove("menu--active");
  }

  if (target.classList.contains("admin-header__button")) {
    panel.classList.toggle("panel--active");
    adminMain.classList.toggle("admin-main--disable");
  }
  if (popup && target.classList.contains("button-popup")) {
    popup.classList.toggle("popup--active");
  } else if (
    (popup &&
      popup.classList.contains("popup--active") &&
      !search(target, "popup__form")) ||
    (popup && target.classList.contains("popup__cancel"))
  ) {
    popup.classList.remove("popup--active");
  }


 if (active && target !== active ) {
    active.classList.remove("button-select--active");
  }

  if (target.classList.contains("button-select")) {
    target.classList.toggle("button-select--active");
    active = target;
  } 
  
  if(activeSetting && target !== activeSetting) {
    activeSetting.classList.remove("button-setting--active");
  }

  if(target.classList.contains('button-setting')) {
    target.classList.toggle("button-setting--active");
    activeSetting = target;
  }


 
});


new ShowContent(".menu__title", true);
new ShowContent(".admin__wrapper-top", false, true);

const inputsWrappers = document.querySelectorAll(".admin-item-count");

if (inputsWrappers.length) {
  [...inputsWrappers].forEach((inputsWrapper) => {
    const textCount = inputsWrapper.querySelector(".admin__text-count");
    const inputCount =
      inputsWrapper.querySelector(".input") ||
      inputsWrapper.querySelector(".input-textarea");

    textCount.textContent =
      inputCount.value.length + " / " + inputCount.maxLength + " символов";
    inputCount.addEventListener("input", () => {
      textCount.textContent =
        inputCount.value.length + " / " + inputCount.maxLength + " символов";
    });
  });
}

// const buttonSelects = document.querySelectorAll(".button-select");

// if (buttonSelects.length) {
//   [...buttonSelects].forEach((button) => {
//     const wrapper = button.nextElementSibling;
//     button.addEventListener("click", () => {

//     });

//   });
// }

function giveValue(buttons) {
  [...buttons].forEach();
}



if (document.querySelector('.page-404')) {
	document.querySelector('main').classList.add('pagemain404')
}