document.addEventListener("DOMContentLoaded", function() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector('nav[role="navegação"]');
  if (btn && nav) {
    btn.addEventListener("click", function() {
      if (nav.style.display === "flex") {
        nav.style.display = "none";
      } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.alignItems = "center";
        nav.style.gap = "10px";
      }
    });
  }
});