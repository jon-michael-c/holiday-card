import { VSMShadowMap, WebGLRenderer, sRGBEncoding } from "three";

function createRenderer(container, window) {
  const renderer = new WebGLRenderer({
    canvas: container,
    antialias: true, // Enable anti-aliasing
    powerPreference: "high-performance",
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);
  renderer.outputEncoding = sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;

  return renderer;
}

export { createRenderer };
