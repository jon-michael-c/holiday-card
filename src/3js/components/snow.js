import {
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
} from "three";

export default class snowSystem {
  constructor(numberOfSnowflakes) {
    const geometry = new BufferGeometry();
    const vertices = [];

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 100;
      const z = Math.random() * 200 - 100;
      vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

    const material = new PointsMaterial({
      color: 0xffffff,
      size: 0.75,
      sizeAttenuation: true,
      opacity: 0.6,
      depthTest: true,
      transparent: true,
    });

    const snow = new Points(geometry, material);

    this.snow = [snow];
  }

  getGroup() {
    return this.snow;
  }

  tick() {
    const vertices = this.snow[0].geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      // Vertical movement (Y-axis)
      vertices[i + 1] -= Math.random() * 0.2 + 0.2; // Variable speed

      // Horizontal movement (X and Z-axis)
      vertices[i] += (Math.random() - 0.2) * 0.2; // Random left-right movement
      vertices[i + 2] += (Math.random() - 0.2) * 0.2; // Random forward-backward movement

      // Reset flake to top if it reaches the ground level
      if (vertices[i + 1] < -3) {
        vertices[i] = Math.random() * 200 - 100;
        vertices[i + 1] = 100;
        vertices[i + 2] = Math.random() * 200 - 100;
      }
    }
    this.snow[0].geometry.attributes.position.needsUpdate = true;
  }
}

/*
updateSnow() {
    const vertices = this.snow.geometry.attributes.position.array;
    for (let i = 1; i < vertices.length; i += 3) {
      vertices[i] -= 1; // Adjust speed of falling

      if (vertices[i] < -1000) {
        vertices[i] = 1000; // Reset flake to top
      }
    }
    this.snow.geometry.attributes.position.needsUpdate = true;
  }
  */
