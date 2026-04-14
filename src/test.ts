import * as THREE from 'three/webgpu';

const main = async () => {
    const renderer = new THREE.WebGPURenderer({ });
    await renderer.init();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    document.body.appendChild(renderer.domElement);
}
main();