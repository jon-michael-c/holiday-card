import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 10;

  return camera;
}

function rotateCamera(deltaX, deltaY) {
  const rotationSpeed = 0.005; // Adjust as needed

  const polarAngle =
    Math.atan2(camera.position.z, camera.position.x) + deltaX * rotationSpeed;
  const azimuthAngle =
    Math.acos(camera.position.y / camera.position.length()) +
    deltaY * rotationSpeed;

  const radius = camera.position.length(); // Distance from the camera to the origin

  camera.position.x = radius * Math.sin(azimuthAngle) * Math.cos(polarAngle);
  camera.position.y = radius * Math.cos(azimuthAngle);
  camera.position.z = radius * Math.sin(azimuthAngle) * Math.sin(polarAngle);

  camera.lookAt(cubeGroup.position); // Ensure the camera always points toward the cubeGroup
}

export { createCamera };
