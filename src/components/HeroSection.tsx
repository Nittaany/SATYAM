'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { SiJavascript, SiPython, SiCplusplus, SiPhp,  
         SiReact, SiHtml5, SiCss3, SiTailwindcss, 
         SiBootstrap, SiMysql, SiGit, SiGithub, 
         SiPostman, SiNetlify, SiVercel, SiReplit } from 'react-icons/si';
import { BiLogoFirebase, BiLogoJava } from 'react-icons/bi';
import { TbBrandNextjs, TbBrandVscode } from 'react-icons/tb';
import type { IconType } from 'react-icons';
import {AnimatePresence } from "framer-motion";
import {useState  } from "react";

interface Tech {
  id: number;
  name: string;
  icon: IconType;
  category: string;
}

// Tech stack data with React Icons
const techStack: Tech[] = [
  // Programming Languages
  { id: 1, name: 'JavaScript', icon: SiJavascript, category: 'language' },
  { id: 2, name: 'Python', icon: SiPython, category: 'language' },
  { id: 3, name: 'C/C++', icon: SiCplusplus, category: 'language' },
  { id: 4, name: 'PHP', icon: SiPhp, category: 'language' },
  { id: 5, name: 'Java', icon: BiLogoJava, category: 'language' },

  // Frontend & Frameworks
  { id: 6, name: 'Next.js', icon: TbBrandNextjs, category: 'frontend' },
  { id: 7, name: 'React.js', icon: SiReact, category: 'frontend' },
  { id: 8, name: 'HTML', icon: SiHtml5, category: 'frontend' },
  { id: 9, name: 'CSS', icon: SiCss3, category: 'frontend' },
  { id: 10, name: 'Tailwind', icon: SiTailwindcss, category: 'frontend' },
  { id: 11, name: 'Bootstrap', icon: SiBootstrap, category: 'frontend' },
  { id: 12, name: 'Firebase', icon: BiLogoFirebase, category: 'frontend' },

  // Database
  { id: 13, name: 'MySQL', icon: SiMysql, category: 'database' },
  { id: 14, name: 'Firebase', icon: BiLogoFirebase, category: 'database' },

  // Tools & Platforms
  { id: 15, name: 'Git', icon: SiGit, category: 'tools' },
  { id: 16, name: 'GitHub', icon: SiGithub, category: 'tools' },
  { id: 17, name: 'VS Code', icon: TbBrandVscode, category: 'tools' },
  { id: 18, name: 'Postman', icon: SiPostman, category: 'tools' },
  { id: 19, name: 'Botpress', icon: TbBrandNextjs, category: 'tools' },
  { id: 20, name: 'Netlify', icon: SiNetlify, category: 'tools' },
  { id: 21, name: 'Vercel', icon: SiVercel, category: 'tools' },
  { id: 22, name: 'Replit', icon: SiReplit, category: 'tools' }
];

const wittyComments = [
  "// TODO: Fix bugs. Create bugs. Fix them again.",
  "/* When I'm not coding, I'm thinking about Code */",
  "// Ctrl + S is my panic button.",
  "/* Hire me before AI replaces me 😅 */",
  "// Console.log is my therapist.",
  "/* JavaScript is my love language */",
  "// Writing logic that Google can't autocomplete",
  "/* Minimal code. Maximum impact. */",
  "// Debugging: Where the fun begins",
  "/* Eat, Sleep, Code, Repeat */",
  "// My code never has bugs. It just develops random features.",
  "/* Keep calm and code on */",
  "// I write code. What's your superpower?",
  "/* Code is poetry in motion */",
  "// In a relationship with my IDE",
  "/* Just one more feature... and one more... and one more... */",
  "// I speak fluent code and sarcasm",
  "/* Code is my canvas, creativity is my brush */",
  "// I build things that make the internet awesome",
  "// My code is so clean, you could eat off it",
  "/* Coding is my therapy, and the keyboard is my couch */",
  "// I write code that even my mom can understand",
  "/* Code is my playground, and bugs are just part of the fun */",
  "// My code is like a fine wine, it gets better with age",
  "// Code is my love language, and I'm fluent in it",
  "/* Coding is not just a job, it's a lifestyle */",
  "// I write code that makes computers do cool stuff",
  "// My code is so efficient, it could run on a potato",
  "// My code is so good, it should come with a warning label",
  "// Probably debugging while you read this",
  "/* Half developer, half illusionist */",
  "// My variables have trust issues",
  "// Breaking things beautifully"
];


