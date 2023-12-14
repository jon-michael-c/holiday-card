import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;

  let rx = 2.075384465360659;
  let ry = 1.6404185642236222;
  let rz = -0.2055166319838085;
  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();
  controls.target.x = rx;
  controls.target.y = ry;
  controls.target.z = rz;

  return controls;
}

export { createControls };
