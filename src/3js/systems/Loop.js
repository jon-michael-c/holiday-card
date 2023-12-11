import { Clock } from "three";
import { updateSnow } from "../components/snow";
import { Vector3 } from "three";
import TWEEN from "tween";


const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer, objects) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.objects = objects;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();
      this.renderer.toneMappingExposure = Math.pow(0.91, 5.0);
      let ground = this.objects.ground.getGroup()[0];
    ground.geometry.computeVertexNormals();



      TWEEN.update();
      // render a frame

      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
