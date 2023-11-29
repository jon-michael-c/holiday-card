import { MeshToonMaterial } from "three";
import { Group, MeshPhongMaterial, BoxGeometry, Mesh } from "three";

function createCube() {
  const cubeGroup = new Group();
  const sectionSize = 2; // Size of each section
  const sectionHeight = 1; // Height of each section

  // Function to create an array of materials with different colors for each face
  function createMaterialsForSection(colors) {
    return colors.map((color) => new MeshPhongMaterial({ color: color }));
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
    const geometry = new BoxGeometry(sectionSize, sectionHeight, sectionSize);
    const materials = createMaterialsForSection(sectionColors[i]);
    const section = new Mesh(geometry, materials);
    section.position.y = (i - 1.5) * sectionHeight;
    cubeGroup.add(section); // Add to group
  }

  cubeGroup.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  cubeGroup.position.x = 0;
  return cubeGroup;
}

export { createCube };
