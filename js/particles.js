/* ==========================================================================
   SAGAR GUPTA PORTFOLIO - THREE.JS 3D WEBGL BACKGROUND ENGINE
   Features: 2500+ Star Particles, Floating Cyberpunk Wireframe, Mouse Parallax
   ========================================================================== */

(function () {
  'use strict';

  let scene, camera, renderer;
  let particlesMesh, wireframeMesh, secondaryMesh;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function initThreeJS() {
    const canvas = document.getElementById('bg');
    if (!canvas) return;

    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 400;

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Create Star Particles (2500+)
    const particleCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#4F8CFF'), // Primary
      new THREE.Color('#8B5CF6'), // Secondary
      new THREE.Color('#00F5FF'), // Accent
      new THREE.Color('#FFFFFF')  // Star white
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture Generation
    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 2.5,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // 5. Create Floating 3D Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(110, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x4F8CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    wireframeMesh = new THREE.Mesh(icoGeo, icoMat);
    wireframeMesh.position.set(180, 20, -100);
    scene.add(wireframeMesh);

    // 6. Secondary Inner Glowing Geometry
    const innerGeo = new THREE.TorusKnotGeometry(45, 12, 100, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    secondaryMesh = new THREE.Mesh(innerGeo, innerMat);
    secondaryMesh.position.set(180, 20, -100);
    scene.add(secondaryMesh);

    // 7. Event Listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // 8. Start Animation Loop
    animate();
  }

  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.15;
    mouseY = (event.clientY - windowHalfY) * 0.15;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    // Smooth Lerp Camera Parallax
    targetX += (mouseX - targetX) * 0.05;
    targetY += (-mouseY - targetY) * 0.05;

    camera.position.x = targetX * 0.8;
    camera.position.y = targetY * 0.8;
    camera.lookAt(scene.position);

    // Rotate Meshes
    if (particlesMesh) {
      particlesMesh.rotation.y += 0.0006;
      particlesMesh.rotation.x += 0.0003;
    }

    if (wireframeMesh) {
      wireframeMesh.rotation.x += 0.003;
      wireframeMesh.rotation.y += 0.004;
    }

    if (secondaryMesh) {
      secondaryMesh.rotation.x -= 0.004;
      secondaryMesh.rotation.y -= 0.003;
    }

    renderer.render(scene, camera);
  }

  // Initialize when DOM content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
  } else {
    initThreeJS();
  }
})();
