import * as dat from "dat.gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import { createCamera } from "./components/camera";
import { CharacterCube, createCube, rotateFace } from "./components/cube";
import { LightSetup, createLights } from "./components/lights";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";
import { createRandomObjects, createTrees } from "./components/objects";
import { createControls } from "./systems/controls";
import snowSystem from "./components/snow";
import { Ground } from "./components/ground";
import { Background } from "./components/background";
import { TextureLoader } from "three";
import { AudioControl } from "./systems/AudioControl";
import { ProgressBar, loadingManager } from "./systems/ProgressBar";
import { Tween } from "tween";

let camera;
let renderer;
let scene;
let loop;
let objects = {};
let textures = [];
let models = [];

export default class HoliCard {
  constructor(container, window) {
    this.objects = objects;

    // Scene Setup
    renderer = createRenderer(container, window);
    camera = createCamera(container);
    scene = createScene();
    //container.append(renderer.domElement);

    this.progress = new ProgressBar(document.querySelector(".progress"));
    // Loading Textures and Models
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressPercentage = itemsLoaded / itemsTotal;
      console.log(progressPercentage);
      this.progress.updateProgress(progressPercentage);
    };

    loadingManager.onLoad = () => {
      const loadingScreen = document.querySelector(".loading-screen");
      loadingScreen.classList.toggle("active");
    };

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

    // Loading Objects
    this.controls = createControls(camera, container);

    objects.background = new Background();
    objects.lights = new LightSetup();
    objects.characterCube = new CharacterCube("");
    objects.ground = new Ground();
    //objects.randomObjects = createRandomObjects();
    //objects.trees = createTrees();
    objects.snow = new snowSystem(200);

    // Creating Object Array
    Object.keys(objects).forEach((key) => {
      let obj = objects[key].getGroup();
      console.log(obj);

      for (let item of obj) {
        scene.add(item);
      }
    });

    loop = new Loop(camera, scene, renderer, objects);
    // All Updatables
    loop.updatables.push(this.controls);
    loop.updatables.push(objects.snow);

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
    camera.lookAt(objects.characterCube.getGroup()[0].position);

    // Setup Audio
    this.audio = new AudioControl("../src/3js/music/holiday_card.mp3");
    const audioBtn = document.querySelector(".audio-btn");

    audioBtn.addEventListener("click", () => {
      this.audio.toggle();
      audioBtn.classList.toggle("sound-mute");
    });

    if (window.innerWidth < 1000) {
      this.mobileView();
    }
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

  randomize() {
    this.objects.characterCube.randomize();
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

  mobileView() {
    let camera = objects.camera;
    let controls = this.controls;

    let x = -0.22523875644074512;
    let y = 2.3288688548574648;
    let z = 24.85642614691905;
    let rx = 0.010347330265404096;
    let ry = 0.03927447524039436;
    let rz = -0.33514495429318364;

    camera.position.set(x, y, z);
    controls.target.set(rx, ry, rz);
  }

  mobileMove() {
    let dy = 0.9755705459399936;

    new Tween(this.objects.camera.position).to({ y: dy }).delay(150).start();
  }
}
