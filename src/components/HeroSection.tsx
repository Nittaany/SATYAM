'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Placeholder data for the randomly floating avatar images
const randomAvatars = [
  { id: 1, src: '/images/avatar-1.jpg', alt: 'Avatar 1' },
  { id: 2, src: '/images/avatar-1.jpg', alt: 'Avatar 2' },
  { id: 3, src: '/images/avatar-1.jpg', alt: 'Avatar 3' },
  { id: 4, src: '/images/avatar-1.jpg', alt: 'Avatar 4' },
];

// Placeholder data for the carousel images
const carouselImages = [
  { id: 1, src: '/images/avatar-1.jpg', alt: 'Project 1' },
  { id: 2, src: '/images/avatar-1.jpg', alt: 'Project 2' },
  { id: 3, src: '/images/avatar-1.jpg', alt: 'Project 3' },
];

// Main HeroSection component
const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Auto-advance the carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden text-white">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/avatar-1.jpg" // Use the user's uploaded image
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="blur-sm scale-110 opacity-30"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Randomly Floating Avatars with Animations */}
      {randomAvatars.map((avatar) => (
        <motion.div
          key={avatar.id}
          className="absolute z-10 rounded-full overflow-hidden"
          style={{
            top: `${Math.random() * 80 + 10}vh`,
            left: `${Math.random() * 80 + 10}vw`,
            width: `${Math.random() * 50 + 30}px`,
            height: `${Math.random() * 50 + 30}px`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0.5, 1],
            scale: [0.5, 1, 0.8, 1.2, 1],
            rotate: [0, 45],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          whileHover={{ scale: 1.5, rotate: 360 }}
        >
          <Image src={avatar.src} alt={avatar.alt} layout="fill" objectFit="cover" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat tracking-tight mb-4 animate-text-glow">
          Your Name
        </h1>
        <p className="text-lg md:text-xl font-poppins text-white/80">
          Passionate CSE student building solutions and learning continuously
        </p>
      </motion.div>

      {/* Carousel at the bottom */}
      <motion.div
        className="relative z-20 w-full max-w-2xl mt-16 md:mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={carouselImages[currentImageIndex].src}
                alt={carouselImages[currentImageIndex].alt}
                layout="fill"
                objectFit="cover"
                quality={85}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

