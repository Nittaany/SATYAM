// "use client";

// import React, { useMemo, useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   type MotionValue,
// } from "framer-motion";
// import { Sparkles, Rocket, Database, Wrench, Handshake } from "lucide-react";


// // Data

// const categories: { title: string; icon: React.ReactNode; skills: string[] }[] = [
//   {
//     title: "Programming Languages",
//     icon: <Rocket className="w-5 h-5" aria-hidden />,
//     skills: ["JavaScript", "Python", "C/C++", "PHP", "Java"],
//   },
//   {
//     title: "Web Development",
//     icon: <Sparkles className="w-5 h-5" aria-hidden />,
//     skills: [
//       "Next.js",
//       "React.js",
//       "HTML",
//       "CSS",
//       "Tailwind CSS",
//       "Bootstrap",
//       "Firebase",
//     ],
//   },
//   {
//     title: "Database Technologies",
//     icon: <Database className="w-5 h-5" aria-hidden />,
//     skills: ["MySQL", "Firebase Realtime DB"],
//   },
//   {
//     title: "Tools & Platforms",
//     icon: <Wrench className="w-5 h-5" aria-hidden />,
//     skills: ["Git", "GitHub", "VS Code", "Postman", "Botpress", "Netlify", "Vercel", "Replit"],
//   },
//   {
//     title: "Soft Skills",
//     icon: <Handshake className="w-5 h-5" aria-hidden />,
//     skills: ["Leadership", "Teamwork", "Problem-Solving", "Adaptability"],
//   },
// ];


// // Utilities

// function hashSeed(str: string): number {
//   let h = 2166136261;
//   for (let i = 0; i < str.length; i++) {
//     h ^= str.charCodeAt(i);
//     h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
//   }
//   return (h >>> 0);
// }

// function seededOffset(label: string) {
//   const h = hashSeed(label);
//   const rx = ((h & 0xff) / 127.5) - 1;
//   const ry = (((h >> 8) & 0xff) / 127.5) - 1;
//   const rotUnit = (((h >> 16) & 0xff) / 127.5) - 1;

//   const dist = 140 + ((h >> 24) & 0xff) * 0.6;
//   const x = rx * dist;
//   const y = ry * (dist * 0.6);
//   const rot = rotUnit * 28;

//   return { x, y, rot };
// }

// // Chip Component
// function SkillChip({
//   label,
//   progress,
//   animStart = 0.2,
//   animEnd = 0.45,
// }: {
//   label: string;
//   progress: MotionValue<number>;
//   animStart?: number;
//   animEnd?: number;
// }) {
//   const { x, y, rot } = useMemo(() => seededOffset(label), [label]);

//   // Original transforms
//   const translateX = useTransform(progress, [animStart, animEnd], [x / 1.2, 0]);
//   const translateY = useTransform(progress, [animStart, animEnd], [y / 1.2, 0]);
//   const rotate = useTransform(progress, [animStart, animEnd], [rot, 0]);
//   const scale = useTransform(progress, [animStart, animEnd], [0.82, 1]);
//   const blur = useTransform(progress, [animStart, animEnd], [6, 0]);
//   const opacity = useTransform(progress, [animStart, animEnd * 0.85], [0, 1]);

//   // Smooth everything with springs
//   const springConfig = { stiffness: 260, damping: 26 };
//   const springX = useSpring(translateX, springConfig);
//   const springY = useSpring(translateY, springConfig);
//   const springRotate = useSpring(rotate, springConfig);
//   const springScale = useSpring(scale, springConfig);
//   const springOpacity = useSpring(opacity, springConfig);
//   const springBlur = useSpring(blur, springConfig);

//   const blurFilter = useTransform(springBlur, (b: number) => `blur(${b}px)`);

//   return (
//     <motion.span
//       style={{
//         translateX: springX,
//         translateY: springY,
//         rotate: springRotate,
//         scale: springScale,
//         filter: blurFilter,
//         opacity: springOpacity,
//       }}
//       whileHover={{ y: -4, scale: 1.03 }}
//       whileTap={{ scale: 0.98 }}
//       className="select-none rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
//       aria-label={label}
//     >
//       {label}
//     </motion.span>
//   );
// }

// // Category Card Component
// function CategoryCard({
//   title,
//   icon,
//   skills,
//   index,
// }: {
//   title: string;
//   icon: React.ReactNode;
//   skills: string[];
//   index: number;
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 80%", "end 25%"],
//   });

