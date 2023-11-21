import { HemisphereLight, DirectionalLight } from "three";

function createLights() {
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0.3); // Reduced intensity for ambient light
  const mainLight = new THREE.DirectionalLight(0xffffff, 0.7); // Main directional light
  mainLight.position.set(10, 10, 10); // Adjust position for better illumination
  mainLight.castShadow = true;

  // Add an additional light for more balanced illumination
  const fillLight = new THREE.DirectionalLight(0xffffff, 1);
  fillLight.position.set(-50, 50, -50);
  fillLight.castShadow = false; // This light doesn't need to cast shadows
  mainLight.shadow.camera.near = 1;
  mainLight.shadow.camera.far = 200;
  mainLight.shadow.bias = -0.001;
}

export { createLights };
