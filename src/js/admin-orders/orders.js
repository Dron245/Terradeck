const button = document.querySelector(".admin__top-form-check");
const ordersInput = document.querySelectorAll(".admin__check-input");
let bool = true;
if (button) {
	button.addEventListener("click", () => {
  [...ordersInput].forEach(input => {
    input.checked = ordersInput[0].checked
  })
});
}


function checkInput() {

  for (let i = 1; i < ordersInput.length; i++) {
    const input = ordersInput[i]
    console.log(input.checked)
    if (!input.checked) {
      ordersInput[0].checked = false;
      return;
    }
  }

  ordersInput[0].checked = true;
}

document.body.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("admin__check-input") ||
    e.target.classList.contains("admin__check")
  ) {

    checkInput();
  }
});
