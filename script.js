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

document.addEventListener("DOMContentLoaded", () => {
  powerBtn.addEventListener("click", power);
  reset();
  menuEvent();
  themeEventListener();
});

function power() {
  if (display.classList.contains("on")) {
    keys.forEach((b) => b.removeEventListener("click", inputHandler));
    reset();
  } else {
    keys.forEach((b) => b.addEventListener("click", inputHandler));
    view("");
  }
  display.classList.toggle("on");
}

function menuEvent() {
  const menuText = document.querySelector(".menu-text");
  menuText.addEventListener("click", function () {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("open");
    if (menu.classList.contains("open")) {
      menuText.textContent = "close";
    } else {
      menuText.textContent = "Menu";
    }
  });
}

function themeEventListener() {
  const galaxyTheme = document.getElementById("theme-galaxy");
  const item = document.querySelectorAll(".menu-item");
  item.forEach((i) =>
    i.addEventListener("click", () => {
      if (i.id === "galaxy") {
        galaxyTheme.disabled = false;
      } else {
        galaxyTheme.disabled = true;
      }
    })
  );
}

function inputHandler(event) {
  const dataItem = event.target.dataset.item;

  if (display.value === MATH_ERROR) {
    view("");
  }
  if (DELETE.test(dataItem)) {
    view(slice(0, -1));
    calculationString = calculationString.slice(0, -1);
  }

  if (CLEAR.test(dataItem)) {
    reset();
    view("");
  }

  if (RESULT.test(dataItem)) {
    let result = calculation();
    if (result === Infinity || result === -Infinity) {
      view(MATH_ERROR);
      calculationString = "";
    } else {
      calculationString = result.toString();
      view(result);
    }
  }

  if (display.value.length <= 30) {
    let displayIsEmpty = display.value === "";
    let lastNumber = calculationString.split(OPERATOR).pop();
    let lastElementisOperator = OPERATOR.test(calculationString.slice(-1));
    let numberHasOtherDigits = DIGIT_1_TO_9.test(lastNumber);
    let numberHasPoint = lastNumber.includes(".");

    if (DIGIT.test(dataItem)) {
      if (dataItem === "0") {
        if (displayIsEmpty || lastElementisOperator) {
          view(dataItem, display.value);
          calculationString += dataItem;
        } else if (numberHasPoint || numberHasOtherDigits) {
          view(dataItem, display.value);
          calculationString += dataItem;
        }
      } else {
        view(dataItem, display.value);
        calculationString += dataItem;
      }
    }

    if (POINT.test(dataItem)) {
      let e = calculationString.split(OPERATOR).pop();
      if (e.includes(".") === false) {
        if (e.slice(-1) === "") {
          view("0" + dataItem, display.value);
          calculationString += "0" + dataItem;
        } else {
          view(dataItem, display.value);
          calculationString += dataItem;
        }
      }
    }

    if (OPERATOR.test(dataItem)) {
      if (lastElementisOperator === false) {
        calculationString += dataItem;
        //view
        if (dataItem === "*") {
          view("\u0078", display.value);
        } else if (dataItem === "/") {
          view("\u00F7", display.value);
        } else {
          view(dataItem, display.value);
        }
      }
    }
  }
  console.log("calculationString: " + calculationString);
}

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
  num = eval(calculationString);
  return Number.parseFloat(Number(num).toFixed(9));
}
