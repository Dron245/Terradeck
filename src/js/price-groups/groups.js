new ShowContent(".price-groups__main-button", true);

const mainButtons = document.querySelectorAll(".price-groups__main-button");

[...mainButtons].forEach((button) => {
  const nextElement = button.nextElementSibling;
  const inputs = nextElement.querySelectorAll(
    ".price-groups__conditions-input"
  );
  mainTextContent(button, inputs);
  [...inputs].forEach((input) =>

    input.addEventListener("click", () =>{
      mainTextContent(button,inputs)})
  );
});

function mainTextContent(button, inputs) {

  [...inputs].forEach((input) => {
    
    if (input.checked) {
      button.children[0].textContent = input.nextElementSibling.textContent;
    }
  });
}


const numbers = document.querySelectorAll('.price-groups__discount-number');


[...numbers].forEach(number => {
  number.addEventListener('input', ({target}) => {
    target.value = target.value.replaceAll(/[^0-9]/g, '')
  })
})