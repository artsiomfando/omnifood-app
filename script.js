// Stop transition during first render of a page
window.onload = () => {
  document.querySelector(".preload").classList.remove("preload");
};

// Set current year
const yearEl = document.querySelector(".year");
const curYear = new Date().getFullYear();
yearEl.textContent = curYear;

// Make burger-menu work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

const manageBurger = () => {
  headerEl.classList.toggle("nav-open");
};

const closeBurger = () => {
  headerEl.classList.remove("nav-open");
};
btnNavEl.addEventListener("click", manageBurger);

addEventListener("keyup", (event) => {
  if (event.code === "Escape") closeBurger();
});

// Smooth scrolling in all browsers
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

// Sticky navigation
const bodyEl = document.querySelector(".body");
const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      bodyEl.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      bodyEl.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);

// Fixing flexbox gap property missing in Safari
function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
