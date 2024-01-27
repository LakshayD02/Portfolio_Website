/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/

const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
  document.body.classList.add("disable-scroll");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
      document.body.classList.remove("disable-scroll");
    });
  });
});

/*==================== PORTFOLIO SWIPER ====================*/

let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
  on: {
    slideChange: function () {
      // Check if it's the last slide
      if (this.isEnd) {
        // Perform any action you want when the last slide is reached
        console.log("Last slide reached. Restarting loop.");
        // You can also restart the loop manually if needed
        // swiper.slideTo(0);
      }
    },
  },
});



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

//validate if user previously chose a theme
if (selectedTheme) {
  // if theme selected by user previously then we add/remove classes again based on localStorage
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}
//if initially there is no local storage ie. user has not made a choice and this is first time loading
//then we check if browser/OS is in dark mode and then add dark theme if required by default
else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  console.log("found dark mode for browser/OS");
  // add dark theme by setting dark theme flags in localStorage
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
  // add classes for dark theme in DOM
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});0

//Form Submission alert
document.addEventListener("DOMContentLoaded", function() {
  // Get the form and submit button
  const form = document.querySelector('.contact__form');
  const submitButton = form.querySelector('button[type="submit"]');

  // Add event listener to the submit button
  submitButton.addEventListener('click', function(event) {
      // Check if all form fields are filled
      const allFieldsFilled = checkAllFieldsFilled(form);

      if (!allFieldsFilled) {
          // If not all fields are filled, prevent form submission
          event.preventDefault();
          alert("Please fill in all the Fields!");
          return;
      }

      // Display a confirmation dialog
      const isConfirmed = confirm("Do you want to submit the form?");

      // If the user confirms, the form will be submitted
      if (!isConfirmed) {
          event.preventDefault(); // Prevent form submission
      } else {
          // Show success alert if the form is successfully submitted
          alert("Form successfully submitted!");
      }
  });

  // Function to check if all form fields are filled
  function checkAllFieldsFilled(form) {
      const formInputs = form.querySelectorAll('input[type="text"], textarea');
      for (const input of formInputs) {
          if (input.value.trim() === '') {
              return false;
          }
      }
      return true;
  }
});

// side progress bar 

let calcScrollValue = ()=>{
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;

  let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100)/calcHeight);
  
  if(pos > 100){
      scrollProgress.style.display = "grid";
  }else{
      scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click",()=>{
      document.documentElement.scrollTop = 0;
  });
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;



// Typing Animation 

document.addEventListener("DOMContentLoaded", function () {
  // Your Typed.js initialization code here
  const typed = new Typed('.multiple-text', {
    strings: ["Web Developer", "Pentester", "Ethical Hacker", "Graphic Designer", "Content Writer", "SEO Expert", "Blogger", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1500,
    loop: true
  });
});

// Counter Animation
 
function startCounterAnimation() {
  const counters = document.querySelectorAll('.about__info-title');
  const targetValues = [80, 60, 50, 45]; // Set your target values here
  const duration = 5000; // Animation duration in milliseconds

  counters.forEach((counter, index) => {
    const startTime = performance.now();

    function updateCounter(timestamp) {
      const elapsedTime = timestamp - startTime;
      const progress = elapsedTime / duration;

      if (progress < 1) {
        const value = Math.floor(progress * targetValues[index]);
        counter.textContent = value;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = targetValues[index];
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function handleScroll() {
  const aboutInfo = document.querySelector('.about__info');
  if (isElementInViewport(aboutInfo)) {
    startCounterAnimation();
    window.removeEventListener('scroll', handleScroll);
  }
}

window.addEventListener('scroll', handleScroll);