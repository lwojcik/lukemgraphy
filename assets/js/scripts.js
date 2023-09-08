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

const handleMobileMenu = () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnCheckbox = document.querySelector(".menu-checkbox");

  menuBtn.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const { checked } = menuBtnCheckbox;
      menuBtnCheckbox.checked = !checked;
    }
  });
};

const masonry = () => {
  const masonryLayouts = document.querySelectorAll(".masonry-layout");

  if (masonryLayouts.length > 0) {
    FlexMasonry.init(".masonry-layout", {
      responsive: true,
      breakpointCols: {
        "min-width: 800px": 3,
        "min-width: 480px": 2,
      },
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  enableJS();
  detectSystemWideDarkMode();
  detectLocalStorageDarkMode();
  themeSwitcherButton();
  handleMobileMenu();
  masonry();
});
