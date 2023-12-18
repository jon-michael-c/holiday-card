import {
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  SphereGeometry,
  Mesh,
  MeshBasicMaterial
} from "three";

export default class snowSystem {
  constructor(numberOfSnowflakes) {
    const geometry = new BufferGeometry();
    const vertices = [];
        const snowflakes = [];


    
    for (let i = 0; i < numberOfSnowflakes; i++) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 100;
      const z = Math.random() * 200 - 100;

      const geometry = new SphereGeometry(0.2, 15, 15); // Create a sphere geometry
      const material = new MeshBasicMaterial({ color: 0xffffff }); // Create a basic material

      const snowflake = new Mesh(geometry, material); // Create a mesh
      snowflake.position.set(x, y, z); // Set the position of the snowflake

      snowflakes.push(snowflake);
    }

    this.snow = snowflakes;
  }

  getGroup() {
    return this.snow;
  }

  tick() {
    for (let i = 0; i < this.snow.length; i++) {
      const snowflake = this.snow[i];
  
      // Vertical movement (Y-axis)
      snowflake.position.y -= Math.random() * 0.2 + 0.2; // Variable speed
  
      // Horizontal movement (X and Z-axis)
      snowflake.position.x += (Math.random() - 0.5) * 0.2; // Random left-right movement
      snowflake.position.z += (Math.random() - 0.5) * 0.2; // Random forward-backward movement
  
      // Reset flake to top if it reaches the ground level
      if (snowflake.position.y < -3) {
        snowflake.position.x = Math.random() * 200 - 100;
        snowflake.position.y = 100;
        snowflake.position.z = Math.random() * 200 - 100;
      }
    }
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
