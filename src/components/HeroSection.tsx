'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
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
  "/* Hire me before AI replaces me 😅 */",
  "// Console.log is my therapist.",
  "/* JavaScript is my love language */",
  "// Writing logic that Google can't autocomplete",
  "// Debugging: Where the fun begins",
  "/* Eat, Sleep, Code, Repeat */",
  "// My code never has bugs. It just develops random features.",
  "// Just one more feature... and one more... and one more...",
  "/* Code is my canvas, creativity is my brush */",
  "// I build things that make the internet awesome",
  "// My code is so clean, you could eat off it",
  "/* Coding is my therapy, and the keyboard is my couch */",
  "// I write code that even my mom can understand",
  "// My code is so efficient, it could run on a potato",
  "// Probably debugging while you read this",
  "/* Half developer, half illusionist */",
  "// My variables have trust issues",
  "// Breaking things beautifully",
];

/* ------------------ TYPEWRITER ------------------ */
const TypewriterComponent: React.FC = React.memo(() => {
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
      'Git Commit: "final_final_v3"',
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
});
TypewriterComponent.displayName = 'TypewriterComponent';

/* ------------------ MEMOIZED TECH ICON ------------------ */
const TechIcon: React.FC<{ icon: IconType }> = React.memo(({ icon: Icon }) => (
  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/10 hover:border-white/30 transition-colors duration-200 flex items-center justify-center">
    <Icon className="w-6 h-6 text-white/60" />
  </div>
));
TechIcon.displayName = 'TechIcon';

/* ------------------ WITTY COMMENT ROTATOR ------------------ */
const WittyComment: React.FC = React.memo(() => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % wittyComments.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-11 md:h-8 overflow-hidden">
      {wittyComments.map((comment, i) => (
        <p
          key={i}
          className="absolute inset-0 text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 font-mono transition-all duration-500 ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          {comment}
        </p>
      ))}
    </div>
  );
});
WittyComment.displayName = 'WittyComment';

