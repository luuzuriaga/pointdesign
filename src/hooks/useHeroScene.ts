import { useEffect } from 'react';
import * as THREE from 'three';

export function useHeroScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Stars / particles (purple tinted)
    const pGeo = new THREE.BufferGeometry();
    const pCount = 200;
    const pPos = new Float32Array(pCount * 3);
    for(let i=0; i<pCount*3; i++) pPos[i] = (Math.random()-0.5)*30;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({color: 0x5533ff, size: 0.05, transparent: true, opacity: 0.6});
    const pts1 = new THREE.Points(pGeo, pMat);
    scene.add(pts1);

    // Smaller cyan stars
    const pGeo2 = new THREE.BufferGeometry();
    const pPos2 = new Float32Array(80*3);
    for(let i=0; i<80*3; i++) pPos2[i] = (Math.random()-0.5)*25;
    pGeo2.setAttribute('position', new THREE.BufferAttribute(pPos2, 3));
    const pMat2 = new THREE.PointsMaterial({color: 0x40e0d0, size: 0.04, transparent: true, opacity: 0.4});
    const pts2 = new THREE.Points(pGeo2, pMat2);
    scene.add(pts2);

    // Main sphere group
    const group = new THREE.Group();
    // Offset to the right as in original HTML
    group.position.set(4.2, 0, 0);
    scene.add(group);


    // Sphere 1 - giant purple (Dominant)
    const s1Geo = new THREE.SphereGeometry(1.8, 64, 64);
    const s1Mat = new THREE.MeshPhysicalMaterial({
      color: 0x5533ff, 
      transparent: true, 
      opacity: 0.9, 
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x3a15c8,
      emissiveIntensity: 0.85
    });
    const s1 = new THREE.Mesh(s1Geo, s1Mat);
    s1.position.x = -0.5;
    group.add(s1);

    // Sphere 2 - navy (Secondary contrast)
    const s2Geo = new THREE.SphereGeometry(1.6, 64, 64);
    const s2Mat = new THREE.MeshPhysicalMaterial({
      color: 0x202088, // slightly lighter navy so it's not a black hole
      transparent: true, 
      opacity: 0.85, 
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x15155a,
      emissiveIntensity: 0.85
    });
    const s2 = new THREE.Mesh(s2Geo, s2Mat);
    s2.position.x = 0.9;
    s2.position.y = -0.4;
    group.add(s2);

    // Sphere 3 - cyan (Accent)
    const s3Geo = new THREE.SphereGeometry(1.0, 64, 64);
    const s3Mat = new THREE.MeshPhysicalMaterial({
      color: 0x40e0d0, 
      transparent: true, 
      opacity: 0.85, 
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x248a7d,
      emissiveIntensity: 0.85
    });
    const s3 = new THREE.Mesh(s3Geo, s3Mat);
    s3.position.x = 0.3;
    s3.position.y = 1.4;
    group.add(s3);

    // Wireframe ring 1
    const w1Geo = new THREE.TorusGeometry(2.6, 0.015, 8, 80);
    const w1Mat = new THREE.MeshBasicMaterial({color: 0x5533ff, transparent: true, opacity: 0.25});
    const wire1 = new THREE.Mesh(w1Geo, w1Mat);
    wire1.rotation.x = Math.PI/4;
    group.add(wire1);

    // Wireframe ring 2
    const w2Geo = new THREE.TorusGeometry(3.0, 0.01, 8, 80);
    const w2Mat = new THREE.MeshBasicMaterial({color: 0x40e0d0, transparent: true, opacity: 0.12});
    const wire2 = new THREE.Mesh(w2Geo, w2Mat);
    wire2.rotation.x = -Math.PI/3;
    wire2.rotation.z = Math.PI/6;
    group.add(wire2);

    // Floating orbs
    const orbData = [
      { r: 0.22, pos: [-3, 2, -1] as const, c: 0x5533ff, speed: 1.2 },
      { r: 0.16, pos: [-4, -1, 0] as const, c: 0x40e0d0, speed: 0.8 },
      { r: 0.1, pos: [1.5, 2.8, -2] as const, c: 0x7b66ff, speed: 1.5 },
      { r: 0.13, pos: [-2, -2.5, -1] as const, c: 0x40e0d0, speed: 1.0 },
      { r: 0.07, pos: [5, 1.5, 0] as const, c: 0x5533ff, speed: 2.0 },
      { r: 0.09, pos: [-1, 3, 1] as const, c: 0x7b66ff, speed: 1.3 },
    ];
    
    const orbs = orbData.map(d => {
      const g = new THREE.SphereGeometry(d.r, 32, 32);
      const m = new THREE.MeshPhongMaterial({color: d.c, transparent: true, opacity: 0.7, emissive: d.c, emissiveIntensity: 0.3});
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
      mesh.userData = { initY: d.pos[1], speed: d.speed, phase: Math.random() * Math.PI * 2 };
      scene.add(mesh);
      return { mesh, g, m };
    });

    // Lighting — balloon-like brightness (Super bright)
    scene.add(new THREE.AmbientLight(0xffffff, 1.2)); // Maximum ambient light
    const l1 = new THREE.DirectionalLight(0xffffff, 2.5); // Intense direct light
    l1.position.set(5, 8, 5);
    scene.add(l1);
    const l2 = new THREE.PointLight(0x40e0d0, 8, 12);
    l2.position.set(-2, -1, 4);
    scene.add(l2);
    const l3 = new THREE.PointLight(0x5533ff, 10, 14);
    l3.position.set(6, 4, 3);
    scene.add(l3);
    const l4 = new THREE.PointLight(0x7b66ff, 5, 10);
    l4.position.set(0, 5, 2);
    scene.add(l4);

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let t = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      t += 0.01;
      
      group.rotation.y = Math.sin(t * 0.3) * 0.3 + mouseX * 0.2;
      group.rotation.x = Math.sin(t * 0.2) * 0.15 - mouseY * 0.15;
      
      s1.scale.setScalar(1 + Math.sin(t * 1.2) * 0.025);
      s2.scale.setScalar(1 + Math.sin(t * 0.8 + 1) * 0.03);
      s3.scale.setScalar(1 + Math.sin(t * 1.5 + 2) * 0.04);
      
      wire1.rotation.z = t * 0.12;
      wire2.rotation.y = t * 0.08;
      
      orbs.forEach(({ mesh, g, m }) => {
        const ud = mesh.userData;
        mesh.position.y = ud.initY + Math.sin(t * ud.speed + ud.phase) * 0.5;
        mesh.rotation.y = t * 0.5;
      });
      
      camera.position.x = mouseX * 0.3;
      camera.position.y = -mouseY * 0.2;
      camera.lookAt(2.5, 0, 0);

      
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      // Cleanup geometries and materials
      pGeo.dispose(); pMat.dispose();
      pGeo2.dispose(); pMat2.dispose();
      s1Geo.dispose(); s1Mat.dispose();
      s2Geo.dispose(); s2Mat.dispose();
      s3Geo.dispose(); s3Mat.dispose();
      w1Geo.dispose(); w1Mat.dispose();
      w2Geo.dispose(); w2Mat.dispose();
      orbs.forEach(o => {
        o.g.dispose();
        o.m.dispose();
      });
      renderer.dispose();
    };
  }, [canvasRef]);
}
