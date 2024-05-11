'use strict';

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const header = document.querySelector("[data-header]");

let prevScrollPosition = window.pageYOffset;
let isScrollingDown = false;
let isNavbarActive = false;

const toggleNav = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 1200) {
    navbar.classList.toggle("active");
    document.body.classList.toggle("nav-active");
    isNavbarActive = !isNavbarActive;
    updateHeaderAndNavbarVisibility(); 
  }
}

const updateHeaderAndNavbarVisibility = () => {
  const currentScrollPos = window.pageYOffset;
  
  if (currentScrollPos > prevScrollPosition) {
    header.classList.add("transparent");
    isScrollingDown = true;
  } else {
    header.classList.remove("transparent");
    isScrollingDown = false;
  }

  if (!isScrollingDown && currentScrollPos < prevScrollPosition - 50) {
    header.classList.remove("transparent");
    isScrollingDown = false;
  }

  prevScrollPosition = currentScrollPos;

}

const updateHeaderSize = () => {
  const currentScrollPos = window.pageYOffset;
  const scrolledDown = currentScrollPos > prevScrollPosition;

  header.classList.toggle("scrolled-down", scrolledDown && currentScrollPos > 50);
  prevScrollPosition = currentScrollPos;
};

window.addEventListener("scroll", () => {
  updateHeaderAndNavbarVisibility();
  updateHeaderSize();
});


addEventOnElements(navTogglers, "click", toggleNav);

document.addEventListener("click", (event) => {
    const target = event.target;
    if (!navbar.contains(target)) { 
      isNavbarActive = false; updateHeaderAndNavbarVisibility(); } }); 

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

window.addEventListener("resize", updateHeaderAndNavbarVisibility);

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
let currentSlidePos = 0;

const moveSliderItem = function() {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = totalSlidableItems;
    } else {
        currentSlidePos--;
    }

    moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
});

const cardBtns = document.querySelectorAll("[data-readmore]");
const handleResize = () => {
    if (window.innerWidth < 1200) {
        cardBtns.forEach(btn => {
            btn.classList.add("readmore");
        });
    } else {
        cardBtns.forEach(btn => {
            btn.classList.remove("readmore");
        });
    }
};

handleResize();

window.addEventListener('resize', handleResize);