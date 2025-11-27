document.addEventListener("DOMContentLoaded", () => btnEventListener());

const btnEventListener = () => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => btn.addEventListener("click", inputHandler));
  const display = document.querySelector("input");
  display.value = "HELLO";
};

function inputHandler(event) {
  const inputValue = event.target.dataset.item;
  display.value = inputValue;
}
