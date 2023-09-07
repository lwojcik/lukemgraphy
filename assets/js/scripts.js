const themeKey = "theme";
const darkSetting = "dark";
const lightSetting = "light";

const htmlElement = document.querySelector("html");

const enableJS = () => {
  htmlElement.classList.remove("no-js");
};

const setTheme = (theme) => {
  const themeSettings = [lightSetting, darkSetting];
  const [classToRemove, classToAdd] =
    theme === lightSetting
      ? [darkSetting, lightSetting]
      : [lightSetting, darkSetting];

  if (themeSettings.includes(theme)) {
    htmlElement.classList.remove(classToRemove);
    htmlElement.classList.add(classToAdd);
  }
};

const handleThemeSwitch = () => {
  const isDarkActive = htmlElement.classList.contains(darkSetting);
  const desiredSetting = isDarkActive ? lightSetting : darkSetting;
  setTheme(desiredSetting);

  try {
    localStorage.setItem(themeKey, desiredSetting);
  } catch {
    return false;
  }
};

const handleThemeSwitchFromKeyboard = (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    handleThemeSwitch();
  }
};

const detectSystemWideDarkMode = () => {
  const systemWideDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

  systemWideDarkMode.onchange = (e) => {
    if (e.matches) {
      setTheme(darkSetting);
    } else {
      setTheme(lightSetting);
    }
  };

  if (systemWideDarkMode.matches) {
    setTheme(darkSetting);
  }
};

const themeSwitcherButton = () => {
  const themeSwitcherBtn = document.querySelector(".theme-toggle-link");

  themeSwitcherBtn.addEventListener("click", handleThemeSwitch);
};

const detectLocalStorageDarkMode = () => {
  try {
    const currentSavedTheme = localStorage.getItem(themeKey) || null;

    if (currentSavedTheme) {
      setTheme(currentSavedTheme);
    }
  } catch {
    return false;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  enableJS();
  detectSystemWideDarkMode();
  detectLocalStorageDarkMode();
  themeSwitcherButton();
});

//   // Menu

//   var menu = document.getElementById("menu"),
//     rollback,
//     WINDOW_CHANGE_EVENT =
//       "onorientationchange" in window ? "orientationchange" : "resize";

//   function toggleHorizontal() {
//     menu.classList.remove("closing");
//     [].forEach.call(
//       document.getElementById("menu").querySelectorAll(".custom-can-transform"),
//       function (el) {
//         el.classList.toggle("pure-menu-horizontal");
//       }
//     );
//   }

//   function toggleMenu() {
//     if (menu.classList.contains("open")) {
//       menu.classList.add("closing");
//       rollBack = setTimeout(toggleHorizontal, 500);
//     } else {
//       if (menu.classList.contains("closing")) {
//         clearTimeout(rollBack);
//       } else {
//         toggleHorizontal();
//       }
//     }
//     menu.classList.toggle("open");
//     document.getElementById("toggle").classList.toggle("x");
//   }

//   function closeMenu() {
//     if (menu.classList.contains("open")) {
//       toggleMenu();
//     }
//   }

//   document.getElementById("toggle").addEventListener("click", function (e) {
//     toggleMenu();
//     e.preventDefault();
//   });

//   document.getElementById("toggle").addEventListener("keyup", function (e) {
//     e.preventDefault();
//     if (e.key === "Enter") {
//       toggleMenu();
//       e.preventDefault();
//     }
//   });

//   window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
// });
