import "./styles.scss";
import HoliCard from "./3js/main";
import { AudioControl } from "./3js/systems/AudioControl";

window.addEventListener("load", () => {
  let container = document.getElementById("3js");
  window.card = new HoliCard(container, window);
  window.card.start();
});
