'use client';
import React, { useEffect , useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
  useAnimation
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import {
  SiJavascript, SiPython, SiCplusplus, SiPhp,
  SiReact, SiHtml5, SiCss3, SiTailwindcss,
  SiBootstrap, SiMysql, SiGit, SiGithub,
  SiPostman, SiNetlify, SiVercel, SiReplit
} from 'react-icons/si';
import { BiLogoFirebase, BiLogoJava } from 'react-icons/bi';
import { TbBrandNextjs, TbBrandVscode } from 'react-icons/tb';
import type { IconType } from 'react-icons';


interface TechStack { id: number; name: string; icon: IconType; category?: string; }
interface Hologram {
  top: number;
  left: number;
  duration: number;
  delay: number;
}

interface Particle {
  x: number;
  duration: number;
  delay: number;
  char: '0' | '1';
}


const techStack: TechStack[] = [
  { id: 1, name: 'JavaScript', icon: SiJavascript, category: 'language' },
  { id: 2, name: 'Python', icon: SiPython, category: 'language' },
  { id: 3, name: 'C/C++', icon: SiCplusplus, category: 'language' },
  { id: 4, name: 'PHP', icon: SiPhp, category: 'language' },
  { id: 5, name: 'Java', icon: BiLogoJava, category: 'language' },
  { id: 6, name: 'Next.js', icon: TbBrandNextjs, category: 'frontend' },
  { id: 7, name: 'React.js', icon: SiReact, category: 'frontend' },
  { id: 8, name: 'HTML', icon: SiHtml5, category: 'frontend' },
  { id: 9, name: 'CSS', icon: SiCss3, category: 'frontend' },
  { id: 10, name: 'Tailwind', icon: SiTailwindcss, category: 'frontend' },
  { id: 11, name: 'Bootstrap', icon: SiBootstrap, category: 'frontend' },
  { id: 12, name: 'Firebase', icon: BiLogoFirebase, category: 'frontend' },
  { id: 13, name: 'MySQL', icon: SiMysql, category: 'database' },
  { id: 14, name: 'Git', icon: SiGit, category: 'tools' },
  { id: 15, name: 'GitHub', icon: SiGithub, category: 'tools' },
  { id: 16, name: 'VS Code', icon: TbBrandVscode, category: 'tools' },
  { id: 17, name: 'Postman', icon: SiPostman, category: 'tools' },
  { id: 18, name: 'Netlify', icon: SiNetlify, category: 'tools' },
  { id: 19, name: 'Vercel', icon: SiVercel, category: 'tools' },
  { id: 20, name: 'Replit', icon: SiReplit, category: 'tools' }
];

const wittyComments = [
  "// TODO: Fix bugs. Create bugs. Fix them again.",
  "/* When I'm not coding, I'm thinking about Code */",
  "// Ctrl + S is my panic button.",
  "/* Minimal code. Maximum impact. */",
  "// I speak fluent code and sarcasm",
  "/* Keep calm and code on */",
  "// I write code. What's your superpower?",
  "/* Code is poetry in motion */",
  "// In a relationship with my IDE",
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
  "// I write code that makes computers do cool stuff",
  "// My code is so efficient, it could run on a potato",
  "// My code is so good, it should come with a warning label",
  "// Probably debugging while you read this",
  "/* Half developer, half illusionist */",
  "// My variables have trust issues",
  "// Breaking things beautifully",
];

/* ------------------ TYPEWRITER ------------------ */

const TypewriterComponent: React.FC = () => {
  const [text] = useTypewriter({
    words: [
      'Accidental Engineer',
      'Full Stack Developer',
      'Code Architect',
      'Bug Exterminator',
      'Exam-Time Algorithm Memorizer',
      'Pixel Perfectionist',
      'Coffee → Code Converter',
      'It Works On My Machine',
      'Professional Googler',
      'README Writer',
      '404 Problem Not Found',
      'Big-O Anxiety Specialist',
      'Git Commit: “final_final_v3”',

    ],
    loop: true,
    delaySpeed: 2500,
    deleteSpeed: 65,
    typeSpeed: 80
  });

  return (
    <span>
      {text}
      <Cursor cursorStyle="_" />
    </span>
  );
};

/* ------------------ Small helper: memoized icon box ------------------ */

const TechIcon: React.FC<{ icon: IconType }> = React.memo(({ icon: Icon }) => (
  <div
    className="w-11 h-11 rounded-lg bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm
               border border-white/10 flex items-center justify-center"
    style={{ willChange: 'transform' }}
  >
    <Icon className="w-6 h-6 text-white/60" />
  </div>
));
TechIcon.displayName = 'TechIcon';

/* ------------------ MAIN HERO ------------------ */

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-75px' });
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  /* ------------------ precompute random values (no per-render randomness) ------------------ */
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  }, []);
  const HOLOGRAM_COUNT = isMobile ? 6 : 12;
  const PARTICLE_COUNT = isMobile ? 12 : 28;


  // hologram line positions & timing (memoized)
const hologramsRef = useRef<Hologram[]>([]);
if (hologramsRef.current.length === 0) {
  hologramsRef.current = Array.from({ length: HOLOGRAM_COUNT }).map(() => ({
    top: Math.round(Math.random() * 100),
    left: Math.round(Math.random() * 100),
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 2
  }));
}
const holograms = hologramsRef.current;


  // particles for the binary rain (memoized)
