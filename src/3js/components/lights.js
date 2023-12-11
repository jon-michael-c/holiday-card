import { HemisphereLight, DirectionalLight, SpotLight } from "three";

class LightSetup {
  constructor() {
    this.group = this.createLights();
  }

  createLights() {
    // Hemisphere Light
    const hemiLight = new HemisphereLight(0xfff, 0xfff, 0.8);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);

    // Directional Light
    let shadowMapSize = 13;
    const sunLight = new DirectionalLight(0xffffff, 1, 100);
    sunLight.position.set(0, 12, 12);
    sunLight.color.setHSL(0.1, 1, 0.95);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = shadowMapSize * 2;
    sunLight.shadow.camera.top = shadowMapSize;
    sunLight.shadow.camera.bottom = -shadowMapSize;
    sunLight.shadow.camera.left = -shadowMapSize;
    sunLight.shadow.camera.right = shadowMapSize;
    sunLight.shadow.normalBias = 0.02;

    // Spot Light
    const spotLight = new SpotLight(0xffffff, 4, 6, Math.PI / 4, 1, 1);
    spotLight.position.set(0, 3.5, 0);
    spotLight.castShadow = false;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 2;
    spotLight.shadow.normalBias = 0.02;

    return [sunLight, hemiLight];
  }

  getGroup() {
    return this.group;
  }
}

export { LightSetup };
