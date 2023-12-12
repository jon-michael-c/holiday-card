import { Color, Fog, LinearFilter, Scene, TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh, BackSide } from "three";

function createScene() {
   // Scene setup
   const scene = new Scene();

   scene.background = new Color(0x88ccee);
   scene.fog = new Fog(0xd5f8f8, 200, 700);
 
   let bgTexture = new TextureLoader().load("../src/3js/textures/background/background.png");
   bgTexture.minFilter = LinearFilter;
 
   // Create a sphere geometry with a large radius
   // Set phiLength to Math.PI to create a hemisphere
   let geometry = new SphereGeometry(100, 60, 40, 0, Math.PI * 2, 0, Math.PI);
   // Flip the geometry on the x-axis to make it visible from the inside
   geometry.scale(-1, 1, 1);
 
   // Create a basic material and apply the texture
   let material = new MeshBasicMaterial({
     map: bgTexture
   });
 
   // Create a mesh with the geometry and material
   let skybox = new Mesh(geometry, material);
   skybox.position.x = 10
   // Add it to the scene
   scene.add(skybox);
 
   return scene;
}

export { createScene };