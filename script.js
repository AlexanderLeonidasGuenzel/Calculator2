const keysField = document.querySelectorAll(".keys-field");
const powerBtn = document.querySelector("#power");
const display = document.querySelector(".display");

const MATH_ERROR = "Math Error";

let state = {
  expression: "",
  poweredOn: false,
};

document.querySelector(".keys-field").addEventListener("click", inputHandler);
handleClear();

function powerSwitch() {
  if (display.classList.contains("on")) {
    state.poweredOn = false;
    handleClear();
    display.placeholder = "";
  } else {
    state.poweredOn = true;
    setDisplay();
    display.placeholder = "0";
  }
  display.classList.toggle("on");
}

// Input Handler
function inputHandler(e) {
  const item = e.target.dataset.item;

  if (item === "power") {
    powerSwitch();
  }

  console.log("poweredOn: " + state.poweredOn);
  if (state.poweredOn === false) return;

  if (display.value === MATH_ERROR) {
    setDisplay();
  }

  if (isClear(item)) return handleClear();
  if (isDelete(item)) return handleDelete();
  if (isDigit(item)) return handleDigit(item);
  if (isPoint(item)) return handlePoint();
  if (isOperator(item)) return handleOperator(item);
  if (isResult(item)) return handleResult();
}

// Handler
function handleDigit(digit) {
  if (digit === "0") {
    if (hasLeadingZero() && hasNoOtherDigits() && hasNoPoint()) {
      return;
    }
  }

  if (hasLeadingZero() && hasNoPoint()) {
    handleDelete();
  }
  appendToDisplay(digit);
  state.expression += digit;
}

function handlePoint() {
  if (hasPoint()) return;

  if (isEmptyNumber()) {
    state.expression += "0.";
    appendToDisplay("0.");
  } else {
    state.expression += ".";
    appendToDisplay(".");
  }
}

function handleOperator(operator) {
  if (lastCharIsOperator()) return;

  state.expression += operator;

  if (operator === "*") {
    appendToDisplay("x");
  } else if (operator === "/") {
    appendToDisplay("÷");
  } else {
    appendToDisplay(operator);
  }
}

function handleResult() {
  let result = Number.parseFloat(Number(eval(state.expression)).toFixed(9));

  if (result === Infinity || result === -Infinity) {
    setDisplay(MATH_ERROR);
    state.expression = "";
  } else {
    state.expression = result.toString();
    setDisplay(result);
  }
}

function handleDelete() {
  setDisplay(display.value.slice(0, -1));
  state.expression = state.expression.slice(0, -1);
}

function handleClear() {
  setDisplay();
  state.expression = "";
}

function setDisplay(value = "") {
  display.value = value;
}

function appendToDisplay(value) {
  display.value += value;
}

function isClear(value) {
  return /clear/.test(value);
}

function isDelete(value) {
  return /delete/.test(value);
}

function isDigit(value) {
  return /\d/.test(value);
}

function isPoint(value) {
  return value === ".";
}

function isOperator(value) {
  return /[\+\-\*\/]/.test(value);
}

function isResult(value) {
  return value === "=";
}

function lastCharIsOperator() {
  return isOperator(state.expression.slice(-1));
}

function hasNoOtherDigits() {
  return /[1-9]/.test(lastNumber()) === false;
}

function hasLeadingZero() {
  return lastNumber().charAt(0) === "0";
}

function isEmptyNumber() {
  return lastNumber().charAt(0) === "";
}

function hasNoPoint() {
  return lastNumber().includes(".") === false;
}
function hasPoint() {
  return lastNumber().includes(".") === true;
}

function lastNumber() {
  return state.expression.split(/[\+\-\*\/]/).pop();
}
