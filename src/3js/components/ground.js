import { Texture, PlaneGeometry, MeshPhongMaterial, Mesh } from "three";

function createSnowyGround() {
  let noise = noiseMap(512, 60);
  let geometry = new PlaneGeometry(200, 200, 120, 120);
  let vertices = geometry.attributes.position.array;
  // Center of the plan
  const centerX = 0;
  const centerY = 0;
  const flattenRadius = 20; // Inner radius of the flat area
  const transitionZone = 20; // Width of the transition zone

  for (let i = 0; i < vertices.length; i += 3) {
    const distance = Math.sqrt(
      Math.pow(vertices[i] - centerX, 2) +
        Math.pow(vertices[i + 1] - centerY, 2)
    );

    if (distance > flattenRadius) {
      let heightFactor = 1;
      if (distance < flattenRadius + transitionZone) {
        const smoothStep = (distance - flattenRadius) / transitionZone;
        heightFactor = smoothstep(0, 1, smoothStep);
      }
      // Using a more complex noise function for varied hill heights
      vertices[i + 2] =
        combinedNoise(vertices[i], vertices[i + 1], 30) * heightFactor; // Max height 30
    } else {
      vertices[i + 2] = 0; // Flat area
    }
  }
  geometry.verticesNeedUpdate = true;
  geometry.normalsNeedUpdate = true;
  geometry.computeVertexNormals();

  let material = new MeshPhongMaterial({
    color: 0xffffff,
    shininess: 5,
    bumpMap: noise,
    bumpScale: 3.025,
    emissive: 0xffffff,
    emissiveIntensity: 0.5,
  });

  let plane = new Mesh(geometry, material);
  plane.rotation.x = Math.PI / -2;
  plane.receiveShadow = true;
  plane.position.y = -2;

  return plane;
}
const randomOffsetX = Math.random() * 1000;
const randomOffsetY = Math.random() * 1000;

function getNoise(x, y) {
  // Adding randomness

  return (
    Math.sin((x + randomOffsetX) / 45) * Math.cos((y + randomOffsetY) / 45)
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function noiseMap(size, intensity) {
  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    width = (canvas.width = size || 512),
    height = (canvas.height = size || 512);

  intensity = intensity || 120;

  var imageData = ctx.getImageData(0, 0, width, height),
    pixels = imageData.data,
    n = pixels.length,
    i = 0;

  while (i < n) {
    pixels[i++] =
      pixels[i++] =
      pixels[i++] =
        Math.sin(i * i * i + (i / n) * Math.PI) * intensity;
    pixels[i++] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  let sprite = new Texture(canvas);
  sprite.needsUpdate = true;

  return sprite;
}

function smoothstep(edge0, edge1, x) {
  // Clamp x to the range [0, 1]
  x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
}
function combinedNoise(x, y, maxAmplitude = 30, minHeight = -2) {
  let totalNoise = 0;
  let frequency = 1;
  let amplitude = 0.5; // Adjust as needed
  let accumulatedAmplitude = 0;

  for (let i = 0; i < 4; i++) {
    // 4 layers of noise for example
    totalNoise += getNoise(x * frequency, y * frequency) * amplitude;

    accumulatedAmplitude += amplitude;
    amplitude *= 0.5; // Reduces the amplitude with each layer
    frequency *= 2; // Increases the frequency
  }

  let normalizedNoise = totalNoise / accumulatedAmplitude;
  let scaledNoise = normalizedNoise * maxAmplitude;

  // Ensure the noise value doesn't go below the minimum height
  return Math.max(scaledNoise, minHeight);
}

export { createSnowyGround };
