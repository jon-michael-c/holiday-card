import {
  Color,
  Fog,
  LinearFilter,
  Scene,
  TextureLoader,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BackSide,
} from "three";

function createScene() {
  // Scene setup
  const scene = new Scene();

  scene.background = new Color(0x88ccee);

  return scene;
}

export { createScene };