const ScrollingTechStack: React.FC = () => {
  return (
    <div className="py-6 overflow-hidden">
      <motion.div
        className="flex gap-6 px-4"
        animate={{ x: [-1800, 0] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0
        }}
        style={{
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased"
        }}
      >
        {[...techStack, ...techStack, ...techStack].map((tech, index) => (
          <motion.div
            key={`${tech.id}-${index}`}
            className="flex-shrink-0"
            style={{
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "subpixel-antialiased"
            }}
          >
            <motion.div
              className="w-11 h-11 rounded-lg bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm
                border border-white/10 hover:border-white/30 transition-all duration-300
                hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
            >
              {React.createElement(tech.icon, {
                className: "w-6 h-6 text-white/60 hover:text-white/100 transition-all duration-300"
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Main HeroSection component
const TypewriterComponent: React.FC = () => {
  const [text] = useTypewriter({
    words: [
      'Full Stack Developer',
      'Code Architect',
      'Bug Exterminator',
      'Pixel Perfectionist',
      'Coffee → Code Converter',
      '404 Error Handler',
      'Digital Dreamweaver'
    ],
    loop: true,
    delaySpeed: 2000,
    deleteSpeed: 50,
    typeSpeed: 70
  });

  return (
    <span>
      {text}
      <Cursor cursorStyle='_' />
    </span>
  );
};

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const controls = useAnimation();

  const y = useSpring(
    useTransform(scrollY, [0, 300], [0, -50]),
    { stiffness: 100, damping: 30 }
  );

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [0.8, 1.1, 1],
        rotate: [0, -10, 0],
        transition: { duration: 1.2, ease: "easeOut" }
      });
    }
  }, [isInView, controls]);

  const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % wittyComments.length);
  }, 4000); // change every 4 sec
  return () => clearInterval(interval);
}, []);


  return (
    
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111827]">
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
              className="text-lg md:text-xl text-white/80 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypewriterComponent />
            </motion.p>

            <motion.p
              key={index}
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {wittyComments[index]}
            </motion.p>


            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* View Projects Button */}
              <Link href="#projects">
                <motion.button
                  className="relative px-7 py-3 rounded-lg font-normal text-sm 
                            text-white bg-transparent border border-purple-500/50
                            hover:border-purple-400 transition-all duration-300
                            overflow-hidden group flex items-center justify-center"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Underline Sweep Effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r 
                                  from-pink-500 via-purple-500 to-cyan-500 
                                  transition-all duration-500 group-hover:w-full"></span>

                  {/* Button Text */}
                  <span className="relative z-10 group-hover:text-purple-300 transition-colors">
                    📂 View Projects
                  </span>
                </motion.button>
              </Link>

              {/* Download Resume Button */}
              <a 
                href="https://drive.google.com/uc?export=download&id=1mgVZBLUCuAtVY_QhzuJLOWosUOJqUE1V" 
                download
              >
                <motion.button
                  className="relative px-8 py-3 rounded-lg bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] text-white font-normal text-sm
                            shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,105,180,0.6)] 
                            overflow-hidden group flex items-center justify-center"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Subtle overlay pulse */}
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

                  <span className="relative z-10">💾 Download Resume</span>
                </motion.button>
              </a>
            </motion.div>

          </div>

{/* Right Content - Optimized Expert Dev Profile Image */}
<motion.div 
  className="flex-1 relative"
  initial={{ opacity: 0, scale: 0.85 }}
  animate={isInView ? { opacity: 1, scale: 1 } : {}}
  transition={{ duration: 1, delay: 0.3 }}
>
  <div className="relative w-[320px] h-[420px] mx-auto perspective-1000">

    {/* Neon Orbit Glow / Hologram Lines */}
    <motion.div
      className="absolute -inset-4 rounded-lg blur-2xl opacity-50 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
      animate={{
        rotate: [0, 10, -10, 0],
        scale: [1, 1.12, 1.08, 1]
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    {/* Pre-generate floating hologram line positions */}
    {Array.from({ length: 12 }).map((_, i) => {
      const topPos = Math.random() * 100;
      const leftPos = Math.random() * 100;
      const rotateDuration = 6 + Math.random() * 6;
      return (
        <motion.div
          key={i}
          className="absolute w-[2px] h-10 bg-gradient-to-b from-purple-400/70 to-pink-400/20 rounded-full"
          style={{ top: `${topPos}%`, left: `${leftPos}%` }}
          animate={{
            rotate: [0, 360],
            y: [-8, 8, -8]
          }}
          transition={{
            duration: rotateDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      );
    })}

    {/* Code Particles */}
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 40 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-green-400 font-mono text-[10px] select-none"
          initial={{ y: -50, x: Math.random() * 320 }}
          animate={{ y: 450 }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.span>
      ))}
    </div>

    {/* Main Image Card */}
    <motion.div
      className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 backdrop-blur-sm group"
      whileHover={{ scale: 1.03, rotateY: 6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Neon Frame Glow */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-pink-500/50 pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Image */}
      <Image
        src="/images/IMG_0684.JPG"
        alt="Profile"
        fill
        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-300 filter brightness-90 contrast-110"
        priority
      />

      {/* Terminal overlay top */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 animate-pulse" />
        </div>
      </div>

      {/* Bottom code comment with shimmer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <code className="text-xs text-green-400 font-mono animate-[shimmer_3s_infinite]">
          {"// Developer mode: Activated"}
        </code>
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
                  <span className="text-green-500">➜</span>
                  <span className="text-blue-400">~/portfolio</span>
                  <span className="text-gray-400">on</span>
                  <span className="text-purple-400">main</span>
                  <span className="text-gray-400 ml-2">$</span>
                  <span className="text-white/90">ls ./skills/</span>
                  <motion.span 
                    className="inline-block w-2 h-4 bg-white/80 ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Skills Area */}
              <ScrollingTechStack />
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

