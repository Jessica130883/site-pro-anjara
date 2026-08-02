var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}
function closeNav() {
  sidenav.classList.remove("active");
}


/* ANIMATION TITRE */
window.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".main-title");

  if (title) {
    setTimeout(() => {
      title.classList.add("visible");
    }, 100);
  }
});

