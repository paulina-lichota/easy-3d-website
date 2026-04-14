import * as THREE from 'three/webgpu';
import { Inspector } from 'three/addons/inspector/Inspector.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// vite fa da bundler + hash alfanumerico -> ottimizzazine 
import modelURL from '../assets/Untitled.glb?url'; // ?url e' per includere file nel bundle finale

import './main.css';


const myWP = new THREE.Vector3();

const main = async () => {
    /* Creazione elemento "app" */
    const container = document.createElement('app');

    const renderer = new THREE.WebGPURenderer({ });
    await renderer.init();


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    const geometry = new THREE.BoxGeometry(1, 1, 2);
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

    /* Axes helper */
    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.position.set(0, 0, 0);
    scene.add(axesHelper);

    /* Grid helper */
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // se voglio trasformare pos locale devo usare 
    // molto expensive, parte dal fondo per calcolare tutto 
    // per questo non esiste direttamente in cube 
    cube.getWorldPosition(cube.position);
    
    // non creare oggetti nuovi dentro ogni frame
    // calcola prima vettori e poi inserisce oggetto gia' esistente dentr lo space


    /* Inspector (ANCORA SPERIMENTALE) va inizializzato dopo che la scena e il renderer sono pronti */
    // const inspector = new Inspector();
    // container.appendChild(inspector.domElement);

    /* Per misurare il tempo di rendering */
    const timer = new THREE.Timer();

    /* il browser e' cappato a 60fps */
    renderer.setAnimationLoop(() => {
        // inspector.begin();
        timer.update();
        const delta = timer.getDelta();
        cube.rotation.y += 1 * delta; // delta normalizza la velocita'
        // cube.rotation.y += 0.1;
        renderer.render(scene, camera);
        // inspector.finish();
    });

    const loader = new GLTFLoader();
    const model = await loader.loadAsync(modelURL);
    scene.add(model.scene);

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
    /* Aggiungo "app" al DOM */
    document.body.appendChild(container);
    /* Aggiungo renderer.domElement (CANVAS) al DOM */
    container.appendChild(renderer.domElement);
}
main();