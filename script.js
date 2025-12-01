document.addEventListener("DOMContentLoaded", () => btnEventListener());

const btnEventListener = () => {
  const buttons = document.querySelectorAll(".keys");
  buttons.forEach((btn) => btn.addEventListener("click", inputHandler));
  reset();
};

let calculationString = "";

function inputHandler(event) {
  const display = document.querySelector("input");
  const dataItem = event.target.dataset.item;
  const SWITCH = /switch/;
  const OPERATOR = /[\+\-\*\/]/;
  const DELETE = /delete/;
  const CLEAR = /clear/;
  const DIGIT = /\d/;
  const POINT = /\./;
  const RESULT = /=/;

  if (SWITCH.test(dataItem)) {
    display.classList.toggle("on");
    reset();
  }

  if (DELETE.test(dataItem)) {
    view(slice(0, -1));
    calculationString = calculationString.slice(0, -1);
  }

  if (CLEAR.test(dataItem)) {
    reset();
  }

  if (DIGIT.test(dataItem)) {
    view(dataItem, display.value);
    calculationString += dataItem;
  }

  if (POINT.test(dataItem)) {
    let e = calculationString.split(OPERATOR).pop();
    if (e.includes(".") === false) {
      view(dataItem, display.value);
      calculationString += dataItem;
    }
  }

  if (OPERATOR.test(dataItem)) {
    let e = calculationString.slice(-1);
    if (!OPERATOR.test(e)) {
      console.log(dataItem);
      calculationString += dataItem;
      if (dataItem === "*") {
        view("x", display.value);
      } else if (dataItem === "/") {
        view("÷", display.value);
      } else {
        view(dataItem, display.value);
      }
    }
  }

  if (RESULT.test(dataItem)) {
    let result = calculation();
    calculationString = result.toString();
    view(result);
    console.log("Result: " + result);
  }

  console.log(calculationString);
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
  calculationString = "";
  console.clear();
}

function calculation() {
  let num;
  if (calculationString === "") {
    num = 0;
  } else {
    num = eval(calculationString);
  }
  return Number.parseFloat(Number(num).toFixed(12));
}
