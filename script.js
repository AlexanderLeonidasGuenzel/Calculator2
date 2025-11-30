document.addEventListener("DOMContentLoaded", () => btnEventListener());

const btnEventListener = () => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => btn.addEventListener("click", inputHandler));
};

function inputHandler(event) {
  const display = document.querySelector("input");
  const dataItem = event.target.dataset.item;

  if (/switch/.test(dataItem)) {
    display.classList.toggle("on");
    reset();
  }
  if (/delete/.test(dataItem)) {
    view(slice(0, -1));
  }
  if (/clear/.test(dataItem)) {
    reset();
  }
  if (/\d/.test(dataItem)) {
    view(dataItem, display.value);
  }
  if (/=/.test(dataItem)) {
    view(calculation());
  }

  if (/[\+\-\*\/]/.test(dataItem)) {
    if (!/[\+\-\*\/]/.test(display.value.slice(-1))) {
      view(dataItem, display.value);
    }
  }
  if (/\./.test(dataItem)) {
    let e = display.value.split(/[\+\-\*\/]/).pop();
    if (e.includes(".") === false) {
      view(dataItem, display.value);
    }
  }
}

/* View help functions*/
function view(item, actualView) {
  if (typeof actualView === "undefined") {
    if (item === "") {
      display.value = "";
    } else {
      display.value = item;
    }
  } else {
    display.value = actualView + item;
  }
}

function slice(start, end) {
  return display.value.slice(start, end);
}

function reset() {
  view("");
}

function calculation() {
  let num = eval(display.value);

  return Number.parseFloat(Number(num).toFixed(12));
}
