import "./styles.scss";
import HoliCard from "./3js/main";
("./3js/main.js");

window.addEventListener("load", () => {
  let container = document.getElementById("3js");
  window.card = new HoliCard(container, window);
  window.card.start();
});
