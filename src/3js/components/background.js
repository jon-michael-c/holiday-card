import { BoxGeometry, BackSide, PlaneGeometry, Mesh, TextureLoader, MeshBasicMaterial } from 'three';

class Background {
    constructor(texture) {
        this.group = this.createSkyBox();
        this.texture = texture
    }

    getGroup() {
        return this.group;
    }



    createSkyBox() {
        const loader = new TextureLoader();
        const texture = loader.load('../src/3js/textures/background/background.png');
        const geometry = new BoxGeometry(2000, 540); // Adjust size as needed
        const material = new MeshBasicMaterial({
            map: texture,
        });

        const skybox = new Mesh(geometry, material);
        skybox.position.set(0, 200, -450)
        return [skybox];
    }
}

export { Background }