'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import * as THREE from 'three';
import { Code, Coffee, Book, Music, Camera, Gamepad } from 'lucide-react';

// Types
interface ThreeSymbol {
  mesh: THREE.Object3D;
  rotationSpeed: number;
  floatSpeed: number;
  initialY: number;
}

interface CodeBlock {
  language: string;
  description: string;
  code: string;
}

interface Interest {
  icon: React.ReactNode;
  label: string;
  color: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Constants and Data
const interests: Interest[] = [
  { icon: <Code className="w-6 h-6" />, label: 'Coding', color: 'text-blue-400' },
  { icon: <Coffee className="w-6 h-6" />, label: 'Coffee', color: 'text-amber-400' },
  { icon: <Book className="w-6 h-6" />, label: 'Learning', color: 'text-green-400' },
  { icon: <Music className="w-6 h-6" />, label: 'Music', color: 'text-purple-400' },
  { icon: <Camera className="w-6 h-6" />, label: 'Photography', color: 'text-pink-400' },
  { icon: <Gamepad className="w-6 h-6" />, label: 'Gaming', color: 'text-red-400' }
];

const codeBlocksData: CodeBlock[] = [
  {
    language: 'TypeScript',
    description: 'Main Function',
    code: `function developAwesomeStuff() {
  const skills = ['TypeScript', 'React', 'Node.js'];
  const coffee = new Coffee('Espresso');
  
  while (coffee.isNotEmpty()) {
    skills.forEach(skill => improve(skill));
    coffee.sip();
  }
  
  return Innovation.create();
}`
  },
  {
    language: 'Python',
    description: 'Data Science',
    code: `def analyze_data():
    import pandas as pd
    import numpy as np
    
    data = pd.read_csv('life_goals.csv')
    insights = np.array([
        'Always learning',
        'Building cool stuff',
        'Solving problems'
    ])
    
    return insights.reshape(-1, 1)`
  }
];

// Image carousel data
const carouselImages = [
  '/images/avatar-1.jpg',
  '/images/avatar-2.jpg',
  '/images/avatar-3.jpg',
  '/images/avatar-4.jpg',
  // Add more image paths as needed
];

const AboutMe = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCodeBlock, setActiveCodeBlock] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
      }
    }, isHovered ? 1600 : 1000); // 1.25x speed when not hovered, 1x when hovered

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!isMounted || !mountRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const currentMount = mountRef.current;
    
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Create programming symbol geometries
    const symbols: ThreeSymbol[] = [];
    
    // Create positions in a more spread out pattern
    const positions = [
      { x: -12, y: 8, z: -6 },
      { x: 12, y: -6, z: -4 },
      { x: -8, y: -10, z: -5 },
      { x: 8, y: 10, z: -7 },
      { x: 0, y: 0, z: -8 }
    ];

    // Helper function to create a mesh with material
    const createMesh = (geometry: THREE.BufferGeometry, color: number) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create and add symbols
    const addSymbol = (pos: typeof positions[0], geometry: THREE.BufferGeometry, color: number) => {
      const mesh = createMesh(geometry, color);
      mesh.position.set(pos.x, pos.y, pos.z);
      symbols.push({
        mesh,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: (Math.random() - 0.5) * 0.01,
        initialY: pos.y,
      });
      scene.add(mesh);
    };

    // Add curly braces {}
    addSymbol(positions[0], new THREE.TorusGeometry(0.8, 0.2, 16, 32, Math.PI), 0x6366f1);

    // Add square brackets []
    addSymbol(positions[1], new THREE.BoxGeometry(1.5, 0.2, 0.2), 0x4ade80);

    // Add arrow ->
    addSymbol(positions[2], new THREE.ConeGeometry(0.4, 1, 32), 0xf472b6);

    // Add equals ==
    addSymbol(positions[3], new THREE.BoxGeometry(1.2, 0.2, 0.2), 0xfbbf24);

    // Add special symbol (hash #)
    const hashGroup = new THREE.Group();
    const verticalBar = createMesh(new THREE.BoxGeometry(0.15, 1, 0.15), 0x6366f1);
    const horizontalBar = createMesh(new THREE.BoxGeometry(1, 0.15, 0.15), 0x6366f1);
    hashGroup.add(verticalBar);
    hashGroup.add(horizontalBar);
    hashGroup.position.set(positions[4].x, positions[4].y, positions[4].z);
    scene.add(hashGroup);
    symbols.push({
      mesh: hashGroup,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      floatSpeed: (Math.random() - 0.5) * 0.01,
      initialY: positions[4].y,
    });

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      symbols.forEach(symbol => {
        symbol.mesh.rotation.x += symbol.rotationSpeed;
        symbol.mesh.rotation.y += symbol.rotationSpeed;
        symbol.mesh.position.y = symbol.initialY + Math.sin(Date.now() * symbol.floatSpeed) * 2;
      });
      
      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    const handleResize = () => {
      if (currentMount) {
        const { clientWidth, clientHeight } = currentMount;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      }
    };

    // Add smoother rotation based on mouse position
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      symbols.forEach(symbol => {
        symbol.mesh.rotation.x += y * 0.01;
        symbol.mesh.rotation.y += x * 0.01;
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      symbols.forEach(symbol => {
        if (symbol.mesh instanceof THREE.Mesh) {
          symbol.mesh.geometry.dispose();
          if (symbol.mesh.material instanceof THREE.Material) {
            symbol.mesh.material.dispose();
          } else if (Array.isArray(symbol.mesh.material)) {
            symbol.mesh.material.forEach(m => m.dispose());
          }
        } else if (symbol.mesh instanceof THREE.Group) {
          symbol.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (child.material instanceof THREE.Material) {
                child.material.dispose();
              } else if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose());
              }
            }
          });
        }
        scene.remove(symbol.mesh);
      });
      renderer.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [isMounted]);

  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111827]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-5" />

      {/* Three.js Background */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Coder-style heading */}
        <motion.div
          variants={itemVariants}
          className="mb-12 text-center"
        >
          <div className="inline-block bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
            <div className="flex items-center justify-center space-x-2 text-gray-400 font-mono text-sm mb-2">
              <span className="text-purple-400">&lt;</span>
              <span className="text-green-400">about</span>
              <span className="text-purple-400">&gt;</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              ./whoami
            </h2>
            <div className="flex items-center justify-center space-x-2 text-gray-400 font-mono text-sm mt-2">
              <span className="text-purple-400">&lt;/</span>
              <span className="text-green-400">about</span>
              <span className="text-purple-400">&gt;</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Code Editor */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Code Editor */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  {codeBlocksData.map((block, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 rounded-md text-sm ${
                        activeCodeBlock === index
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveCodeBlock(index)}
                    >
                      {block.language}
                    </button>
                  ))}
                </div>
                <span className="text-sm text-gray-400">{codeBlocksData[activeCodeBlock].description}</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <pre className="text-blue-400 whitespace-pre">{codeBlocksData[activeCodeBlock].code}</pre>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Profile and Interests */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative group">
              <motion.div
                className="relative w-full h-96 transform rotate-2 group-hover:rotate-0 transition-transform duration-500"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  {/* Carousel */}
                  <div 
                    className="flex transition-transform duration-1000 ease-out h-full"
                    style={{ 
                      transform: `translateX(-${currentImageIndex * 100}%)`,
                      width: `${carouselImages.length * 100}%`
                    }}
                  >
                    {carouselImages.map((src, index) => (
                      <div
                        key={index}
                        className="relative w-full h-full flex-shrink-0"
                      >
                        <Image
                          src={src}
                          alt={`Profile ${index + 1}`}
                          fill
                          className="object-cover"
                          quality={95}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  {isHovered && (
                    <>
                      <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                      >
                        ←
                      </button>
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)}
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNvZGUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAyMCAyMCBNIDIwIDAgTCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIG9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjY29kZSkiLz48L3N2Zz4=')] opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
                </div>
              </motion.div>
            </div>

            {/* Interests Grid */}
            <div className="grid grid-cols-3 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  variants={itemVariants}
                >
                  <div className={`${interest.color} mb-2`}>{interest.icon}</div>
                  <span className="text-sm text-gray-400">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
