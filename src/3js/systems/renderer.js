import { PCFSoftShadowMap, WebGLRenderer } from "three";

function createRenderer(container, window) {
  const renderer = new WebGLRenderer({
    canvas: container,
    antialias: true, // Enable anti-aliasing
    alpha: true,
  });

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  renderer.toneMappingExposure = 1; // Adjust exposure
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high resolution displays

  return renderer;
}

export { createRenderer };
