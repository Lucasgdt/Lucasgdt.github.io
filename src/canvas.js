export function canvas(benchmarkfps = 60) {
  const canvas = document.getElementById('bg-canvas');
  canvas.style.opacity = 0;
  const scene = new THREE.Scene();

  const quality = benchmarkfps >= 80 ? 'high' :
                  benchmarkfps >= 50 ? 'medium' : 'low';

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(
    getComputedStyle(document.documentElement).getPropertyValue('--c-bg'),
    1
  );
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Params
  let cubeCount;
  switch (quality) {
    case 'high': cubeCount = 120; break;
    case 'medium': cubeCount = 70; break;
    case 'low': cubeCount = 35; break;
  }
  const boxSize = 2.8;
  const area = 50;
  let cubes = [];

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(20, 30, 100);
  scene.add(dirLight);

  // Create cubes at random positions
  for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.55,
      metalness: 0.7,
      transparent: true,
      opacity: gsap.utils.random(0.4, 1)
    });
    const cube = new THREE.Mesh(geometry, material);

    // Position de départ aléatoire
    cube.position.x = gsap.utils.random(-area, area);
    cube.position.y = gsap.utils.random(-area, area);
    cube.position.z = gsap.utils.random(-area, area);

    scene.add(cube);
    cubes.push(cube);
  }

  gsap.to("#bg-canvas", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out",
  delay: 0
  });

  // Fonction d'animation yoyo infini
  function floatCubeYoyo(cube) {
    // Définir une destination aléatoire
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
      repeat: -1 // Yoyo infini !
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
      opacity: gsap.utils.random(0.3, 0.6),
      duration: gsap.utils.random(6, 12),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }

  // Lance l'animation pour chaque cube
  cubes.forEach(floatCubeYoyo);

  // Optionnel : rotation lente du nuage
  gsap.to(scene.rotation, {
    y: "+=6.2831", // 2*PI
    x: "+=6.2831", // 2*PI
    duration: 65,
    ease: "none",
    repeat: -1
  });

  // Responsive
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });


  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
};
