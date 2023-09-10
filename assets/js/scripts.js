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

const resizeAndRepositionImage = (item, img) => {
  const clientHeight = img.clientHeight;
  item.style.height = clientHeight + "px";
  const spans = Math.ceil(clientHeight / 20);
  item.style.gridRowEnd = `span ${spans}`;
};

const masonry = () => {
  const gridItems = document.querySelectorAll(".masonry li");

  if (gridItems.length > 0) {
    gridItems.forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        img.addEventListener("load", () => {
          resizeAndRepositionImage(item, img);
        });

        addEventListener("resize", () => {
          resizeAndRepositionImage(item, img);
        });
      }
    });
  }
};

const lazyLoadImages = () => {
  const images = document.querySelectorAll(".lazy-load-img");

  if (images.length > 0) {
    const animateClass = "animation-fadeIn";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          let attr = entry.target.getAttribute("data-src");
          entry.target.src = attr;

          if (entry.target.complete) {
            entry.target.classList.add(animateClass);
            observer.unobserve(entry.target);
          }
        } else {
          entry.target.classList.remove(animateClass);
        }
      });
    });

    images.forEach((image) => {
      observer.observe(image);
    });
  }
};

const lightbox = () => {
  const lightboxImageLinks = document.querySelectorAll(".lightbox a");

  if (lightboxImageLinks.length > 0) {
    new SimpleLightbox(".lightbox a", {
      overlayOpacity: 1,
      sourceAttr: "data-image-href",
      showCounter: false,
    });
  }
};

const singleImageNavigation = () => {
  const pagination = document.querySelector(".pagination");

  if (pagination) {
    const back = pagination.querySelector(".back");
    const next = pagination.querySelector(".next");
    const previous = pagination.querySelector(".previous");

    if (back) {
      document.addEventListener("swiped-up", () => {
        back.click();
      });
    }

    if (next) {
      document.addEventListener("swiped-right", () => {
        next.click();
      });
    }

    if (previous) {
      document.addEventListener("swiped-right", () => {
        previous.click();
      });
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  enableJS();
  detectSystemWideDarkMode();
  detectLocalStorageDarkMode();
  themeSwitcherButton();
  handleMobileMenu();
  masonry();
  lazyLoadImages();
  lightbox();
});
