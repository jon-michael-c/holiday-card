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
