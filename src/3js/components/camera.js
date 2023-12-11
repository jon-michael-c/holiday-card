import { Vector3 } from "three";
import { DirectionalLight } from "three";
import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  let x = 1.9160701626447745;
  let y = 1.1710608998225753;
  let z = 6.639914285287613;

  const initialPosition = new Vector3(x, y, z);

  camera.position.copy(initialPosition);

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

  const backlight = new DirectionalLight(0xeeeeff, 2);
  backlight.position.set(0, -25, 0);
  camera.add(backlight);
  const shadowLight = new DirectionalLight(0xffffff, 7);

  shadowLight.castShadow = true;
  shadowLight.shadow.camera.far = 20;
  shadowLight.shadow.mapSize.set(1024, 1024);
  shadowLight.position.set(10, 10, -6);

  camera.add(shadowLight);
  camera.lookAt(cubeGroup.position); // Ensure the camera always points toward the cubeGroup
}

export { createCamera };
