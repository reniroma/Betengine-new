document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const subNav = document.getElementById("sub-nav");

  if (!toggle || !mainNav) {
    return;
  }

  const setMenuState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));

    mainNav.classList.toggle("is-open", isOpen);
    if (subNav) {
      subNav.classList.toggle("is-open", isOpen);
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = !mainNav.classList.contains("is-open");
    setMenuState(isOpen);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && mainNav.classList.contains("is-open")) {
      setMenuState(false);
    }
  });
});
