const display = document.querySelector(".display");
const keys = document.querySelectorAll(".keys");
const powerBtn = document.querySelector("#power");
let calculationString = "0";

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
    view("0");
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
  const OPERATOR = /[\+\-\*\/]/;
  const DELETE = /delete/;
  const CLEAR = /clear/;
  const DIGIT = /\d/;
  const DIGITNONULL = /[1-9]/;
  const POINT = /\./;
  const RESULT = /=/;

  if (DELETE.test(dataItem)) {
    if (display.value.length === 1) {
      view("0");
      calculationString = "0";
    } else {
      view(slice(0, -1));
      calculationString = calculationString.slice(0, -1);
    }
  }

  if (CLEAR.test(dataItem)) {
    reset();
    view("0");
  }

  if (RESULT.test(dataItem)) {
    let result = calculation();
    calculationString = result.toString();
    view(result);
  }

  //append
  if (display.value.length <= 30) {
    if (DIGIT.test(dataItem)) {
      let number = display.value.split(OPERATOR).pop();
      if (dataItem === "0") {
        if (display.value === "" || OPERATOR.test(display.value.slice(-1))) {
          view(dataItem + ".", display.value);
          calculationString += dataItem + ".";
        } else if (number.includes(".")) {
          view(dataItem, display.value);
          calculationString += dataItem;
        } else if (DIGITNONULL.test(number)) {
          view(dataItem, display.value);
          calculationString += dataItem;
        }
      } else {
        if (display.value.slice(-1) === "0" && !DIGITNONULL.test(number)) {
          view(dataItem, slice(0, -1));
          calculationString = calculationString.slice(0, -1) + dataItem;
        } else {
          view(dataItem, display.value);
          calculationString += dataItem;
        }
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
      let e = calculationString.slice(-1);
      if (!OPERATOR.test(e)) {
        calculationString += dataItem;
        if (dataItem === "*") {
          view("*", display.value);
        } else if (dataItem === "/") {
          view("\u00F7", display.value);
        } else {
          view(dataItem, display.value);
        }
      }
    }
  }
  console.log("calstring: " + calculationString);
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
  calculationString = "0";
  console.clear();
}

function calculation() {
  let num;
  if (calculationString === "") {
    num = 0;
  } else {
    num = eval(calculationString);
  }
  return Number.parseFloat(Number(num).toFixed(9));
}
