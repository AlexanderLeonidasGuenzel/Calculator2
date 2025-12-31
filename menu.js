menuEvent();
themeEventListener();

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
