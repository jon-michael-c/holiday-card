import { Color, Fog, Scene, WebGLRenderer } from "three";

function createScene() {
  // Scene setup
  const scene = new Scene();

  scene.background = new Color(0x88ccee);
  scene.fog = new Fog(0xd5f8f8, 350, 700);

  return scene;
}

export { createScene };
