import * as dat from "dat.gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createCamera } from "./components/camera";
import { CharacterCube } from "./components/cube";
import { LightSetup } from "./components/lights";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Loop } from "./systems/Loop";
import { Resizer } from "./systems/Resizer";
import { createControls } from "./systems/controls";
import snowSystem from "./components/snow";
import { Ground } from "./components/ground";
import { Background } from "./components/background";
//import { AudioControl } from "./systems/AudioControl";
import { ProgressBar, loadingManager } from "./systems/ProgressBar";
import { Vector3 } from "three";
import { Trees, randomObjects } from "./components/objects";
import { AudioControl } from "./systems/AudioControl";



class HoliCard {
  constructor(container) {
    this.objects = {};
    this.textures = [];
    this.models = [];
    this.mobile = false;
    this.objects = [];

    this.loadingScreen = document.querySelector(".loading-screen");

    this.controlContainer = document.querySelector("#main-controls");
    this.audioBtn = document.querySelector(".audio-control");
    // Scene Setup
    this.renderer = createRenderer(container, window);
    this.camera = createCamera(container);
    this.scene = createScene();
    //container.append(renderer.domElement);

    this.progress = new ProgressBar(document.querySelector(".progress"));
    // Loading Textures and Models
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressPercentage = itemsLoaded / itemsTotal;
      this.progress.updateProgress(progressPercentage);
    };

    loadingManager.onLoad = () => {
      this.loadingScreen.classList.toggle("active");
      this.controlContainer.classList.toggle("active");
      this.audioBtn.classList.toggle("active");
    };

    /*
    const loader = new GLTFLoader(loadingManager);
    loader.load(
      "../src/3js/models/gift.gltf",
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
    */

    // Loading Objects
    this.controls = createControls(this.camera, container);
    this.controls.enabled = false;

    this.objects.background = new Background();
    this.objects.lights = new LightSetup();
    this.objects.characterCube = new CharacterCube("");
    this.objects.ground = new Ground();
    //this.objects.randomObjects = new randomObjects(this.camera);
    this.objects.snow = new snowSystem(600);

    // Creating Object Array
    Object.keys(this.objects).forEach((key) => {
      let obj = this.objects[key].getGroup();
      for (let item of obj) {
        this.scene.add(item);
      }
    });

    this.loop = new Loop(this.camera, this.scene, this.renderer, this.objects);
    // All Updatables
    this.loop.updatables.push(this.controls);
    this.loop.updatables.push(this.objects.snow);

    const resizer = new Resizer(container, this.camera, this.renderer);

    window.addEventListener(
      "resize",
      function () {
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );

    this.objects.camera = this.camera;
    this.camera.lookAt(this.objects.characterCube.getGroup()[0].position);

    const audioControl = new AudioControl();
    const audioBtn = document.querySelector(".audio-btn");

    audioBtn.addEventListener("click", () => {
      audioControl.toggle();
      audioBtn.classList.toggle("sound-mute");
    });

    if (window.innerWidth < 1000) {
      this.mobile = true
      this.mobileView();
    }
  }

  render() {
    renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();

    //this.animateCamera(0);
  }

  stop() {
    this.loop.stop();
  }

  randomize() {
    this.objects.characterCube.randomize();
    this.objects.background.randomize();
    //this.objects.randomObjects.randomize();
  }



  mobileView() {
    let camera = this.camera;
    let controls = this.controls;

    let x =
      0.28876068598787397;
    let y = 0.23678319474539267;
    let z = 13.799811142573176;
    let rx = -0.05622855826035533;
    let ry = 1.6344826201975486;
    let rz = -0.5110990680069073;

    camera.position.set(x, y, z);
    camera.fov = 35;
    controls.target.set(rx, ry, rz);
    camera.updateProjectionMatrix();
    this.objects.background.group[0].position.y = 225;
    this.objects.background.group[0].position.z = -1000;
  }

  mobileMove() {
    let rx = -0.10658365459148963;
    let ry = 0.19442940878080182;
    let rz = -0.6180200058795579;
    let x = 0.35653253938844454;
    let y = 1.3870377060115116;
    let z = 13.684200063864921;

    let camera = this.camera;
    let controls = this.controls;

    camera.position.set(x, y, z);
    camera.updateProjectionMatrix();
    controls.target.set(rx, ry, rz);
  }
}

export { HoliCard }