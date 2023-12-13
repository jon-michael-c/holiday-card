import {
  ColorManagement,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  VSMShadowMap,
  WebGLRenderer,
  sRGBEncoding,
} from "three";

function createRenderer(container, window) {
  const renderer = new WebGLRenderer({
    canvas: container,
    antialias: true, // Enable anti-aliasing
    powerPreference: "high-performance",
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;
  ColorManagement.enabled = true;
  renderer.outputEncoding = SRGBColorSpace;

  return renderer;
}

export { createRenderer };
