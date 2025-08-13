'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import * as THREE from 'three';

const AboutMe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mountRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Glowing Icosahedron
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4a90e2,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // Add a point light to create a neon glow effect
    const pointLight = new THREE.PointLight(0xa84fe4, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the Icosahedron
      icosahedron.rotation.x += 0.005;
      icosahedron.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isMounted]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1], // Corrected ease type
      },
    },
  };

  return (
    <section id="about" className="relative w-full py-20 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Three.js 3D Background */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-20"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-8 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center justify-center bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-electric-blue/50 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Photo Section */}
          <motion.div
            className="relative w-full h-80 md:h-96 transform rotate-3 hover:rotate-0 transition-transform duration-500"
            variants={itemVariants}
          >
            <Image
              src="/images/protfolio.jpg"
              alt="Your Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl shadow-xl"
            />
            {/* Neon border glow */}
            <div className="absolute inset-0 rounded-3xl ring-4 ring-neon-purple/50 animate-pulse"></div>
          </motion.div>

          {/* Text Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-pink">
              About Me
            </h2>
            <p className="text-md text-gray-300 font-poppins mb-4">
              I am a passionate Computer Science and Engineering student with a deep interest in web development and software architecture. I love solving complex problems and building elegant, efficient, and user-friendly applications.
            </p>
            <p className="text-md text-gray-300 font-poppins mb-4">
              My academic journey has provided me with a strong foundation in data structures, algorithms, and system design. Outside of my studies, I am constantly exploring new technologies and contributing to open-source projects.
            </p>
            <p className="text-md text-gray-300 font-poppins">
              In my free time, you can find me hiking, experimenting with IoT devices, or diving into the latest sci-fi novels.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
