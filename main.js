import * as THREE from 'three';

// main.js

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Ceiling
const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 2.5;
scene.add(ceiling);

// Office Walls (Rectangles)
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });

// Back Wall
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
backWall.position.z = -5;
scene.add(backWall);

// Left Wall
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -5;
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), wallMaterial);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.x = 5;
scene.add(rightWall);

// Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.5;
scene.add(floor);

// Camera Position
camera.position.z = 0;
camera.position.y = 0;

// Mouse Movement for Looking Around
let mouseX = 0;
document.addEventListener('mousemove', (event) => {
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseX = -normalizedX * Math.PI / 4;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate camera based on mouse movement
    camera.rotation.y = mouseX;

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
