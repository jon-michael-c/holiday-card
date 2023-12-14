import "./styles.scss";
import HoliCard from "./3js/main";
import { AudioControl } from "./3js/systems/AudioControl";
import "./js/ui.js";

window.addEventListener("load", () => {
  let container = document.getElementById("3js");
  window.card = new HoliCard(container, window);
  window.card.start();
  document.querySelectorAll(".star")[1].classList.add("active");
});
