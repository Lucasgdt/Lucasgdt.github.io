document.addEventListener('DOMContentLoaded', () => {
// Canvas setup
const canvas = document.getElementById('bg-canvas');

// Scene setup
const scene = new THREE.Scene();
// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x191a22, 1);

// exemple
const geometry = new THREE.SphereGeometry(1, 16, 16        );

const material = new THREE.MeshBasicMaterial({ color: 0xa8a8a8, wireframe: true });

const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

// light setup
const light = new THREE.AmbientLight(0xdd9090, 10); // Soft white light
light.position.set(2, 2, 4);
scene.add(light);

camera.position.z = 4;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.0001;
    sphere.rotation.y += 0.0001;
    renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
  console.log("Three.js is running!");
});