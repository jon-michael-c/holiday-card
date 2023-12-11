import { MeshToonMaterial } from "three";
import { Group, MeshPhongMaterial, BoxGeometry, Mesh } from "three";
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
    const sectionHeight = 1; // Height of each section

    // Function to create an array of materials with different textures for each face
    function createMaterialsForSection(colors, textures) {
      const loader = new TextureLoader();
      return colors.map((color, index) => {
        const texture = loader.load(textures[index]);
        return new MeshPhongMaterial({ color: color, map: texture });
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
      "../src/3js/textures/characters/head/Researcher_2.png"
    ];

    let texturesBody = [
      "../src/3js/textures/characters/body/Architect_3.png",
      "../src/3js/textures/characters/body/Dreamer_3.png",
      "../src/3js/textures/characters/body/Researcher_3.png",
      "../src/3js/textures/characters/body/Architect_3.png",
      "../src/3js/textures/characters/body/Dreamer_3.png",
      "../src/3js/textures/characters/body/Researcher_3.png"
    ];

    let texturesLeg = [
      "../src/3js/textures/characters/leg/Architect_4.png",
      "../src/3js/textures/characters/leg/Dreamer_4.png",
      "../src/3js/textures/characters/leg/Researcher_4.png",
      "../src/3js/textures/characters/leg/Architect_4.png",
      "../src/3js/textures/characters/leg/Dreamer_4.png",
      "../src/3js/textures/characters/leg/Researcher_4.png"
    ];

    let texturesTop = [
      "../src/3js/textures/characters/top/Architect_1.png",
      "../src/3js/textures/characters/top/Dreamer_1.png",
      "../src/3js/textures/characters/top/Researcher_1.png",
      "../src/3js/textures/characters/top/Architect_1.png",
      "../src/3js/textures/characters/top/Dreamer_1.png",
      "../src/3js/textures/characters/top/Researcher_1.png"
    ];

    const sectionTextures = [
      texturesLeg,
      texturesBody,
      texturesHead,
      texturesTop,
      // ... add more textures for more sections
    ];

    // Create and position each section
    for (let i = 0; i < sectionColors.length; i++) {
      const geometry = new BoxGeometry(sectionSize, sectionHeight, sectionSize);
      const materials = createMaterialsForSection(sectionColors[i], sectionTextures[i]);
      const section = new Mesh(geometry, materials);
      section.position.y = (i - 1.5) * sectionHeight;
      cubeGroup.add(section); // Add to group
    }


    return [cubeGroup];
  }

  randomize() {
    this.group[0].children.forEach((section) => {
      // Calculate a random rotation that aligns with the cube faces
      const randomRotation = Math.floor(Math.random() * 25) * Math.PI / 2;
      const easing = Easing.Cubic.Out;

      // Create a new tween for the rotation
      new Tween(section.rotation)
      .to({ y: randomRotation }, 1000) // Rotate to the random rotation over 1 second
      .easing(easing) // Use the custom Bezier easing function
      .start(); // Start// Start the tween
    });
  } 
}

export { CharacterCube };
