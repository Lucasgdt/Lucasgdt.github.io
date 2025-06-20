document.addEventListener('DOMContentLoaded', () => {
  // Récupère le canvas et initialise la scène Three.js
  const canvas = document.getElementById('bg-canvas');
  const scene = new THREE.Scene();

  // Caméra perspective
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  // Renderer WebGL avec fond transparent
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(
    getComputedStyle(document.documentElement).getPropertyValue('--c-bg'),
    1
  );
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Paramètres des cubes
  const cubeCount = 90;
  const boxSize = 2.8;
  const area = 50;
  let cubes = [];

  // Lumières de la scène
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(20, 30, 100);
  scene.add(dirLight);

  // Création des cubes à des positions aléatoires
  for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.55,
      metalness: 0.7,
      transparent: true,
      opacity: gsap.utils.random(0.1, 0.6)
    });
    const cube = new THREE.Mesh(geometry, material);

    // Position initiale aléatoire
    cube.position.x = gsap.utils.random(-area, area);
    cube.position.y = gsap.utils.random(-area, area);
    cube.position.z = gsap.utils.random(-area, area);

    scene.add(cube);
    cubes.push(cube);
  }

  // Animation yoyo infinie pour chaque cube (position, rotation, opacité)
  function floatCubeYoyo(cube) {
    const to = {
      x: gsap.utils.random(-area, area),
      y: gsap.utils.random(-area, area),
      z: gsap.utils.random(-area, area)
    };
    gsap.to(cube.position, {
      ...to,
      duration: gsap.utils.random(5, 10),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
    gsap.to(cube.rotation, {
      x: gsap.utils.random(-2, 2),
      y: gsap.utils.random(-2, 2),
      duration: gsap.utils.random(4, 8),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
    gsap.to(cube.material, {
      opacity: gsap.utils.random(0.1, 0.6),
      duration: gsap.utils.random(6, 12),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }

  // Lance l'animation pour chaque cube
  cubes.forEach(floatCubeYoyo);

  // Animation de rotation lente du nuage de cubes
  gsap.to(scene.rotation, {
    y: "+=6.2831", // 2*PI
    x: "+=6.2831",
    duration: 60,
    ease: "none",
    repeat: -1
  });

  // Ajuste la taille du rendu lors du redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Boucle de rendu
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});