const particlesRef = useRef<Particle[]>([]);
if (particlesRef.current.length === 0) {
  particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map(() => ({
    x: Math.random() * 320,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 4,
    char: Math.random() > 0.5 ? '1' : '0'
  }));
}
const particles = particlesRef.current;


  /* ------------------ witty comment rotator ------------------ */
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % wittyComments.length), 3800);
    return () => clearInterval(t);
  }, []);

  /* ------------------ entrance animation controller ------------------ */
  useEffect(() => {
    if (isInView) {
      controls.start({ scale: [0.5, 1], opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } });
    }
  }, [isInView, controls]);

  const ScrollStyle = () => (
    <style>{`
      @keyframes tech-scroll {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .tech-scroll {
        animation: tech-scroll 36s linear infinite;
        will-change: transform;
      }
      /* Accessibility: reduce motion */
      @media (prefers-reduced-motion: reduce) {
        .tech-scroll { animation: none !important; transform: translateX(0) !important; }
        .motion-safe { animation: none !important; }
      }
      /* small helper for the shimmer (keeps original feel but cheap) */
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .shimmer-bg {
        background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%);
        background-size: 200% 100%;
        animation: shimmer 2.6s linear infinite;
      }
    `}</style>
  );

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111827]"
      ref={ref}
      style={{ contain: 'paint' }} // isolate repaints
    >
      <ScrollStyle />


      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')" // same base64 as original
        }}
      />
      {/* Animated Background Blobs */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/6 w-72 h-52 rounded-full filter blur-2xl"
            style={{ background: 'linear-gradient(90deg,#7928CA,#FF0080)' }}
            animate={{ opacity: [0.75, 1, 0.75,], scale: [1, 1.25, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-72 h-72 rounded-full filter blur-2xl"
            style={{ background: 'linear-gradient(90deg,#FF0080,#007CF0)' }}
            animate={{ opacity: [ 0.5, 1, 0.5],scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {/* LEFT: Text / Buttons */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#7928CA] via-[#FF0080] to-[#007CF0]">
                Satyam
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 font-mono"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TypewriterComponent />
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                className="text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 font-mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
              >
                {wittyComments[index]}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href="#projects" aria-label="View Projects">
                <button
                  className="relative px-7 py-3 rounded-lg font-normal text-sm text-white bg-transparent border border-purple-500/50
                             hover:border-purple-400 transition-transform duration-200 transform-gpu hover:scale-105 overflow-hidden group"
                >
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                  <span className="relative z-10">📂 View Projects</span>
                </button>
              </Link>

              <a
                href="https://drive.google.com/uc?export=download&id=1mgVZBLUCuAtVY_QhzuJLOWosUOJqUE1V"
                download
                aria-label="Download Resume"
              >
                <button
                  className="relative px-8 py-3 rounded-lg bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] text-white font-normal text-sm
                             shadow-lg transition-transform duration-200 transform-gpu hover:scale-105 overflow-hidden group"
                >
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                  <span className="relative z-10">💾 Download Resume</span>
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT: Image Card */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.28 }}
          >
            <div className="relative w-[320px] h-[420px] mx-auto perspective-1000">

              {!shouldReduceMotion && (
                <motion.div
                  className="absolute -inset-4 rounded-lg blur-2xl opacity-50"
                  style={{ background: 'linear-gradient(90deg,#FF9BD8,#C77DFF,#6AE0FF)' }}
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1.03, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {holograms.map((h, i) => (
                <motion.div
                  key={`holo-${i}`}
                  className="absolute w-[2px] h-10 rounded-full"
                  style={{
                    top: `${h.top}%`,
                    left: `${h.left}%`,
                    background: 'linear-gradient(180deg, rgba(191,90,242,0.8), rgba(255,140,168,0.2))',
                    willChange: 'transform'
                  }}
                  animate={!shouldReduceMotion ? { rotate: [0, 360], y: [-8, 8, -8] } : {}}
                  transition={{
                    duration: h.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: h.delay
                  }}
                />
              ))}


              <div className="absolute inset-0 pointer-events-none" style={{ perspective: 1000 }}>
                {particles.map((p, i) => (
                  <motion.span
                    aria-hidden
                    key={`part-${i}`}
                    className="absolute text-green-400 font-mono text-[10px] select-none"
                    initial={{ y: -60, x: p.x }}
                    animate={!shouldReduceMotion ? { y: 460 } : {}}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: p.delay
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    {p.char}
                  </motion.span>
                ))}
              </div>

              {/* Main Image Card */}
              <div
                className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 backdrop-blur-sm group"
              >
                {/* Neon Frame Glow */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                    style={{ borderColor: 'rgba(255,105,180,0.28)' }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Image */}
                <Image
                  src="/images/me.JPG"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 90vw, 320px"
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-300 filter brightness-90 contrast-110"
                  priority
                />

                {/* Top terminal overlay  */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 animate-pulse" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 animate-pulse" />
                  </div>
                </div>

                {/* Bottom code comment with shimmer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <code className="text-xs text-green-400 font-mono shimmer-bg">
                    {"// Developer mode: Activated"}
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* TERMINAL + TECH RAIL */}
        <motion.div
          className="mt-12 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
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

            {/* Command line */}
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
                  animate={!shouldReduceMotion ? { opacity: [1, 0] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Tech rail (GPU-friendly CSS scroll) */}
            <div className="relative overflow-hidden w-full py-4">
              <div
                className="flex gap-6 px-4 tech-scroll"
                // duplicate once so loop is seamless
                style={{
                  width: 'max-content',
                }}
              >
                {[...techStack, ...techStack].map((tech, idx) => (
                  <div
                    key={`tech-${idx}`}
                    className="flex-shrink-0"
                    style={{ WebkitFontSmoothing: 'subpixel-antialiased' }}
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/10 hover:border-white/30 transition-transform duration-200 transform-gpu">
                      {React.createElement(tech.icon, { className: 'w-6 h-6 text-white/60' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator (keeps original) */}
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
          animate={!shouldReduceMotion ? { y: [0, 10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={!shouldReduceMotion ? { y: [0, 12, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
