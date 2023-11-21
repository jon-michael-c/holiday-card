import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  return camera;
}

export { createCamera };
