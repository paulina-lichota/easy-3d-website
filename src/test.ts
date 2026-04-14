import * as THREE from 'three/webgpu';

import './main.css';

const main = async () => {
    const container = document.createElement('app');

    const renderer = new THREE.WebGPURenderer({ });
    await renderer.init();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    /* Mesh = geometria + materiale */
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // /* Ambient light, simuliamo riflessione ambientale della luce */
    // scene.add(new THREE.AmbientLight(0x404040));

    /* Si chiama directional light ma non ha direzione... non risponde a una luce */
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        /* Cambio prospettiva camera siccome finestra si sta ridimensionando */
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);
    onResize();
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);
}
main();