//   const parallax = useTransform(scrollYProgress, [0, 1], [index * 6, 0]);
//   const lift = useTransform(scrollYProgress, [0, 1], [2, -2]);
//   const glow = useTransform(scrollYProgress, [0, 1], [0.18, 0.6]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y: parallax }}
//       className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl"
//     >
//       <motion.div
//         style={{ opacity: glow }}
//         className="pointer-events-none absolute -inset-24 -z-10 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(168,85,247,0.16),rgba(59,130,246,0.16),transparent_70%)] blur-2xl"
//         aria-hidden
//       />
//       <motion.header style={{ y: lift }} className="mb-4 flex items-center gap-2">
//         <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10 shadow-inner">
//           {icon}
//         </span>
//         <h3 className="text-base font-semibold tracking-wide text-white/90">{title}</h3>
//       </motion.header>
//       <div className="flex flex-wrap gap-2">
//         {skills.map((s) => (
//           <SkillChip key={s} label={s} progress={scrollYProgress} />
//         ))}
//       </div>
//     </motion.div>
//   );
// }
// // Ambient Background Component
// function AmbientBG({ progress }: { progress: MotionValue<number> }) {
//   const skew = useTransform(progress, [0, 1], [4, 0]);
//   const opacity = useTransform(progress, [0, 1], [0.4, 0.15]);
//   return (
//     <motion.div
//       aria-hidden
//       style={{ skewY: skew, opacity }}
//       className="pointer-events-none absolute inset-0 -z-10"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_50%)]" />
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
//     </motion.div>
//   );
// }


// export default function Skills() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start 85%", "end 30%"],
//   });

//   const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
//   const sectionY = useTransform(scrollYProgress, [0, 0.2], [24, 0]);

//   return (
//     <section
//     id='skills'
//     ref={sectionRef} className="relative mx-auto max-w-6xl px-4 py-20">
//       <motion.div style={{ opacity: sectionOpacity, y: sectionY }}>
//         <header className="mb-10 flex items-end justify-between gap-6">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight text-white">Skills & Tech I Use</h2>
//           </div>
//         </header>
//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//           {categories.map((cat, i) => (
//             <CategoryCard
//               key={cat.title}
//               title={cat.title}
//               icon={cat.icon}
//               skills={cat.skills}
//               index={i}
//             />
//           ))}
//         </div>
//       </motion.div>
//       <AmbientBG progress={scrollYProgress} />
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-cyan-500/10 via-purple-500/10 to-transparent blur-2xl" />
//     </section>
//   );
// }
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Sparkles,
  Rocket,
  Database,
  Wrench,
  Handshake,
  Terminal,
  Zap,
} from "lucide-react";

// ======================== DATA ========================

const categories = [
  {
    title: "Programming Languages",
    icon: Rocket,
    skills: ["JavaScript", "Python", "C/C++", "PHP", "Java"],
    color: "from-purple-500 to-pink-500",
    terminalColor: "text-purple-400",
  },
  {
    title: "Web Development",
    icon: Sparkles,
    skills: [
      "Next.js",
      "React.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Firebase",
    ],
    color: "from-cyan-500 to-blue-500",
    terminalColor: "text-cyan-400",
  },
  {
    title: "Database Technologies",
    icon: Database,
    skills: ["MySQL", "Firebase Realtime DB"],
    color: "from-green-500 to-emerald-500",
    terminalColor: "text-green-400",
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Botpress",
      "Netlify",
      "Vercel",
      "Replit",
    ],
    color: "from-orange-500 to-red-500",
    terminalColor: "text-orange-400",
  },
  {
    title: "Soft Skills",
    icon: Handshake,
    skills: ["Leadership", "Teamwork", "Problem-Solving", "Adaptability"],
    color: "from-pink-500 to-rose-500",
    terminalColor: "text-pink-400",
  },
];

// ======================== MATRIX BACKGROUND ========================

