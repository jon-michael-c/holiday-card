import * as dat from "dat.gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import { createCamera } from "./components/camera";
import { createCube, rotateFace } from "./components/cube";
import { createLights } from "./components/lights";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";
import { createRandomObjects, createTrees } from "./components/objects";
import { createControls } from "./systems/controls";
import snowSystem from "./components/snow";
import { createSnowyGround } from "./components/ground";
import { LoadingManager } from "three";
import { Vector3 } from "three";

let camera;
let renderer;
let scene;
let loop;
let objects = {};
let startTime = null;

export default class HoliCard {
  constructor(container, window) {
    this.isRotating = false;
    this.rotationSpeed = 0.05; // Adjust this for smoother rotation
    this.totalRotation = 0;
    this.targetRotation = Math.PI / 2; // 90 degrees in radians
    this.currentSection = null;
    this.objects = objects;

    renderer = createRenderer(container, window);
    camera = createCamera(container);
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    //container.append(renderer.domElement);

    const loadingManager = new LoadingManager();
    loadingManager.onLoad = () => {
      const loadingScreen = document.getElementById("preloader");
      loadingScreen.style.display = "none";
    };

    const controls = createControls(camera, container);
    const snow = new snowSystem(200);
    objects.cubeGroup = createCube();
    objects.lights = createLights();
    objects.ground = createSnowyGround();
    objects.randomObjects = createRandomObjects();
    objects.trees = createTrees();
    objects.snow = snow.getSnow();

    Object.keys(objects).forEach((key) => {
      let obj = objects[key];
      if (Array.isArray(obj)) {
        for (let item of obj) {
          scene.add(item);
        }
      } else {
        scene.add(obj);
      }
    });

    loop.updatables.push(controls);
    loop.updatables.push(snow);

    const resizer = new Resizer(container, camera, renderer);
    window.addEventListener(
      "resize",
      function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );

    objects.camera = camera;

    const loader = new GLTFLoader(loadingManager);
    loader.load(
      "../src/3js/models/low_poly_cabin.glb",
      function (gltf) {
        // This function is called when the load is completed
        //scene.add(gltf.scene);
      },
      function (xhr) {
        // This function is called during the loading process
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        // This function is called if an error occurs
        console.error("An error happened", error);
      }
    );
  }

  rotateFace(direction, idx) {
    this.isRotating = true;
    this.currentRotationStep =
      this.rotationSpeed * (direction === "left" ? -1 : 1);
    this.totalRotation = 0; // Reset total rotation
    this.targetRotation = Math.PI / 2; // 90 degrees in radians
    this.currentSection = this.objects.cubeGroup.children[idx];
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();

    //this.animateCamera(0);
  }

  stop() {
    loop.stop();
  }

  animateCamera(time) {
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    const duration = 1000;
    const initialPosition = new Vector3(-32.411, 9.651, 12.487);
    const targetPosition = new Vector3(-6.022, 2.278, 2.767);

    console.log(time);
    if (!startTime) startTime = time;
    const elapsedTime = time - startTime;

    // Calculate the progress as a value between 0 and 1
    const progress = easeInOutQuad(Math.min(elapsedTime / duration, 1));
    console.log(progress);

    console.log(camera.position);
    // Interpolate the camera position between the initial and target positions
    camera.position.lerpVectors(initialPosition, targetPosition, progress);
    console.log(camera.position);

    // Continue the animation or stop if we've reached the target
    if (progress < 1) {
      requestAnimationFrame(card.animateCamera);
    }
    renderer.render(scene, camera);
  }

  setupGui() {
    this.gui = new dat.GUI();

    // Example: Control for ambient light intensity
    const ambientLightFolder = this.gui.addFolder("Ambient Light");
    ambientLightFolder
      .add(this.ambientLight, "intensity", 0, 2, 0.1)
      .name("Intensity");

    // Example: Control for directional light position
    const directionalLightFolder = this.gui.addFolder("Directional Light");
    directionalLightFolder
      .add(this.mainLight.position, "x", -100, 100, 1)
      .name("Position X");
    directionalLightFolder
      .add(this.mainLight.position, "y", -100, 100, 1)
      .name("Position Y");
    directionalLightFolder
      .add(this.mainLight.position, "z", -100, 100, 1)
      .name("Position Z");
    directionalLightFolder
      .add(this.mainLight, "intensity", 0, 2, 0.1)
      .name("Intensity");

    // Add more controls as needed for other lights or properties
  }
}
