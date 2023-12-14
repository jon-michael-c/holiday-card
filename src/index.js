import "./styles.scss";
import HoliCard from "./3js/main";
import { AudioControl } from "./3js/systems/AudioControl";
import "./js/ui.js";
import html2canvas from "html2canvas";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

window.addEventListener("load", () => {
  let container = document.getElementById("3js");
  window.card = new HoliCard(container, window);
  window.card.start();

  document.querySelectorAll(".star")[1].classList.add("active");

  window.takeScreenshot = function takeScreenshot() {
    html2canvas(document.body).then((canvas) => {
      let img = document.createElement("img");
      img.src = canvas.toDataURL();
      img.classList.add("screenshot");

      document.body.appendChild(img);
    });
  };
});
