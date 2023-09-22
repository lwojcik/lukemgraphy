document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.querySelector("html");
  const themeKey = "theme";
  const darkSetting = "dark";
  const lightSetting = "light";

  // Enable JavaScript
  htmlElement.classList.remove("no-js");

  // Set theme
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

  // Handle theme switch
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

  const themeSwitcherBtn = document.querySelector(".theme-toggle-link");
  if (themeSwitcherBtn) {
    themeSwitcherBtn.addEventListener("click", handleThemeSwitch);
  }

  // Detect system-wide dark mode
  const detectSystemWideDarkMode = () => {
    const systemWideDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const toggleTheme = (e) => {
      setTheme(e.matches ? darkSetting : lightSetting);
    };

    systemWideDarkMode.addListener(toggleTheme);
    toggleTheme(systemWideDarkMode);
  };

  detectSystemWideDarkMode();

  // Detect local storage theme
  const detectLocalStorageDarkMode = () => {
    try {
      const currentSavedTheme = localStorage.getItem(themeKey);
      if (currentSavedTheme) {
        setTheme(currentSavedTheme);
      }
    } catch {
      return false;
    }
  };

  detectLocalStorageDarkMode();

  // Handle mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnCheckbox = document.querySelector(".menu-checkbox");

  if (menuBtn) {
    menuBtn.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.key === "Enter") {
        const { checked } = menuBtnCheckbox;
        menuBtnCheckbox.checked = !checked;
      }
    });
  }

  // Masonry
  const masonry = () => {
    const gridItems = document.querySelectorAll(".masonry li");
    gridItems.forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        const resizeAndRepositionImage = () => {
          const clientHeight = img.clientHeight;
          item.style.height = clientHeight + "px";
          const spans = Math.ceil(clientHeight / 20);
          item.style.gridRowEnd = `span ${spans}`;
        };

        img.addEventListener("load", resizeAndRepositionImage);
        window.addEventListener("resize", resizeAndRepositionImage);
      }
    });
  };

  masonry();

  // Lazy load images
  const lazyLoadImages = () => {
    const images = document.querySelectorAll(".lazy-load-img");
    const animateClass = "animation-fadeIn";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          const attr = entry.target.getAttribute("data-src");
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
  };

  lazyLoadImages();

  // Lightbox
  const lightboxImageLinks = document.querySelectorAll(".lightbox a");
  if (lightboxImageLinks.length > 0) {
    new SimpleLightbox(".lightbox a", {
      overlayOpacity: 1,
      sourceAttr: "data-image-href",
      showCounter: false,
    });
  }

  // Single image navigation
  const pagination = document.querySelector(".pagination");
  if (pagination) {
    const back = pagination.querySelector(".back");
    const next = pagination.querySelector(".next");
    const previous = pagination.querySelector(".previous");

    const handleNavigation = (event, element) => {
      document.addEventListener(event, () => {
        element.click();
      });

      window.addEventListener("keydown", (event) => {
        if (event.key === `Arrow${element === next ? "Right" : "Left"}`) {
          element.click();
        }
      });
    };

    if (next) {
      handleNavigation("swiped-left", next);
    }

    if (previous) {
      handleNavigation("swiped-right", previous);
    }

    if (back) {
      handleNavigation("swiped-up", back);
    }
  }

  // image rotator on main page
  const mainPageRotator = () => {
    const showcase = document.querySelector(".main-page-showcase");

    if (showcase) {
      let images = [];
      let imagesLength = 0;
      let currentImage = 0;
      let timer;

      const handleImageChange = () => {
        images[currentImage].classList.remove("visible");
        currentImage = (currentImage + 1) % imagesLength;
        images[currentImage].classList.add("visible");
      };

      const startTimer = () => {
        timer = setInterval(() => {
          handleImageChange();
        }, 3500);
      };

      const pauseTimer = () => {
        clearInterval(timer);
      };

      const updateTimer = () => {
        if (window.innerWidth >= 768) {
          startTimer();
        } else {
          pauseTimer();
        }
      };

      images = showcase.querySelectorAll(".item");
      imagesLength = images.length;
      updateTimer();

      if (window.innerWidth >= 768) {
        window.addEventListener("resize", () => {
          updateTimer();
        });

        showcase.addEventListener("mouseenter", () => {
          pauseTimer();
        });

        showcase.addEventListener("mouseleave", () => {
          updateTimer();
        });
      }
    }
  };

  mainPageRotator();
});
