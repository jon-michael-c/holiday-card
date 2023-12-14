import {
  PlaneGeometry,
  BackSide,
  Mesh,
  TextureLoader,
  MeshBasicMaterial,
} from "three";
import TWEEN, { Tween } from "tween";
import { loadingManager } from "../systems/ProgressBar";

class Background {
  constructor(texture) {
    this.group = this.createSkyBox();
    this.texture = texture;
  }

  getGroup() {
    return this.group;
  }

  createSkyBox() {
    const loader = new TextureLoader(loadingManager);
    const texture = loader.load(
      "../src/3js/textures/background/background.png"
    );
    const geometry = new PlaneGeometry(2000, 540); // Adjust size as needed
    const material = new MeshBasicMaterial({
      map: texture,
    });

    const skybox = new Mesh(geometry, material);
    skybox.position.set(200, 200, -600);
    return [skybox];
  }

  randomize() {
    new Tween(this.group[0].position)
      .to(
        {
          x: Math.random() * 100,
        },
        1000
      )
      .start();
  }
}

export { Background };
