import * as THREE from "three";

export default class HoliCard {
  constructor() {
    this.init();
    this.isRotating = false;
    this.rotationSpeed = 0.05; // Adjust this for smoother rotation
    this.totalRotation = 0;
    this.targetRotation = Math.PI / 2; // 90 degrees in radians
    this.currentSection = null;
  }

  init() {
    this.createScene();
    this.createCube();
    this.addRandomObjects();
    this.createSnow();
    this.createSnowyGround(); // Add snowy ground
    this.render();
    this.setMouseEvents();
  }

  createScene() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.scene.background = new THREE.Color(0xadd8e6); // Light blue, for example
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#c"),
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;
  }

  createSnowyGround() {
    const groundGeometry = new THREE.PlaneGeometry(2000, 2000); // Large flat plane
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White material
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);

    ground.position.y = -5; // Adjust this to place the ground at the desired level
    ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal

    this.scene.add(ground);
  }

  createCube() {
    this.cubeGroup = new THREE.Group();
    const sectionSize = 2; // Size of each section
    const sectionHeight = 1; // Height of each section

    // Function to create an array of materials with different colors for each face
    function createMaterialsForSection(colors) {
      return colors.map((color) => new THREE.MeshBasicMaterial({ color }));
    }

    // Colors for the faces of each section
    const sectionColors = [
      [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff], // Section 1 colors
      [0x000000, 0xffffff, 0x777777, 0x333333, 0x999999, 0x555555], // Section 2 colors
      [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff], // Section 1 colors
      [0x000000, 0xffffff, 0x777777, 0x333333, 0x999999, 0x555555], // Section 2 colors
    ];

    // Create and position each section
    for (let i = 0; i < sectionColors.length; i++) {
      const geometry = new THREE.BoxGeometry(
        sectionSize,
        sectionHeight,
        sectionSize
      );
      const materials = createMaterialsForSection(sectionColors[i]);
      const section = new THREE.Mesh(geometry, materials);
      section.position.y = (i - 1.5) * sectionHeight;
      this.cubeGroup.add(section); // Add to group
    }

    this.scene.add(this.cubeGroup);
  }

  render() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.updateSnow();
      this.renderer.render(this.scene, this.camera);

      if (this.isRotating) {
        this.applySmoothRotation();
      }
    };

    animate();

    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

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

  applySmoothRotation() {
    if (this.isRotating && this.currentSection) {
      const remainingRotation =
        this.targetRotation - Math.abs(this.totalRotation);
      const rotationThisFrame =
        Math.min(Math.abs(this.currentRotationStep), remainingRotation) *
        Math.sign(this.currentRotationStep);

      if (remainingRotation > 0) {
        this.currentSection.rotateY(rotationThisFrame);
        this.totalRotation += rotationThisFrame;
      } else {
        this.isRotating = false;
        this.totalRotation = 0;
      }
    }
  }

  setMouseEvents() {
    // Mouse event setup
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition.x = e.clientX;
      previousMousePosition.y = e.clientY;
    };

    const onMouseUp = () => (isDragging = false);

    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        this.rotateCamera(deltaX, deltaY);

        previousMousePosition.x = e.clientX;
        previousMousePosition.y = e.clientY;
      }
    };

    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mouseup", onMouseUp, false);
    window.addEventListener("mousemove", onMouseMove, false);

    const zoomSpeed = 0.1;
    const minZoomDistance = 2;
    const maxZoomDistance = 10;

    document.addEventListener("wheel", (event) => {
      const delta = event.deltaY * zoomSpeed;
      this.camera.position.z = Math.min(
        Math.max(this.camera.position.z + delta, minZoomDistance),
        maxZoomDistance
      );
    });
  }

  rotateCamera(deltaX, deltaY) {
    const rotationSpeed = 0.005; // Adjust as needed

    const polarAngle =
      Math.atan2(this.camera.position.z, this.camera.position.x) +
      deltaX * rotationSpeed;
    const azimuthAngle =
      Math.acos(this.camera.position.y / this.camera.position.length()) +
      deltaY * rotationSpeed;

    const radius = this.camera.position.length(); // Distance from the camera to the origin

    this.camera.position.x =
      radius * Math.sin(azimuthAngle) * Math.cos(polarAngle);
    this.camera.position.y = radius * Math.cos(azimuthAngle);
    this.camera.position.z =
      radius * Math.sin(azimuthAngle) * Math.sin(polarAngle);

    this.camera.lookAt(this.cubeGroup.position); // Ensure the camera always points toward the cubeGroup
  }

  rotate(direction, position) {
    this.isRotating = true;
    this.currentRotationStep =
      this.rotationSpeed * (direction === "left" ? -1 : 1);
    this.totalRotation = 0; // Reset total rotation
    this.currentSection = this.cubeGroup.children[position];
  }

  onWindowResize() {
    // Window resize handler
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  addRandomObjects() {
    const objectCount = 10; // Number of random objects
    for (let i = 0; i < objectCount; i++) {
      // Create random geometries like box, sphere, cone, etc.
      const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.ConeGeometry(0.5, 1, 32),
        // ... add more geometries if you like
      ];
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
      });
      const randomGeometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const object = new THREE.Mesh(randomGeometry, material);

      // Position objects randomly
      object.position.x = (Math.random() - 0.5) * 20;
      object.position.y = (Math.random() - 0.5) * 20;
      object.position.z = (Math.random() - 0.5) * 20;

      this.scene.add(object);
    }
  }

  createSnow() {
    const snowflakeCount = 2500; // Number of snowflakes
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < snowflakeCount; i++) {
      const x = Math.random() * 2000 - 1000; // Spread in X
      const y = Math.random() * 2000 - 1000; // Spread in Y
      const z = Math.random() * 2000 - 1000; // Spread in Z
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 6,
      sizeAttenuation: true,
    });
    this.snow = new THREE.Points(geometry, material);

    this.scene.add(this.snow);
  }
}
