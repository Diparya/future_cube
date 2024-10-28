'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRouter } from 'next/navigation';

const Cube = () => {
  const mountRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(window.innerWidth < 768 ? 35 : 25, aspectRatio, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Function to create a texture with text overlay
    const createFaceTexture = (imagePath, text) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');

      // Load the image, draw it on canvas, and add text once loaded
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          context.font = 'bold 40px Arial';
          context.fillStyle = 'white';
          context.strokeStyle = 'black';
          context.lineWidth = 6;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.strokeText(text, canvas.width / 2, canvas.height / 2);
          context.fillText(text, canvas.width / 2, canvas.height / 2);
          resolve(new THREE.CanvasTexture(canvas));
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${imagePath}`);
          resolve(null); // Return null if the image fails to load
        };
      });
    };

    const loadTextures = async () => {
      const faceData = [
        { image: 'images/food_system.jpg', text: 'Food System' },
        { image: 'images/water_supplies.jpg', text: 'Water Supplies' },
        { image: 'images/farm_work.jpg', text: 'Farm Work' },
        { image: 'images/air_purifier.jpg', text: 'Air Purifier' },
        { image: 'images/waste_resources.jpg', text: 'Waste Management' },
        { image: 'images/earth.jpg', text: 'Our Planet' }
      ];

      // Wait for all textures to be created
      const textures = await Promise.all(faceData.map(data => createFaceTexture(data.image, data.text)));

      // Filter out any null textures (if an image failed to load)
      return textures.filter(texture => texture);
    };

    loadTextures().then((textures) => {
      if (textures.length === 0) return;

      const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
      const geometry = new THREE.BoxGeometry();
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      // Set up click interaction
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const handleInteraction = (x, y) => {
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(cube);
        if (intersects.length > 0) {
          const faceIndex = intersects[0].face.materialIndex;
          router.push(`/video?face=${faceIndex}`);
        }
      };

      const onMouseDown = (event) => handleInteraction(event.clientX, event.clientY);
      const onTouchStart = (event) => {
        if (event.touches.length === 1) handleInteraction(event.touches[0].clientX, event.touches[0].clientY);
      };

      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('touchstart', onTouchStart);

      // Set up OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('resize', onWindowResize);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('touchstart', onTouchStart);
        if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
        controls.dispose();
      };
    });
  }, [router]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Cube;
