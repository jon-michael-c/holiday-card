import html2canvas from "html2canvas";

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");
var buttons = document.querySelector(".control-container");

function takeScreenshot() {
  html2canvas(document.body).then((canvas) => {
    let img = document.createElement("img");
    img.src = canvas.toDataURL();

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
    a.href = image;
    a.download = "screenshot.png";
    a.click();
  });
};
function toggleModal() {
  setTimeout(() => {
    modal.classList.toggle("close");
    buttons.classList.toggle("close");
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

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