const MatrixRain: React.FC = React.memo(() => {
  const columns = 30;
  const chars = "01アイウエオカキクケコサシスセソ";

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="matrix-column absolute top-0 text-green-400 font-mono text-xs"
          style={{
            left: `${(i / columns) * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="opacity-50">
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
MatrixRain.displayName = "MatrixRain";

// ======================== SKILL CHIP ========================

interface SkillChipProps {
  skill: string;
  index: number;
  categoryColor: string;
}

const SkillChip: React.FC<SkillChipProps> = React.memo(
  ({ skill, index, categoryColor }) => {
    return (
      <div
        className="skill-chip-wrapper"
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        <div className="group relative">
          <div
            className={`
            skill-chip
            relative px-3 py-1.5 rounded-md
            bg-black/40 border border-white/10
            font-mono text-sm text-white/90
            transition-all duration-300
            hover:border-white/30 hover:bg-black/60
            hover:scale-105 hover:-translate-y-0.5
            cursor-default
            backdrop-blur-sm
          `}
          >
            <span className="relative z-10">{skill}</span>
            
            {/* Glow on hover */}
            <div
              className={`
              absolute inset-0 rounded-md opacity-0 group-hover:opacity-100
              bg-gradient-to-r ${categoryColor}
              blur-md -z-10 transition-opacity duration-300
            `}
            />
          </div>
        </div>
      </div>
    );
  }
);
SkillChip.displayName = "SkillChip";

// ======================== TERMINAL WINDOW ========================

interface TerminalWindowProps {
  category: typeof categories[0];
  index: number;
  isVisible: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = React.memo(
  ({ category, index, isVisible }) => {
    const [compiled, setCompiled] = useState(false);
    const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
    const Icon = category.icon;

    useEffect(() => {
      if (!isVisible) return;

      // Trigger compile animation
      const compileTimer = setTimeout(() => {
        setCompiled(true);
      }, 300 + index * 150);

      return () => clearTimeout(compileTimer);
    }, [isVisible, index]);

    useEffect(() => {
      if (!compiled) return;

      // Stagger skill appearance
      if (currentSkillIndex < category.skills.length) {
        const timer = setTimeout(() => {
          setCurrentSkillIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [compiled, currentSkillIndex, category.skills.length]);

    return (
      <div
        className={`
        terminal-window
        relative rounded-lg overflow-hidden
        bg-black/30 backdrop-blur-xl
        border border-white/10
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
        style={{
          transitionDelay: `${index * 100}ms`,
        }}
      >
        {/* Terminal Header */}
        <div className="terminal-header flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
          </div>
          <code className="text-xs text-gray-500 font-mono">
            {category.title.toLowerCase().replace(/\s+/g, "_")}.tsx
          </code>
          <div className="w-16" />
        </div>

        {/* Terminal Content */}
        <div className="p-5 space-y-3">
          {/* Command Line */}
          <div className="flex items-center gap-2 font-mono text-sm">
            <Icon className={`w-4 h-4 ${category.terminalColor}`} />
            <span className="text-green-400">$</span>
            <span className="text-gray-400">npm install</span>
            <span className={category.terminalColor}>{category.title}</span>
            {!compiled && (
              <span className="inline-block w-2 h-4 bg-white/80 ml-1 terminal-cursor" />
            )}
          </div>

          {/* Compile Output */}
          {compiled && (
            <div className="compile-output space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>Compiling...</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                <span>✓</span>
                <span>Compiled successfully in {(Math.random() * 2 + 1).toFixed(2)}s</span>
              </div>
            </div>
          )}

          {/* Skills Grid */}
          <div className="skills-grid flex flex-wrap gap-2 pt-2">
            {category.skills.slice(0, currentSkillIndex).map((skill, idx) => (
              <SkillChip
                key={skill}
                skill={skill}
                index={idx}
                categoryColor={category.color}
              />
            ))}
          </div>

          {/* Loading indicator during compilation */}
          {compiled && currentSkillIndex < category.skills.length && (
            <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
              <div className="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
              <span>Loading modules...</span>
            </div>
          )}
        </div>

        {/* Gradient border glow */}
        <div
          className={`
          absolute inset-0 rounded-lg opacity-0 hover:opacity-100
          bg-gradient-to-r ${category.color}
          blur-xl -z-10 transition-opacity duration-500
        `}
        />
      </div>
    );
  }
);
TerminalWindow.displayName = "TerminalWindow";

// ======================== MAIN COMPONENT ========================

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Matrix Background */}
      <MatrixRain />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow-delayed" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`
          mb-12 transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-green-400" />
            <div className="flex items-center gap-2 font-mono text-sm text-gray-500">
              <span className="text-green-400">~/portfolio</span>
              <span>/</span>
              <span className="text-purple-400">skills</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="text-gray-400 font-mono text-sm max-w-2xl">
            <span className="text-gray-600">||</span>
            Compiling skills and dependencies...
          </p>
        </div>

        {/* Terminal Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <TerminalWindow
              key={category.title}
              category={category}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Footer Command */}
        <div
          className={`
          mt-12 transition-all duration-1000 ease-out delay-500
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          <div className="rounded-lg bg-black/30 backdrop-blur-xl border border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-green-400">$</span>
              <span className="text-gray-400">skills --list</span>
              <span className="text-white/60 ml-2">
                | Total: {categories.reduce((acc, cat) => acc + cat.skills.length, 0)} modules installed
              </span>
              <span className="inline-block w-2 h-4 bg-white/80 ml-1 terminal-cursor" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        /* Matrix Rain */
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .matrix-column {
          animation: matrix-fall linear infinite;
        }

        /* Terminal Cursor Blink */
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .terminal-cursor {
          animation: blink 1s step-end infinite;
        }

        /* Skill Chip Fade In */
        @keyframes skill-fade-in {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .skill-chip-wrapper {
          animation: skill-fade-in 0.4s ease-out forwards;
          opacity: 0;
        }

        /* Compile Animation */
        @keyframes compile-slide {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .compile-output {
          animation: compile-slide 0.3s ease-out;
        }

        /* Loading Dots */
        @keyframes loading-dot {
          0%,
          20% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .loading-dots span:nth-child(1) {
          animation: loading-dot 1.4s infinite;
        }
        .loading-dots span:nth-child(2) {
          animation: loading-dot 1.4s infinite 0.2s;
        }
        .loading-dots span:nth-child(3) {
          animation: loading-dot 1.4s infinite 0.4s;
        }

        /* Pulse Animations */
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow 8s ease-in-out infinite 4s;
        }

        /* Performance optimizations */
        .terminal-window,
        .skill-chip,
        .matrix-column {
          will-change: transform, opacity;
        }

        /* Smooth transforms */
        * {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </section>
  );
}