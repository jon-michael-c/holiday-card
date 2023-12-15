import { MeshBasicMaterial } from "three";
import {
  Texture,
  PlaneGeometry,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  MeshPhongMaterial,
  BufferGeometry,
  Points,
  PointsMaterial,
  Object3D,
  CylinderGeometry,
  SmoothShading,
} from "three";
import { Easing, Tween } from "tween";

class randomObjects {
  constructor() {
    this.group = this.createRandomObjects();
  }

  getGroup() {
    return this.group;
  }

  createRandomObjects() {
    const randomObjects = [];
    const objectCount = 10; // Number of random objects
    const range = 20; // Range of coordinates
    const maxCoordinate = range / 2; // Maximum coordinate value
    this.minX = -10; // Minimum x position
    this.maxX = 10; // Maximum x position
   this.minY = 1; // Minimum y position
    this.maxY = 9; // Maximum y position
    this.minZ = -15; // Minimum z position
    this.maxZ = -5; // Maximum z position

    for (let i = 0; i < objectCount; i++) {
      // Create random geometries like box, sphere, cone, etc.
      const geometries = [
        new BoxGeometry(1, 1, 1),
        new SphereGeometry(0.5, 32, 32),
        new ConeGeometry(0.5, 1, 32),
        // ... add more geometries if you like
      ];
      const material = new MeshBasicMaterial({
        color: Math.random() * 0xffffff,
      });
      const randomGeometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const object = new Mesh(randomGeometry, material);

      // Position objects randomly within the range
      object.position.x = Math.random() * (this.maxX - this.minX) + this.minX;
      object.position.y = Math.random() * (this.maxY - this.minY) + this.minY;
      object.position.z = Math.random() * (this.maxZ - this.minZ) + this.minZ;

      object.receiveShadow = true;
      object.castShadow = true;
      randomObjects.push(object);
    }

    return randomObjects;
  }

  randomize() {
    const range = 20; // Range of coordinates
    const maxCoordinate = range / 2; // Maximum coordinate value
    const easing = Easing.Elastic.InOut; // Use the Elastic InOut easing function

    // Using tween to randomize the objects
    this.group.forEach((object) => {
      // Randomize position
      new Tween(object.position)
        .to(
          {
            x: Math.random() * (this.maxX - this.minX) + this.minX,
            y: Math.random() * (this.maxY - this.minY) + this.minY,
            z: Math.random() * (this.maxZ - this.minZ) + this.minZ,
          },
          1000
        )
        .easing(easing) // Use the Elastic InOut easing function
        .start();

      // Randomize color
      object.material.color.set(Math.random() * 0xffffff);
    });
  }
}

function createTrees() {
  const trees = [];
  const treeCount = 5; // Number of trees
  const range = 20; // Range of coordinates
  const maxCoordinate = range / 2; // Maximum coordinate value
  const minX = -maxCoordinate; // Minimum x position
  const maxX = maxCoordinate; // Maximum x position
  const minY = -maxCoordinate; // Minimum y position
  const maxY = maxCoordinate; // Maximum y position
  const minZ = -maxCoordinate; // Minimum z position
  const maxZ = maxCoordinate; // Maximum z position

  for (let i = 0; i < treeCount; i++) {
    const tree = Tree();
    tree.position.set(
      Math.random() * (maxX - minX) + minX,
      minY,
      Math.random() * (maxZ - minZ) + minZ
    );

    trees.push(tree);
  }

  return trees;
}
/*

const Tree = () => {
  const Colors = {
    brown: 0x59332e,
    green: 0x7abf8e,
  };
};
  

  for (let i = 0; i < objectCount; i++) {
    // Create random geometries like box, sphere, cone, etc.
    const geometries = [
      new BoxGeometry(1, 1, 1),
      new SphereGeometry(0.5, 32, 32),
      new ConeGeometry(0.5, 1, 32),
      // ... add more geometries if you like
    ];
    const material = new MeshBasicMaterial({
      color: Math.random() * 0xffffff,
    });
    const randomGeometry =
      geometries[Math.floor(Math.random() * geometries.length)];
    const object = new Mesh(randomGeometry, material);

    // Position objects randomly within the range
    object.position.x = (Math.random() - 0.5) * range;
    object.position.y = (Math.random() - 0.5) * range;
    object.position.z = (Math.random() - 0.5) * range;

    object.receiveShadow = true;
    object.castShadow = true;
    randomObjects.push(object);
  }

  return randomObjects;
}

function randomize() {
  //Using tween to randomize the objects
  this.group.forEach((object) => {
    new Tween(object.position)
      .to(
        {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
          z: (Math.random() - 0.5) * 20,
        },
        1000
      )
      .start();
  });
}


}

function createTrees() {
  const trees = [];
  const treeCount = 5; // Number of trees
  for (let i = 0; i < treeCount; i++) {
    const tree = Tree();
    tree.position.set(
      (Math.random() - 0.5) * 599, // Random X position
      -1, // Y position (adjust based on ground level)
      (Math.random() - 0.5) * 1000 // Random Z position
    );

    trees.push(tree);
  }

  return trees;
}

const Tree = () => {
  const Colors = {
    brown: 0x59332e,
    green: 0x7abf8e,
  };
  const mesh = new Object3D();

  var matTreeLeaves = new MeshPhongMaterial({
    color: Colors.green,
    roughness: 0.7,
    metalness: 0.3,
  });
  var geonTreeBase = new BoxGeometry(10, 20, 10);
  var matTreeBase = new MeshPhongMaterial({
    color: Colors.brown,
  });
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

  return mesh;
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
}
  */


export { randomObjects, createTrees };
