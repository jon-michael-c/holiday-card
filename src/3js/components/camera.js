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

  let x = 2.3180606289003647;
  let y = 2.0114857025011834;
  let z = 5.478620885647863;
  let rx = -1.13897005061520265;
  let ry = -0.24983408110353236;
  let rz = -0.0345685359348593;
  let zoomValue = 1.0;

  const initialPosition = new Vector3(x, y, z);
  const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
  camera.rotation.set(
    degreesToRadians(rx),
    degreesToRadians(ry),
    degreesToRadians(rz)
  );
  camera.zoom = zoomValue;

  camera.position.set(x, y, z);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
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