/* ------------------ MAIN HERO ------------------ */
const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  /* All animations in CSS for performance */
  const AnimationStyles = useMemo(() => (
    <style>{`
      /* Tech stack scroll - GPU accelerated */
      @keyframes tech-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .tech-scroll {
        animation: tech-scroll 36s linear infinite;
        will-change: transform;
      }

      /* Background gradients with CSS animation */
      @keyframes blob-pulse-1 {
        0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
        50% { opacity: 0.6; transform: scale(1.1) translate(10px, -10px); }
      }
      @keyframes blob-pulse-2 {
        0%, 100% { opacity: 0.3; transform: scale(1) translate(0, 0); }
        50% { opacity: 0.5; transform: scale(1.15) translate(-15px, 10px); }
      }
      .bg-blob-1::before {
        content: '';
        position: absolute;
        top: 20%;
        left: 15%;
        width: 18rem;
        height: 13rem;
        background: linear-gradient(135deg, #7928CA, #FF0080);
        border-radius: 50%;
        filter: blur(60px);
        animation: blob-pulse-1 20s ease-in-out infinite;
        pointer-events: none;
      }
      .bg-blob-2::after {
        content: '';
        position: absolute;
        bottom: 25%;
        right: 15%;
        width: 18rem;
        height: 18rem;
        background: linear-gradient(135deg, #FF0080, #007CF0);
        border-radius: 50%;
        filter: blur(70px);
        animation: blob-pulse-2 25s ease-in-out infinite;
        pointer-events: none;
      }

      /* Floating orbs around image */
      @keyframes float-orb-1 {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        33% { transform: translate(15px, -20px) scale(1.1); opacity: 0.8; }
        66% { transform: translate(-10px, -15px) scale(0.95); opacity: 0.7; }
      }
      @keyframes float-orb-2 {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        33% { transform: translate(-20px, 15px) scale(1.15); opacity: 0.7; }
        66% { transform: translate(10px, 20px) scale(0.9); opacity: 0.6; }
      }
      @keyframes float-orb-3 {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
        33% { transform: translate(20px, 10px) scale(1.05); opacity: 0.75; }
        66% { transform: translate(-15px, -10px) scale(1.1); opacity: 0.65; }
      }
      
      .image-orb {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        filter: blur(8px);
        z-index: 1;
      }
      .image-orb-1 {
        width: 40px;
        height: 40px;
        top: 10%;
        right: -20px;
        background: linear-gradient(135deg, #FF69B4, #FF1493);
        animation: float-orb-1 8s ease-in-out infinite;
      }
      .image-orb-2 {
        width: 50px;
        height: 50px;
        bottom: 15%;
        left: -25px;
        background: linear-gradient(135deg, #9333EA, #C77DFF);
        animation: float-orb-2 10s ease-in-out infinite;
      }
      .image-orb-3 {
        width: 35px;
        height: 35px;
        top: 50%;
        left: -15px;
        background: linear-gradient(135deg, #00D4FF, #007CF0);
        animation: float-orb-3 9s ease-in-out infinite;
      }
      
      /* Image glow effect */
      .image-glow::before {
        content: '';
        position: absolute;
        inset: -1.5rem;
        background: linear-gradient(135deg, #FF9BD8, #C77DFF, #6AE0FF);
        border-radius: 0.75rem;
        filter: blur(30px);
        opacity: 0.4;
        pointer-events: none;
        z-index: 0;
      }

      /* Neon border pulse */
      @keyframes neon-pulse {
        0%, 100% { 
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.3),
                      0 0 20px rgba(255, 105, 180, 0.2),
                      inset 0 0 10px rgba(255, 105, 180, 0.1);
        }
        50% { 
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.5),
                      0 0 30px rgba(255, 105, 180, 0.3),
                      inset 0 0 15px rgba(255, 105, 180, 0.2);
        }
      }
      .neon-border {
        animation: neon-pulse 3s ease-in-out infinite;
      }

      /* Left side minimal decorations */
      @keyframes accent-line-1 {
        0%, 100% { transform: scaleX(1); opacity: 0.4; }
        50% { transform: scaleX(1.2); opacity: 0.6; }
      }
      @keyframes accent-line-2 {
        0%, 100% { transform: translateX(0); opacity: 0.3; }
        50% { transform: translateX(10px); opacity: 0.5; }
      }
      @keyframes code-brackets {
        0%, 100% { opacity: 0.3; transform: translateY(0); }
        50% { opacity: 0.6; transform: translateY(-5px); }
      }
      
      .text-accent-line-1 {
        position: absolute;
        left: 0;
        top: 30%;
        width: 30%;
        height: 2px;
        background: linear-gradient(90deg, #7928CA, transparent);
        transform-origin: left;
        animation: accent-line-1 8s ease-in-out infinite;
        z-index: 1;
      }
      .text-accent-line-2 {
        position: absolute;
        left: 0;
        bottom: 30%;
        width: 15%;
        height: 2px;
        background: linear-gradient(90deg, #FF0080, transparent);
        animation: accent-line-2 8s ease-in-out infinite;
        z-index: 1;
      }
      .code-bracket {
        position: absolute;
        font-family: 'Courier New', monospace;
        font-size: 80px;
        font-weight: 100;
        color: rgba(255, 255, 255, 0.25);
        pointer-events: none;
        line-height: 1;
        z-index: 0;
      }
      .code-bracket-top {
        top: -25%;
        left: -10%;
        animation: code-brackets 7s ease-in-out infinite;
      }
      .code-bracket-bottom {
        bottom: -20%;
        left: 75%;
        animation: code-brackets 7s ease-in-out infinite 3.5s;
      }

      /* Scroll indicator animation */
      @keyframes scroll-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
      }
      @keyframes scroll-dot {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(12px); }
      }
      .scroll-indicator {
        animation: scroll-bounce 2s ease-in-out infinite;
      }
      .scroll-dot {
        animation: scroll-dot 2s ease-in-out infinite;
      }

      /* Terminal cursor blink */
      @keyframes cursor-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .terminal-cursor {
        animation: cursor-blink 0.8s step-end infinite;
      }

      /* Reduced motion overrides */
      @media (prefers-reduced-motion: reduce) {
        .tech-scroll,
        .bg-blob-1::before,
        .bg-blob-2::after,
        .image-orb,
        .neon-border,
        .text-accent-line-1,
        .text-accent-line-2,
        .code-bracket,
        .scroll-indicator,
        .scroll-dot,
        .terminal-cursor {
          animation: none !important;
        }
      }
    `}</style>
  ), []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111827]"
      ref={ref}
    >
      {AnimationStyles}

      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
        }}
      />

      {/* CSS-only animated blobs - only after mount */}
      {mounted && !shouldReduceMotion && <div className="bg-blob-1" />}
      {mounted && !shouldReduceMotion && <div className="bg-blob-2" />}

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* LEFT: Text / Buttons */}
          <div className="flex-1 text-center lg:text-left space-y-6 relative">
            {/* Left side decorations - visible only on desktop, only after mount to avoid hydration issues */}
            {mounted && !shouldReduceMotion && (
              <>
                <span className="code-bracket code-bracket-top hidden lg:block">{'{'}</span>
                <span className="code-bracket code-bracket-bottom hidden lg:block">{'}'}</span>
                <div className="text-accent-line-1 hidden lg:block" />
                <div className="text-accent-line-2 hidden lg:block" />
              </>
            )}

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-montserrat tracking-tight relative z-10">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#7928CA] via-[#FF0080] to-[#007CF0]">
                S A T Y A M
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-mono relative z-10">
              <TypewriterComponent />
            </p>

            <WittyComment />

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 relative z-10">
              <Link href="#projects" aria-label="View Projects">
                <button className="relative px-7 py-3 rounded-lg font-normal text-sm text-white bg-transparent border border-purple-500/50 hover:border-purple-400 transition-all duration-200 hover:scale-105 overflow-hidden group">
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                  <span className="relative z-10">📂 View Projects</span>
                </button>
              </Link>

              <a
                href="https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/Resume/Resume%20-%20SC.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label="Download Resume"
              >
                <button className="relative px-8 py-3 rounded-lg bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] text-white font-normal text-sm shadow-lg transition-all duration-200 hover:scale-105 overflow-hidden group">
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                  <span className="relative z-10">📃 Download Resume</span>
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT: Image Card */}
          <div className="flex-1 relative">
            <div className="relative w-[320px] h-[420px] mx-auto">
              {/* Image glow effect - only after mount */}
              {mounted && !shouldReduceMotion && <div className="image-glow" />}

              {/* Floating orbs around image - only after mount */}
              {mounted && !shouldReduceMotion && (
                <>
                  <div className="image-orb image-orb-1" />
                  <div className="image-orb image-orb-2" />
                  <div className="image-orb image-orb-3" />
                </>
              )}

              {/* Main Image Card */}
              <div className={`relative w-full h-full rounded-lg overflow-hidden border-2 group z-10 ${mounted && !shouldReduceMotion ? 'neon-border' : 'border-white/20'}`}>
                <Image
                  src="https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/me.JPG"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 90vw, 320px"
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-300"
                  style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                  priority
                />

                {/* Top terminal overlay - on hover */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Bottom code comment - on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <code className="text-xs text-green-400 font-mono">
                    {"// Developer mode: Activated"}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TERMINAL + TECH RAIL */}
        <motion.div
          className="mt-12 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="relative bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
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
                {mounted && !shouldReduceMotion && (
                  <span className="inline-block w-2 h-4 bg-white/80 ml-1 terminal-cursor" />
                )}
              </div>
            </div>

            {/* Tech rail with CSS animation */}
            <div className="relative overflow-hidden w-full py-4">
              <div className="flex gap-6 px-4 tech-scroll" style={{ width: 'max-content' }}>
                {[...techStack, ...techStack].map((tech, idx) => (
                  <TechIcon key={`tech-${idx}`} icon={tech.icon} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator - only after mount */}
        {mounted && !shouldReduceMotion && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 scroll-indicator">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/50 rounded-full scroll-dot" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;