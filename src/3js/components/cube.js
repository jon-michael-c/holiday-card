import { MeshToonMaterial } from "three";
import {
  Group,
  MeshPhongMaterial,
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
} from "three";
import { TextureLoader } from "three";
import { Tween, Easing } from "tween";

class CharacterCube {
  constructor(textures) {
    this.textures = textures;
    this.group = this.createCube();
  }

  getGroup() {
    return this.group;
  }

  createCube() {
    const cubeGroup = new Group();
    const sectionSize = 2; // Size of each section
    let sectionHeight = 1; // Height of each section

    function createMaterialsForSection(colors, textures) {
      const loader = new TextureLoader();
      return colors.map((color, index) => {
        if (index === 2 || index === 3) {
          return new MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            shadowSide: false,
          });
        }
        const texture = loader.load(textures[index]);
        return new MeshBasicMaterial({
          map: texture,
          transparent: true,
          shadowSide: false,
        });
      });
    }

    // Colors and textures for the faces of each section
    const sectionColors = [
      [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff], // Section 1 colors
      [0x000000, 0xffffff, 0x777777, 0x333333, 0x999999, 0x555555], // Section 2 colors
      [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff], // Section 1 colors
      [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff], // Section 1 colors
    ];

    // Paths to the textures for each face of the cube
    let texturesHead = [
      "../src/3js/textures/characters/head/Architect_2.png",
      "../src/3js/textures/characters/head/Dreamer_2.png",
      "../src/3js/textures/characters/head/Researcher_2.png",
      "../src/3js/textures/characters/head/Architect_2.png",
      "../src/3js/textures/characters/head/Dreamer_2.png",
      "../src/3js/textures/characters/head/Researcher_2.png",
    ];

    let texturesBody = [
      "../src/3js/textures/characters/body/Architect_3.png",
      "../src/3js/textures/characters/body/Dreamer_3.png",
      "../src/3js/textures/characters/body/Researcher_3.png",
      "../src/3js/textures/characters/body/Architect_3.png",
      "../src/3js/textures/characters/body/Dreamer_3.png",
      "../src/3js/textures/characters/body/Researcher_3.png",
    ];

    let texturesLeg = [
      "../src/3js/textures/characters/leg/Architect_4.png",
      "../src/3js/textures/characters/leg/Dreamer_4.png",
      "../src/3js/textures/characters/leg/Researcher_4.png",
      "../src/3js/textures/characters/leg/Architect_4.png",
      "../src/3js/textures/characters/leg/Dreamer_4.png",
      "../src/3js/textures/characters/leg/Researcher_4.png",
    ];

    let texturesTop = [
      "../src/3js/textures/characters/top/Architect_1.png",
      "../src/3js/textures/characters/top/Dreamer_1.png",
      "../src/3js/textures/characters/top/Researcher_1.png",
      "../src/3js/textures/characters/top/Architect_1.png",
      "../src/3js/textures/characters/top/Dreamer_1.png",
      "../src/3js/textures/characters/top/Researcher_1.png",
    ];

    const sectionTextures = [
      texturesLeg,
      texturesBody,
      texturesHead,
      texturesTop,
      // ... add more textures for more sections
    ];

    let cumulativeHeight = 0;
    for (let i = 0; i < sectionColors.length; i++) {
      let sectionHeight;
      if (i == 0) {
        sectionHeight = 1.35;
      } else if (i == 1) {
        sectionHeight = 1;
      } else if (i == 2) {
        sectionHeight = 0.6;
      } else if (i == 3) {
        sectionHeight = 0.8;
      }

      let geometry = new BoxGeometry(sectionSize, sectionHeight, sectionSize);
      const materials = createMaterialsForSection(
        sectionColors[i],
        sectionTextures[i]
      );
      const section = new Mesh(geometry, materials);
      section.position.y = cumulativeHeight + sectionHeight / 2; // Adjust y-position based on cumulative height
      cumulativeHeight += sectionHeight; // Update cumulative height
      cubeGroup.add(section); // Add to group
    }

    return [cubeGroup];
  }

  randomize() {
    this.group[0].children.forEach((section) => {
      // Calculate a random rotation that aligns with the cube faces
      const randomRotation =
        720 * (Math.PI / 180) + (Math.floor(Math.random() * 25) * Math.PI) / 2;
      const easing = Easing.Cubic.Out;

      // Create a new tween for the rotation
      new Tween(section.rotation)
        .to({ y: randomRotation }, 1000) // Rotate to the random rotation over 1 second
        .easing(easing) // Use the custom Bezier easing function
        .delay(100) // Add a delay of 0.5 seconds before starting the tween
        .start(); // Start the tween
    });
  }
}

export { CharacterCube };
