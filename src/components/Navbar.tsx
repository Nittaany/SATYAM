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
  const navLinks: NavLink[] = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Resume', href: '#resume' },
  ];

  // Animation variants for the navigation menu container
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
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
          className="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-blue-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          YourName
        </motion.a>

        {/* Center: Navigation Menu */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="hidden md:block bg-white/10 backdrop-blur-md rounded-full shadow-lg"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex items-center px-3 py-2 space-x-2">
                {navLinks.map((link) => (
                  <li key={link.name} className="overflow-hidden">
                    <motion.div variants={linkItemVariants}>
                       <a
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className="relative inline-block px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-300 hover:bg-white/50 hover:text-gray-900"
                      >
                        {link.name}
                      </a>
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
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          Get in Touch
        </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;
