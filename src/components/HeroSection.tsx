'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Tech stack data
const techStack = [
  // Programming Languages
  { id: 1, name: 'JavaScript', icon: '/icons/javascript.svg', category: 'language' },
  { id: 2, name: 'Python', icon: '/icons/python.png', category: 'language' },
  { id: 3, name: 'C/C++', icon: '/icons/cpp.svg', category: 'language' },
  { id: 4, name: 'PHP', icon: '/icons/php.svg', category: 'language' },
  { id: 5, name: 'Java', icon: '/icons/java.svg', category: 'language' },

  // Frontend & Frameworks
  { id: 6, name: 'Next.js', icon: '/icons/nextjs.svg', category: 'frontend' },
  { id: 7, name: 'React.js', icon: '/icons/react.svg', category: 'frontend' },
  { id: 8, name: 'HTML', icon: '/icons/html.svg', category: 'frontend' },
  { id: 9, name: 'CSS', icon: '/icons/css.svg', category: 'frontend' },
  { id: 10, name: 'Tailwind', icon: '/icons/tailwind.svg', category: 'frontend' },
  { id: 11, name: 'Bootstrap', icon: '/icons/bootstrap.svg', category: 'frontend' },
  { id: 12, name: 'Firebase', icon: '/icons/firebase.svg', category: 'frontend' },

  // Database
  { id: 13, name: 'MySQL', icon: '/icons/mysql.svg', category: 'database' },
  { id: 14, name: 'Firebase', icon: '/icons/firebase.svg', category: 'database' },

  // Tools & Platforms
  { id: 15, name: 'Git', icon: '/icons/git.svg', category: 'tools' },
  { id: 16, name: 'GitHub', icon: '/icons/github.svg', category: 'tools' },
  { id: 17, name: 'VS Code', icon: '/icons/vscode.svg', category: 'tools' },
  { id: 18, name: 'Postman', icon: '/icons/postman.svg', category: 'tools' },
  { id: 19, name: 'Botpress', icon: '/icons/botpress.svg', category: 'tools' },
  { id: 20, name: 'Netlify', icon: '/icons/netlify.svg', category: 'tools' },
  { id: 21, name: 'Vercel', icon: '/icons/vercel.svg', category: 'tools' },
  { id: 22, name: 'Replit', icon: '/icons/replit.svg', category: 'tools' }
];

// Main HeroSection component
const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();

  const y = useSpring(
    useTransform(scrollY, [0, 300], [0, -50]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111827]">
      {/* Glassmorphic Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-5" />

      {/* Animated Background Blobs */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#7928CA] to-[#FF0080] rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#FF0080] to-[#007CF0] rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          ref={ref}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#7928CA] via-[#FF0080] to-[#007CF0] animate-gradient">
                Satyam
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer • UI/UX Enthusiast • Problem Solver
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Passionate about crafting elegant solutions to complex problems. 
              With a strong foundation in modern web technologies and a keen eye for design,
              I build experiences that make a difference.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="#projects">
                <motion.button
                  className="px-8 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 
                    text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-neon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </Link>
              <a href="/resume.pdf" download>
                <motion.button
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white font-medium 
                    transition-all duration-300 hover:scale-105 hover:shadow-neon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.button>
              </a>
            </motion.div>
          </div>

          {/* Right Content - Profile Image with Code Effect */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-[320px] h-[420px] mx-auto perspective-1000">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#7928CA] to-[#FF0080] rounded-lg blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 backdrop-blur-sm group"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Code line overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwIEwyMCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC4zIiBzdHJva2UtZGFzaGFycmF5PSIyLDQiLz48L3N2Zz4=')] opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                
                <Image
                  src="/images/avatar-1.jpg"
                  alt="Profile"
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-300"
                  priority
                />

                {/* Terminal-like overlay */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Code comment overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <code className="text-xs text-green-400 font-mono">{"// Developer mode: Activated"}</code>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Stack Terminal */}
        <motion.div
          className="mt-12 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative bg-black/30 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <code className="text-xs text-gray-400 font-mono">tech_stack.sh</code>
              <div className="w-16" />
            </div>

            {/* Terminal Content */}
            <div className="relative overflow-hidden w-full">
              {/* Command Line at Top */}
              <div className="px-4 py-2 bg-black/20 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~/skills</span>
                  <span className="text-white/60">git:(</span>
                  <span className="text-purple-400">main</span>
                  <span className="text-white/60">)</span>
                  <span className="text-gray-400">ls --all</span>
                  <motion.span 
                    className="inline-block w-2 h-4 bg-white/80"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Skills Area */}
              <div className="py-6 overflow-hidden">
                <motion.div
                  className="flex gap-5 px-4"
                  animate={{ 
                    x: [0, -2400]  // Adjusted for more items
                  }}
                  transition={{ 
                    duration: 40,  // Slower animation
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...techStack, ...techStack].map((tech, index) => (
                    <div
                      key={`${tech.id}-${index}`}
                      className="flex-shrink-0"
                    >
                      <motion.div
                        className="w-11 h-11 rounded-lg bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-2.5
                          border border-white/10 hover:border-white/30 transition-all duration-300
                          hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.08 }}
                      >
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={24}
                          height={24}
                          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                        />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-black/20 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">{techStack.length} technologies</span>
                  <span className="text-xs font-mono text-gray-400">Use arrow keys to navigate</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

