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
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { loadingManager } from "../systems/ProgressBar";
import { Vector3 } from "three";




class randomObjects {

  constructor(camera) {
    this.camera = camera;
    this.group = this.createRandomObjects();
  }

  getGroup() {
    return this.group;
  }

  createRandomObjects() {
    const randomObjects = [];
    const objectCount = 7; // Number of random objects
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
      object.lookAt(this.camera.position);
      randomObjects.push(object);
    }

    //add a model to the scene 
    const loader = new GLTFLoader(loadingManager);
    let gift;
    loader.load('../src/3js/models/gift.gltf', function (gltf) {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.position.set(2, 2, 2);
      gltf.scene.rotation.y = Math.PI / 2;
      gift = gltf.scene;
      randomObjects.push(gift);
    })





    return randomObjects;
  }

  randomColor() {
    let colors = [0x5440da, 0xff7866, 0x92c2c3, 0x80cb9e, 0xffb55e];



    return colors[Math.floor(Math.random() * colors.length)];
  }

  randomize() {
    const range = 20; // Range of coordinates
    const maxCoordinate = range / 2; // Maximum coordinate value
    const easing = Easing.Elastic.InOut; // Use the Elastic InOut easing function

    // Using tween to randomize the objects
    this.group.forEach((object) => {
      // Randomize position
      new Tween(object.position)
        .onComplete(() => {

          if (object.material) {

            object.material.color.setHex(this.randomColor());
          }
          object.lookAt(this.camera.position);

        })

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



    });
  }
}

class Trees {
  constructor() {
    this.group = this.createTrees();

  }
  getGroup() {
    return this.group;
  }

  createTrees() {
    const trees = [];
    const treeCount = 25; // Number of trees
    this.minX = -25; // Minimum x position
    this.maxX = 25; // Maximum x position
    this.minY = -1; // Minimum y position
    this.maxY = 0.6; // Maximum y position
    this.minZ = -120; // Minimum z position
    this.maxZ = -70; // Maximum z position

    for (let i = 0; i < treeCount; i++) {
      const tree = Tree();
      tree.position.set(
        Math.random() * (this.maxX - this.minX) + this.minX,
        this.minY,
        Math.random() * (this.maxZ - this.minZ) + this.minZ
      );

      trees.push(tree);
    }

    return trees;
  }
}






const Tree = () => {
  const Colors = {
    brown: 0x59332e,
    green: 0x80cb9e,
  };
  let x = 0.5;
  let y = 6 * 3;
  let z = 4;
  let w = 6 * 3;

  const factor = 0.15;

  const mesh = new Object3D();

  var matTreeLeaves = new MeshBasicMaterial({
    color: Colors.green,
  });
  var geonTreeBase = new BoxGeometry(1, 2, 1);
  var matTreeBase = new MeshBasicMaterial({
    color: Colors.brown,
  });
  var treeBase = new Mesh(geonTreeBase, matTreeBase);
  mesh.add(treeBase);

  var geomTreeLeaves1 = new CylinderGeometry(x, y, w, z); // Half the size of the first set of leaves

  var treeLeaves1 = new Mesh(geomTreeLeaves1, matTreeLeaves);
  treeLeaves1.position.y = 1.5;
  treeLeaves1.scale.set(factor / 1.2, factor / 1.2, factor / 1.2); // Adjust the scale values as needed
  mesh.add(treeLeaves1);

  var geomTreeLeaves2 = new CylinderGeometry(x, y, w, z); // Half the size of the second set of leaves
  var treeLeaves2 = new Mesh(geomTreeLeaves2, matTreeLeaves);
  treeLeaves2.position.y = 2.1;
  treeLeaves2.scale.set(factor / 1.5, factor / 1.5, factor / 1.5); // Adjust the scale values as needed
  mesh.add(treeLeaves2);

  var geomTreeLeaves3 = new CylinderGeometry(x, y, w, z); // Half the size of the second set of leaves
  var treeLeaves3 = new Mesh(geomTreeLeaves3, matTreeLeaves);
  treeLeaves3.position.y = 2.7;
  treeLeaves3.scale.set(factor / 2, factor / 2, factor / 2); // Adjust the scale values as needed

  // Add fog to the material

  mesh.add(treeLeaves3);


  return mesh;
};



export { randomObjects, Trees };
