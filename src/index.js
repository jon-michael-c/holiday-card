
import "./styles.scss";
import "./js/ui.js";
import {HoliCard} from "./3js/main";


function isWebGLSupported() {
  // Create a temporary canvas element
  var canvas = document.createElement('canvas');
  // Try to get the WebGL rendering context
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // Check if the WebGL context is available
  return !!gl;
}

if (isWebGLSupported()) {
  console.log('WebGL is supported');
} else {
  console.log('WebGL is not supported');
}




window.addEventListener("load", () => {
  let container = document.getElementById("3js");
  window.card = new HoliCard(container);
  window.card.start();

  document.querySelectorAll(".star")[1].classList.add("active");
});

