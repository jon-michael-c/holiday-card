import html2canvas from "html2canvas";

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");
var buttons = document.querySelector(".control-container");

function takeScreenshot() {
  html2canvas(document.body).then((canvas) => {
    let img = document.createElement("img");
    img.src = canvas.toDataURL();
    img.style.zIndex = 1000;

    document.body.appendChild(img);
    img.classList.add("screenshot");
  });
}

window.download = function download() {
  html2canvas(document.body).then((canvas) => {
    var image = canvas.toDataURL("image/png");

    // You can then download it or display it on the page
    // For example, to download it:
    var a = document.createElement("a");
    a.style.display = "none";
    a.style.zIndex = 1000;
    a.href = image;
    a.download = "screenshot.png";
    a.click();
  });
};
function toggleModal() {
  let happies = document.querySelectorAll(".happy");
  // Get random element from happies
  let randomHappy = happies[Math.floor(Math.random() * happies.length)];
  setTimeout(() => {
    modal.classList.toggle("close");
    buttons.classList.toggle("close");
    randomHappy.classList.toggle("active");
  }, 1000);

  setTimeout(() => {
    takeScreenshot();
  }, 500);
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

function getRandomImage() {
  let images = [
    ".src/assets/svg/happy_1.svg",
    ".src/assets/svg/happy_2.svg",
    ".src/assets/svg/happy_3.svg",
    ".src/assets/svg/happy_4.svg",
  ];

  let randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage;
}

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
