'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Define the structure for a navigation link
interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  // State to control the visibility of the navbar animation
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger the animation once the component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Array of navigation links
const navLinks = [
  { name: 'About', href: '#aboutme', type: 'scroll' },
  { name: 'Projects', href: '#projects', type: 'scroll' },
  { name: 'Skills', href: '#skills', type: 'scroll' },
  { name: 'Resume', href: 'https://drive.google.com/file/d/1mgVZBLUCuAtVY_QhzuJLOWosUOJqUE1V/view?usp=sharing', type: 'external' },
];


  // Animation variants for the navigation menu container
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  // Animation variants for individual navigation link items
  const linkItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Function to handle smooth scrolling to a section
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };


  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-4 py-3 sm:px-8 md:px-12">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {/* Left Side: Logo/Name */}
        <motion.a
          href="/"
          className="text-2xl font-bold text-gray-600 transition-colors duration-300 hover:text-purple-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          SATYAM
        </motion.a>

        {/* Center: Navigation Menu */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="hidden md:block bg-purple-600/15 backdrop-blur-md rounded-full shadow-lg"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex items-center px-3 py-2 space-x-2">
                {navLinks.map((link) => (
                  <li key={link.name} className="overflow-hidden">
                    <motion.div variants={linkItemVariants}>
                       {link.type === "external" ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-block px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-300 hover:bg-pink-300/50 hover:text-gray-300"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <a
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="relative inline-block px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-300 hover:bg-pink-300/50 hover:text-gray-300"
                          >
                            {link.name}
                          </a>
                        )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Get in Touch Button */}
        <motion.a
  href="#contact"
  onClick={(e) => handleScroll(e, '#contact')}
  className="relative inline-block px-6 py-3 text-sm font-semibold 
             text-white rounded-xl overflow-hidden 
             bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-cyan-400/20
             transition-transform duration-300 hover:scale-105 
             hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: .95, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeInOut' }}
>
  {/* Glowing Border Overlay */}
  <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r 
                   from-fuchsia-500/50 via-cyan-400/50 to-violet-600/50 animate-pulse opacity-70">
    <span className="block h-full w-full rounded-xl bg-transparent"></span>
  </span>

  {/* Text with shimmer */}
  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 
                   bg-clip-text text-transparent font-bold 
                   animate-[shimmer_3s_infinite]">
    ⚡ Get in Touch
  </span>
</motion.a>

      </div>
    </nav>
  );
};

export default Navbar;
