import { Color, Fog, Scene, WebGLRenderer } from "three";

function createScene() {
  // Scene setup
  const scene = new Scene();

  scene.fog = new Fog(0xf7f7f7, 100, 650);
  scene.background = new Color(0xadd8e6); // Light blue, for example

  return scene;
}

export { createScene };
