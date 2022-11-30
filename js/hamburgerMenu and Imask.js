// !HAMBURGER MENU
const hamburgerLines = document.querySelector(".hamburger-lines");
const navUl = document.querySelector(".nav-ul");
const icon = document.getElementById("icon");
console.log(icon.innerHTML);

hamburgerLines.addEventListener("click", () => {
  navUl.classList.toggle("show");
  icon.classList.remove('fa-bars"');
  icon.classList.toggle("fa-x");
});
