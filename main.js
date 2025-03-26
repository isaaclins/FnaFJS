import * as THREE from 'three';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000); // updated FOV to 80
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ceiling
const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 2.5;
scene.add(ceiling);

// left door
const leftDoorMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const leftDoor = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 10), leftDoorMaterial);
leftDoor.rotation.y = Math.PI / 2;
leftDoor.position.x = -5;
leftDoor.position.y = -2.5;
leftDoor.position.z = -3.75;
scene.add(leftDoor);

// right door
const rightDoorMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const rightDoor = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 10), rightDoorMaterial);
rightDoor.rotation.y = -Math.PI / 2;
rightDoor.position.x = 5;
rightDoor.position.y = -2.5;
rightDoor.position.z = -3.75;
scene.add(rightDoor);

// Define target positions for the doors (initially set to the closed position)
let leftDoorTargetY = leftDoor.position.y;
let rightDoorTargetY = rightDoor.position.y;

// Instead of immediately setting the door positions, update the target values.
function closeLeftDoor() {
    leftDoorTargetY = -2.5;
}
function openLeftDoor() {
    leftDoorTargetY = 15;
}

function closeRightDoor() {
    rightDoorTargetY = -2.5;
}
function openRightDoor() {
    rightDoorTargetY = 15;
}

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

// Listen for keydown events
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        isCameraScreenActive = !isCameraScreenActive;
        cameraScreen.style.opacity = isCameraScreenActive ? '1' : '0';
    }
    if (event.code === 'KeyA') {
        if (leftDoorStatus === 'closed') {
            openLeftDoor();
            leftDoorStatus = 'open';
            console.log("left door open");
        } else if (leftDoorStatus === 'open') {
            closeLeftDoor();
            leftDoorStatus = 'closed';
            console.log("left door closed");
        }
    }
    if (event.code === 'KeyD') {
        if (rightDoorStatus === 'closed') {
            openRightDoor();
            rightDoorStatus = 'open';
            console.log("right door open");
        } else if (rightDoorStatus === 'open') {
            closeRightDoor();
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

    // Smoothly update door positions using linear interpolation.
    const doorSpeed = 0.05; // Adjust this value to change the movement speed

    // Update left door position
    leftDoor.position.y += (leftDoorTargetY - leftDoor.position.y) * doorSpeed;
    
    // Update right door position
    rightDoor.position.y += (rightDoorTargetY - rightDoor.position.y) * doorSpeed;

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
