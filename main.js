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

// Create a camera screen overlay
let isCameraScreenActive = false;
const cameraScreen = document.createElement('div');
cameraScreen.id = 'cameraScreen';
cameraScreen.style.position = 'fixed';
cameraScreen.style.top = '0';
cameraScreen.style.left = '0';
cameraScreen.style.width = '100%';
cameraScreen.style.height = '100%';
cameraScreen.style.backgroundColor = 'black';
cameraScreen.style.opacity = '0';
cameraScreen.style.display = 'flex';
cameraScreen.style.alignItems = 'center';
cameraScreen.style.justifyContent = 'center';
cameraScreen.style.color = 'white';
cameraScreen.style.fontSize = '2em';
cameraScreen.style.transition = 'opacity 1s'; // Animation duration
cameraScreen.innerText = 'CAMERA FEED';
document.body.appendChild(cameraScreen);
let leftDoorStatus = 'open';
let rightDoorStatus = 'open';
// Listen for spacebar keydown to toggle camera screen
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        isCameraScreenActive = !isCameraScreenActive;
        cameraScreen.style.opacity = isCameraScreenActive ? '1' : '0';
    }
    if (event.code === 'KeyA') {
        if (leftDoorStatus === 'closed') {
            
            leftDoorStatus = 'open';
            console.log("left door open");
        } else if (leftDoorStatus === 'open') {
            leftDoorStatus = 'closed';
            console.log("left door closed");
        }
    }
    if (event.code === 'KeyD') {
            
        if (rightDoorStatus === 'closed') {
            rightDoorStatus = 'open';
            console.log("right door open");
        }
        else if (rightDoorStatus === 'open') {
            rightDoorStatus = 'closed';
            console.log("right door closed");
        }
    }
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
