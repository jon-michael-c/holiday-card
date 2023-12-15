import {
  PlaneGeometry,
  BackSide,
  Mesh,
  TextureLoader,
  MeshBasicMaterial,
} from "three";
import TWEEN, { Easing, Tween } from "tween";
import { loadingManager } from "../systems/ProgressBar";

class Background {
  constructor(texture) {
    this.group = this.createSkyBox();
    this.texture = texture;
  }

  getGroup() {
    return this.group;
  }
  getRandomXPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createSkyBox() {
    const loader = new TextureLoader(loadingManager);
    const texture = loader.load(
      "../src/3js/textures/background/background.png"
    );
    let x = 5542;
    let y = 1080;
    const geometry = new PlaneGeometry(x / 2, y / 2); // Adjust size as needed
    const material = new MeshBasicMaterial({
      map: texture,
    });

    const skybox = new Mesh(geometry, material);
    skybox.position.set(this.getRandomXPosition(100, 450), 150, -1700);
    return [skybox];
  }

  randomize() {
    const easing = Easing.Quadratic.InOut;
    new Tween(this.group[0].position)
      .to(
        {
          x: this.getRandomXPosition(100, 450),
        },
        1000
      )
      .delay(500)
      .easing(easing)
      .start();
  }
}
export { Background };
