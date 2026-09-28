'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type MaterialPreset = 'chrome' | 'obsidian' | 'emerald' | 'amber' | 'cyber-rust';
export type LightingPreset = 'studio' | 'neon' | 'space';

export type Scene3DProps = {
  materialPreset?: MaterialPreset;
  lightingPreset?: LightingPreset;
  wireframe?: boolean;
  autoRotateSpeed?: number;
  showParticles?: boolean;
  explodedView?: boolean;
  reducedMotion?: boolean;
  onFpsUpdate?: (fps: number) => void;
};

const MATERIAL_MAP: Record<MaterialPreset, { color: number; metalness: number; roughness: number; emissive?: number }> = {
  chrome: { color: 0xe0e0e0, metalness: 0.95, roughness: 0.1 },
  obsidian: { color: 0x1a1a24, metalness: 0.8, roughness: 0.2, emissive: 0x050510 },
  emerald: { color: 0x00b894, metalness: 0.6, roughness: 0.15, emissive: 0x00241b },
  amber: { color: 0xb84d28, metalness: 0.85, roughness: 0.25, emissive: 0x3d1004 },
  'cyber-rust': { color: 0xc8b18b, metalness: 0.5, roughness: 0.6 }
};

export function Scene3D({
  materialPreset = 'chrome',
  lightingPreset = 'studio',
  wireframe = false,
  autoRotateSpeed = 1.0,
  showParticles = true,
  explodedView = false,
  reducedMotion = false,
  onFpsUpdate
}: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [fps, setFps] = useState(60);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainMeshGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const subMeshesRef = useRef<{ mesh: THREE.Mesh; defaultPos: THREE.Vector3; targetPos: THREE.Vector3 }[]>([]);

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 3. Renderer with power preference & pixel ratio cap for mobile perf
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);
    } catch {
      setIsReady(false);
      return;
    }

    // 4. Lights Group
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    lightsGroup.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    lightsGroup.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x769ecb, 1.2);
    fillLight.position.set(-5, -3, -4);
    lightsGroup.add(fillLight);

    const rimLight = new THREE.PointLight(0xb84d28, 3, 12);
    rimLight.position.set(0, 4, -4);
    lightsGroup.add(rimLight);

    // 5. Build Procedural AI Core 3D Geometry
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainMeshGroupRef.current = mainGroup;

    const materials: THREE.MeshStandardMaterial[] = [];
    materialsRef.current = materials;
    const subMeshes: { mesh: THREE.Mesh; defaultPos: THREE.Vector3; targetPos: THREE.Vector3 }[] = [];
    subMeshesRef.current = subMeshes;

    // Outer Core Ring
    const outerGeo = new THREE.TorusGeometry(2.2, 0.22, 32, 100);
    const outerMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_MAP[materialPreset].color,
      metalness: MATERIAL_MAP[materialPreset].metalness,
      roughness: MATERIAL_MAP[materialPreset].roughness,
      wireframe
    });
    materials.push(outerMat);
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.castShadow = true;
    mainGroup.add(outerMesh);
    subMeshes.push({
      mesh: outerMesh,
      defaultPos: new THREE.Vector3(0, 0, 0),
      targetPos: new THREE.Vector3(0, 0, 1.4)
    });

    // Inner Core Icosahedron Node
    const innerGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_MAP[materialPreset].color,
      metalness: MATERIAL_MAP[materialPreset].metalness,
      roughness: MATERIAL_MAP[materialPreset].roughness,
      wireframe
    });
    materials.push(innerMat);
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.castShadow = true;
    mainGroup.add(innerMesh);
    subMeshes.push({
      mesh: innerMesh,
      defaultPos: new THREE.Vector3(0, 0, 0),
      targetPos: new THREE.Vector3(0, 0, -1.4)
    });

    // Orbital Satellites
    const satCount = 4;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const satGeo = new THREE.OctahedronGeometry(0.38, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: MATERIAL_MAP[materialPreset].color,
        metalness: 0.9,
        roughness: 0.1,
        wireframe
      });
      materials.push(satMat);
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const defaultPos = new THREE.Vector3(Math.cos(angle) * 3.2, Math.sin(angle) * 3.2, 0);
      const targetPos = new THREE.Vector3(Math.cos(angle) * 5.0, Math.sin(angle) * 5.0, Math.sin(angle) * 2.0);
      satMesh.position.copy(defaultPos);
      satMesh.castShadow = true;
      mainGroup.add(satMesh);
      subMeshes.push({ mesh: satMesh, defaultPos, targetPos });
    }

    // 6. Particle Field
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 18;
      particlePositions[i + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i + 2] = (Math.random() - 0.5) * 18;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc8b18b,
      size: 0.08,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // 7. Interactive Controls: Mouse & Touch Pointer Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let mouseNorm = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging && mainMeshGroupRef.current) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        mainMeshGroupRef.current.rotation.y += deltaX * 0.01;
        mainMeshGroupRef.current.rotation.x += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render & Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS tracking
      frameCount++;
      if (currentTime > lastTime + 1000) {
        const measuredFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(measuredFps);
        onFpsUpdate?.(measuredFps);
        frameCount = 0;
        lastTime = currentTime;
      }

      if (mainMeshGroupRef.current && !reducedMotion) {
        // Auto Rotation
        if (!isDragging) {
          mainMeshGroupRef.current.rotation.y += 0.008 * autoRotateSpeed;
          mainMeshGroupRef.current.rotation.x += 0.002 * autoRotateSpeed;
        }

        // Mouse Parallax Follow
        camera.position.x += (mouseNorm.x * 0.8 - camera.position.x) * 0.05;
        camera.position.y += (mouseNorm.y * 0.8 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Submesh Exploded Position Interpolation
        subMeshesRef.current.forEach(({ mesh, defaultPos, targetPos }) => {
          const dest = explodedView ? targetPos : defaultPos;
          mesh.position.lerp(dest, 0.08);
          mesh.rotation.y += 0.01;
        });

        // Rotate particle cloud
        if (particleSystemRef.current) {
          particleSystemRef.current.rotation.y += 0.0008;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);
    setIsReady(true);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries and Materials
      outerGeo.dispose();
      innerGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      materials.forEach(mat => mat.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Synchronize Materials when preset / wireframe changes
  useEffect(() => {
    const config = MATERIAL_MAP[materialPreset];
    materialsRef.current.forEach(mat => {
      mat.color.setHex(config.color);
      mat.metalness = config.metalness;
      mat.roughness = config.roughness;
      mat.wireframe = wireframe;
      if (config.emissive !== undefined) {
        mat.emissive.setHex(config.emissive);
      }
      mat.needsUpdate = true;
    });
  }, [materialPreset, wireframe]);

  // Synchronize Particle visibility
  useEffect(() => {
    if (particleSystemRef.current) {
      particleSystemRef.current.visible = showParticles;
    }
  }, [showParticles]);

  return (
    <div className="scene-3d-wrapper" style={{ position: 'relative', width: '100%', height: '100%', minHeight: 420 }}>
      {!isReady && (
        <div className="scene-loading-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(29, 23, 18, 0.04)', borderRadius: 24 }}>
          <p className="muted">Initializing 3D WebGL Canvas...</p>
        </div>
      )}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 420,
          cursor: 'grab',
          touchAction: 'none',
          borderRadius: 24,
          overflow: 'hidden'
        }}
        aria-label="Interactive 3D AI Core Model. Drag to rotate."
        role="img"
      />
    </div>
  );
}
