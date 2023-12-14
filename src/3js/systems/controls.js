import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;

  let rx = 2.061694485578318;
  let ry = 1.856184213252233;
  let rz = -0.14051151033718576;
  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();
  controls.target.x = rx;
  controls.target.y = ry;
  controls.target.z = rz;

  return controls;
}

export { createControls };
