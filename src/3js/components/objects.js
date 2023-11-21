import {
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  MeshPhongMaterial,
  BufferGeometry,
  Float16BufferAttribute,
  Points,
  PointsMaterial,
  Object3D,
  CylinderGeometry,
} from "three";

function createSnowyGround() {
  const groundGeometry = new PlaneGeometry(1000, 1000); // Large flat plane
  const groundMaterial = new MeshStandardMaterial({
    color: 0xffffff,
  }); // White material
  const ground = new Mesh(groundGeometry, groundMaterial);

  ground.position.y = -2; // Adjust to place the ground at the desired level
  ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
  ground.receiveShadow = true;

  scene.add(ground);
}

function createRandomObjects() {
  const objectCount = 10; // Number of random objects
  for (let i = 0; i < objectCount; i++) {
    // Create random geometries like box, sphere, cone, etc.
    const geometries = [
      new BoxGeometry(1, 1, 1),
      new SphereGeometry(0.5, 32, 32),
      new ConeGeometry(0.5, 1, 32),
      // ... add more geometries if you like
    ];
    const material = new MeshPhongMaterial({
      color: Math.random() * 0xffffff,
    });
    const randomGeometry =
      geometries[Math.floor(Math.random() * geometries.length)];
    const object = new Mesh(randomGeometry, material);

    // Position objects randomly
    object.position.x = (Math.random() - 0.5) * 20;
    object.position.y = (Math.random() - 0.5) * 20;
    object.position.z = (Math.random() - 0.5) * 20;

    object.receiveShadow = true;
    object.castShadow = true;
    scene.add(object);
  }
}

function createTrees() {
  const treeCount = 5; // Number of trees
  for (let i = 0; i < treeCount; i++) {
    const tree = new Tree();
    tree.mesh.position.set(
      (Math.random() - 0.5) * 599, // Random X position
      -1, // Y position (adjust based on ground level)
      (Math.random() - 0.5) * 1000 // Random Z position
    );
    scene.add(tree.mesh);
  }
}

function createSnow() {
  const snowflakeCount = 3500; // Number of snowflakes
  const geometry = new BufferGeometry();
  const vertices = [];

  for (let i = 0; i < snowflakeCount; i++) {
    const x = Math.random() * 2000 - 1000; // Spread in X
    const y = Math.random() * 2000 - 1000; // Spread in Y
    const z = Math.random() * 2000 - 1000; // Spread in Z
    vertices.push(x, y, z);
  }

  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

  const material = new PointsMaterial({
    color: 0xffffff,
    size: 3,
    sizeAttenuation: true,
  });
  snow = new Points(geometry, material);

  scene.add(this.snow);
}

const Tree = () => {
  const Colors = {
    brown: 0x59332e,
    green: 0x7abf8e,
  };
  const mesh = new Object3D();

  var matTreeLeaves = new MeshStandardMaterial({
    color: Colors.green,
    roughness: 0.7,
    metalness: 0.3,
  });
  var geonTreeBase = new BoxGeometry(10, 20, 10);
  var matTreeBase = new MeshPhongMaterial({ color: Colors.brown });
  var treeBase = new Mesh(geonTreeBase, matTreeBase);
  treeBase.castShadow = true;
  treeBase.receiveShadow = true;
  mesh.add(treeBase);

  var geomTreeLeaves1 = new CylinderGeometry(1, 12 * 3, 12 * 3, 4);
  var treeLeaves1 = new Mesh(geomTreeLeaves1, matTreeLeaves);
  treeLeaves1.castShadow = true;
  treeLeaves1.receiveShadow = true;
  treeLeaves1.position.y = 20;
  mesh.add(treeLeaves1);

  var geomTreeLeaves2 = new CylinderGeometry(1, 9 * 3, 9 * 3, 4);
  var treeLeaves2 = new Mesh(geomTreeLeaves2, matTreeLeaves);
  treeLeaves2.castShadow = true;
  treeLeaves2.position.y = 40;
  treeLeaves2.receiveShadow = true;
  mesh.add(treeLeaves2);

  var geomTreeLeaves3 = new CylinderGeometry(1, 6 * 3, 6 * 3, 4);
  var treeLeaves3 = new Mesh(geomTreeLeaves3, matTreeLeaves);
  treeLeaves3.castShadow = true;
  treeLeaves3.position.y = 55;
  treeLeaves3.receiveShadow = true;
  mesh.add(treeLeaves3);
};

function updateSnow() {
  /*
  const vertices = snow.geometry.attributes.position.array;
  for (let i = 1; i < vertices.length; i += 3) {
    vertices[i] -= 1; // Adjust speed of falling

    if (vertices[i] < -1000) {
      vertices[i] = 1000; // Reset flake to top
    }
  }
  //snow.geometry.attributes.position.needsUpdate = true;
  */
}

export { createSnow, createSnowyGround, createRandomObjects, createTrees };
