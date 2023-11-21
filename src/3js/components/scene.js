import { Fog, Scene, WebGLRenderer } from "three";
import { createCamera } from "./camera";

function createScene() {
  // Scene setup
  const scene = new Scene();
  const camera = createCamera();

  scene.fog = new Fog(0xf7f7f7, 100, 650);

  const renderer = new WebGLRenderer({
    canvas: document.querySelector("#c"),
    antialias: true, // Enable anti-aliasing
    alpha: true,
  });

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  renderer.physicallyCorrectLights = true;
  renderer.toneMappingExposure = 1; // Adjust exposure
  renderer.shadowMap.type = PCFSoftShadowMap;
  scene.background = new Color(0xadd8e6); // Light blue, for example
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high resolution displays
  camera.position.z = 5;
}

export { createScene };
