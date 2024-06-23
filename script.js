// Import Three.js library and Orbit Controls
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

// -- Global Variables --
// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas') });

// cube or geometric object
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 'blue' });
const cube = new THREE.Mesh(geometry, material);

// orbit controls --> zoom in/out with scroll, pan with right-click, and drag to orbit
const controls = new OrbitControls(camera, renderer.domElement);

// rotation variables
let isRotationEnabled = true;
let rotationSpeed = 0.01;

// Zoom variables
let zoomFactor = 5; // initial zoom factor
const zoomSlider = document.getElementById('zoom-slider');

// Main function
function main() {
    // add scene background color, set rendering size,
    // and add to DOM on web page (output)
    scene.background = new THREE.Color('#161718');
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // reposition or transform camera
    camera.position.set(0, 0, zoomFactor);
    
    // create world light and add to scene
    const light = new THREE.HemisphereLight('#FFFFFF', '#757575', 1.3);
    scene.add(light);
    
    // set initial cube position, rotation, and add to scene
    cube.position.set(0, 0, 0);
    cube.rotation.set(0.5, 0, 0);
    scene.add(cube);
    
    // call the update() function
    update();
    
    // setup UI controls
    setupUI();
}

// Update or animation function
function update() {
    // call the update() function every frame - creates a loop
    requestAnimationFrame(update);
    
    // rotate the cube
    if (isRotationEnabled) {
        cube.rotation.x += rotationSpeed;
        cube.rotation.y += rotationSpeed;
    }
    
    // render the updated scene and camera
    renderer.render(scene, camera);
};

// UI setup function
function setupUI() {
    // Start/Stop Rotation buttons
    const startRotationBtn = document.createElement('button');
    startRotationBtn.textContent = 'Start Rotation';
    startRotationBtn.addEventListener('click', () => {
        isRotationEnabled = true;
    });
    document.getElementById('ui-controls').appendChild(startRotationBtn);
    
    const stopRotationBtn = document.createElement('button');
    stopRotationBtn.textContent = 'Stop Rotation';
    stopRotationBtn.addEventListener('click', () => {
        isRotationEnabled = false;
    });
    document.getElementById('ui-controls').appendChild(stopRotationBtn);
    
    // Zoom Slider
    zoomSlider.addEventListener('input', (event) => {
        zoomFactor = 10 - event.target.value / 10; // invert zoom value
        updateCameraPosition();
    });
}

// Function to update camera position based on zoom factor
function updateCameraPosition() {
    camera.position.z = zoomFactor;
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// call the main() function to initiate the scene
main();
