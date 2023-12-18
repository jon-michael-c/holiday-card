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
    preserveDrawingBuffer: true,
  });



  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;
  ColorManagement.enabled = true;
  renderer.outputEncoding = SRGBColorSpace;


  return renderer;
}

export { createRenderer };
