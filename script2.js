const OPERATOR = /[\+\-\*\/]/;
const DELETE = /delete/;
const CLEAR = /clear/;
const DIGIT = /\d/;
const DIGIT_1_TO_9 = /[1-9]/;
const POINT = /\./;
const RESULT = /=/;
const MATH_ERROR = "Math Error";
const display = document.querySelector(".display");
const keys = document.querySelectorAll(".keys");
const powerBtn = document.querySelector("#power");
let calculationString = "";

powerBtn.addEventListener("click", power);
reset();

function inputHandler(event) {
  const dataItem = event.target.dataset.item;

  if (display.value === MATH_ERROR) {
    setDisplay();
  }

  if (DELETE.test(dataItem)) {
    deleteLastElement();
  }

  if (CLEAR.test(dataItem)) {
    reset();
  }

  if (DIGIT.test(dataItem)) {
    handleDigitInput(dataItem);
  }

  if (RESULT.test(dataItem)) {
    let result = calculation();
    if (result === Infinity || result === -Infinity) {
      setDisplay(MATH_ERROR);
      calculationString = "";
    } else {
      calculationString = result.toString();
      setDisplay(result);
    }
  }

  if (display.value.length <= 30) {
    let lastElementisOperator = OPERATOR.test(calculationString.slice(-1));
    if (POINT.test(dataItem)) {
      let e = calculationString.split(OPERATOR).pop();
      if (!e.includes(".")) {
        if (e.slice(-1) === "") {
          appendToDisplay("0" + dataItem);
          calculationString += "0" + dataItem;
        } else {
          appendToDisplay(dataItem);
          calculationString += dataItem;
        }
      }
    }

    if (OPERATOR.test(dataItem)) {
      if (lastElementisOperator === false) {
        calculationString += dataItem;
        if (dataItem === "*") {
          appendToDisplay("x");
        } else if (dataItem === "/") {
          appendToDisplay("÷");
        } else {
          appendToDisplay(dataItem);
        }
      }
    }
  }
}

function handleDigitInput(dataItem) {
  let lastNumber = calculationString.split(OPERATOR).pop();

  let numberHasOtherDigits = DIGIT_1_TO_9.test(lastNumber);
  let numberHasPoint = lastNumber.includes(".");

  if (dataItem === "0") {
    if (
      lastNumber.charAt(0) === "0" &&
      !numberHasOtherDigits &&
      !numberHasPoint
    ) {
      return;
    }
  }

  if (lastNumber.charAt(0) === "0" && !numberHasPoint) {
    deleteLastElement();
  }

  appendToDisplay(dataItem);
  calculationString += dataItem;
}

function deleteLastElement() {
  setDisplay(display.value.slice(0, -1));
  calculationString = calculationString.slice(0, -1);
}

function calculation() {
  return Number.parseFloat(Number(eval(calculationString)).toFixed(9));
}

function setDisplay(value = "") {
  display.value = value;
}

function appendToDisplay(value) {
  display.value += value;
}

function reset() {
  setDisplay();
  calculationString = "";
}

function power() {
  if (display.classList.contains("on")) {
    keys.forEach((b) => b.removeEventListener("click", inputHandler));
    reset();
    display.placeholder = "";
  } else {
    keys.forEach((b) => b.addEventListener("click", inputHandler));
    setDisplay();
    display.placeholder = "0";
  }
  display.classList.toggle("on");
}
