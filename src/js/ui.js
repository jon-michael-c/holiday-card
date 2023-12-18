import html2canvas from "html2canvas";

var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal-content");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-btn");
var downloadButton = document.querySelector(".dwn-btn");
var buttons = document.querySelector(".control-container");
var branding = document.querySelector(".modal-content--img ");
var externalLink = document.querySelector(".external-link");

function takeScreenshot() {
  html2canvas(document.getElementById("3js")).then((canvas) => {
    
    let img = document.createElement("img");
    img.src = canvas.toDataURL();

    modalContent.appendChild(img);
    img.classList.add("screenshot");
  });
}

window.download = function download() {
  html2canvas(document.body).then((canvas) => {
    var image = canvas.toDataURL("image/jpeg");

    // You can then download it or display it on the page
    // For example, to download it:
    var a = document.createElement("a");
    a.style.display = "none";
    a.style.visibility = "hidden";
    a.style.zIndex = "100000";
    a.href = image;
    a.download = "screenshot.png";
    a.click();
  });
};
function toggleModal() {
  if (card.mobile) {

    card.mobileMove();
  }
  let happies = document.querySelectorAll(".happy");
  // Make sure happies are not active
  happies.forEach((happy) => {
    happy.classList.remove("active");
  });
  // Get random element from happies
  let randomHappy = happies[Math.floor(Math.random() * happies.length)];
  //const colors = ["purple", "midnight", "red", "sky", "green", "yellow"];
  const colors = ["purple"];

  let randomColor = Object.values(colors)[Math.floor(Math.random() * colors.length)];

  document.querySelector(".modal-content--img svg").classList.add(randomColor);





  setTimeout(() => {
    card.controlContainer.classList.toggle("active");
  }, 500);

  setTimeout(() => {
    takeScreenshot()
    modal.classList.toggle("close");
  }, 700)

  setTimeout(() => {

    randomHappy.classList.toggle("active");
    closeButton.classList.toggle("active");
    downloadButton.classList.toggle("active");
    branding.classList.toggle("active");
    externalLink.classList.toggle("active");
    
  }, 1550);




  /*
  setTimeout(() => {
    takeScreenshot();
  }, 500);
  */
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

closeButton.addEventListener("click", toggleModal);

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
downloadButton.addEventListener("click", () => {
  setTimeout(() => {
    window.download();
  }, 1000);
});
