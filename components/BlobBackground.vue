<!-- components/BlobBackground.vue -->
<template>
  <div ref="container" class="blob-container">
    <div class="blob-wrapper">
      <canvas ref="canvas" class="blob-canvas" />
    </div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { onBeforeUnmount, onMounted, ref } from "vue";

const container = ref(null);
const canvas = ref(null);
let renderer,
  scene,
  camera,
  blob,
  frameId,
  mousePosition = { x: 0, y: 0 };

const config = {
  segments: 128, // Réduit pour plus de douceur
  amplitude: 0.4, // Amplitude réduite pour des mouvements plus subtils
  frequency: 0.5, // Fréquence réduite pour des variations plus douces
  speed: 0.5, // Vitesse considérablement réduite
  scale: 2.5, // Échelle de base du blob
  color1: new THREE.Color(0x6100ff), // Violet
  color2: new THREE.Color(0x0075ff), // Bleu
};

const init = () => {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Création d'une géométrie plus douce
  const geometry = new THREE.IcosahedronGeometry(config.scale, 4);

  // Utilisation d'un shader personnalisé pour un effet plus doux
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: config.color1 },
      uColor2: { value: config.color2 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      
      varying vec3 vNormal;
      varying float vDistortion;
      
      float noise(vec3 p) {
        return sin(p.x * 0.5) * sin(p.y * 0.5) * sin(p.z * 0.5);
      }
      
      void main() {
        float time = uTime * ${config.speed};
        vec3 pos = position;
        
        // Calcul de la distortion
        float distortion = noise(pos * ${config.frequency} + time) * ${config.amplitude};
        pos += normal * distortion;
        
        // Influence très subtile de la souris
        float mouseEffect = length(uMouse - pos.xy) * 0.05;
        pos += normal * mouseEffect;
        
        vNormal = normal;
        vDistortion = distortion;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      
      varying vec3 vNormal;
      varying float vDistortion;
      
      void main() {
        vec3 color = mix(uColor1, uColor2, vDistortion * 2.0 + 0.5);
        float alpha = 0.8 - abs(vDistortion) * 0.5;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  blob = new THREE.Mesh(geometry, material);
  scene.add(blob);

  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);

  animate();
};

const animate = () => {
  frameId = requestAnimationFrame(animate);

  if (blob && blob.material.uniforms) {
    blob.material.uniforms.uTime.value = performance.now() * 0.001;
    blob.rotation.y += 0.001; // Rotation très lente
  }

  renderer.render(scene, camera);
};

const handleResize = () => {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

const handleMouseMove = (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (blob && blob.material.uniforms) {
    blob.material.uniforms.uMouse.value.set(x * 0.1, y * 0.1);
  }
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", handleMouseMove);
  renderer?.dispose();
});
</script>

<style>
.blob-container {
  position: fixed;
  bottom: -15%; /* Remonté de -30% à -15% */
  left: -35%; /* Décalé encore plus à gauche de -20% à -35% */
  width: 120%;
  height: 80%;
  z-index: -1;
  overflow: hidden;
}

.blob-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  filter: blur(50px);
  transform: scale(0.8);
}

.blob-canvas {
  width: 100%;
  height: 100%;
}

@media (max-width: 767px) {
  .blob-container {
    bottom: -20%;
    left: -50%; /* Décalé plus à gauche sur mobile */
    width: 150%; /* Plus large pour éviter les bords */
    height: 100%;
  }
}
</style>