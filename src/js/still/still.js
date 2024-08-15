const stillColorInputs = document.querySelectorAll(".still__color-input");

[...stillColorInputs].forEach((input) => {
  input.nextElementSibling.style.backgroundColor = input.value;
  if(hexToRgb(input.value)) {
    input.nextElementSibling.style.border = '1px solid black'
}
  input.addEventListener("input", (e) => {
    if(hexToRgb(e.target.value)) {
        e.target.nextElementSibling.style.border = '1px solid black'
    } else {
        e.target.nextElementSibling.style.border = 'none'
    }
    e.target.nextElementSibling.style.backgroundColor = e.target.value;

  });
});

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;


    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];

    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    
    return isCloseToWhite(r,g,b);
}

function isCloseToWhite(r, g, b) {
    let brightness = 0.299*r + 0.587*g + 0.114*b;
    let threshold = 200; 
    return brightness > threshold;
  }