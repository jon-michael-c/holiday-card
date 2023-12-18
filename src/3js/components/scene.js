import {
  Color,
  Fog,
  FogExp2,
  LinearFilter,
  Scene,
  TextureLoader,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BackSide,
} from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

function createScene() {
  // Scene setup
  const scene = new Scene();

  scene.background = new Color(0xd7e9e9);

  // Create a fogExp2 for a specific area

  // Create a CSS3DRenderer
  return scene;
}

export { createScene };
