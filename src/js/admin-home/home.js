const number = document.querySelector(".admin-home__number");
if (number) {
	IMask(number, {
    mask: '+{7} (000)-000-00-00'
})
}


const hours = document.querySelectorAll(".admin-home__graphic-input");
if (hours) {
	[...hours].forEach((hour) =>
  IMask(hour, {
    mask: "HH:MM",
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 24,
        maxLength: 2,
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 60,
        maxLength: 2,
      },
    },
  })
);
}

