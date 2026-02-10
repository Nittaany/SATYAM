"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  SiJavascript, SiPython, SiCplusplus, SiPhp,
  SiReact, SiHtml5, SiCss3, SiTailwindcss,
  SiBootstrap, SiMysql, SiGit, SiGithub,
  SiPostman, SiNetlify, SiVercel, SiReplit, SiNodedotjs
} from "react-icons/si";
import { BiLogoFirebase, BiLogoJava } from "react-icons/bi";
import { TbBrandNextjs, TbBrandVscode } from "react-icons/tb";
import { Code2, Sparkles, Database, Wrench, Users, Zap } from "lucide-react";
import type { IconType } from "react-icons";

// ======================== DATA ========================

interface Skill {
  name: string;
  icon: IconType;
  color: string;
  orbitRadius: number; // Distance from center
  orbitSpeed: number; // Speed of rotation
  size: number; // Icon size
}

interface Category {
  name: string;
  icon: React.ElementType;
  gradient: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    name: "Languages",
    icon: Code2,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", orbitRadius: 120, orbitSpeed: 20, size: 40 },
      { name: "Python", icon: SiPython, color: "#3776AB", orbitRadius: 160, orbitSpeed: 25, size: 38 },
      { name: "C/C++", icon: SiCplusplus, color: "#00599C", orbitRadius: 140, orbitSpeed: 30, size: 36 },
      { name: "PHP", icon: SiPhp, color: "#777BB4", orbitRadius: 180, orbitSpeed: 22, size: 35 },
      { name: "Java", icon: BiLogoJava, color: "#007396", orbitRadius: 200, orbitSpeed: 28, size: 42 },
    ],
  },
  {
    name: "Frontend",
    icon: Sparkles,
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    skills: [
      { name: "Next.js", icon: TbBrandNextjs, color: "#FFFFFF", orbitRadius: 130, orbitSpeed: 18, size: 40 },
      { name: "React", icon: SiReact, color: "#61DAFB", orbitRadius: 110, orbitSpeed: 20, size: 42 },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26", orbitRadius: 170, orbitSpeed: 25, size: 36 },
      { name: "CSS3", icon: SiCss3, color: "#1572B6", orbitRadius: 150, orbitSpeed: 22, size: 38 },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", orbitRadius: 190, orbitSpeed: 28, size: 35 },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", orbitRadius: 210, orbitSpeed: 30, size: 34 },
    ],
  },
  {
    name: "Backend",
    icon: Database,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", orbitRadius: 140, orbitSpeed: 22, size: 40 },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", orbitRadius: 180, orbitSpeed: 28, size: 42 },
      { name: "Firebase", icon: BiLogoFirebase, color: "#FFCA28", orbitRadius: 160, orbitSpeed: 25, size: 38 },
    ],
  },
  {
    name: "Tools",
    icon: Wrench,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", orbitRadius: 120, orbitSpeed: 20, size: 38 },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF", orbitRadius: 150, orbitSpeed: 24, size: 40 },
      { name: "VS Code", icon: TbBrandVscode, color: "#007ACC", orbitRadius: 110, orbitSpeed: 18, size: 42 },
      { name: "Postman", icon: SiPostman, color: "#FF6C37", orbitRadius: 180, orbitSpeed: 28, size: 36 },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7", orbitRadius: 200, orbitSpeed: 30, size: 35 },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF", orbitRadius: 170, orbitSpeed: 26, size: 37 },
      { name: "Replit", icon: SiReplit, color: "#F26207", orbitRadius: 140, orbitSpeed: 22, size: 36 },
    ],
  },
  {
    name: "Soft Skills",
    icon: Users,
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    skills: [
      { name: "Leadership", icon: Users, color: "#FFD700", orbitRadius: 130, orbitSpeed: 20, size: 36 },
      { name: "Teamwork", icon: Users, color: "#FF6B6B", orbitRadius: 160, orbitSpeed: 25, size: 38 },
      { name: "Problem Solving", icon: Users, color: "#4ECDC4", orbitRadius: 190, orbitSpeed: 28, size: 34 },
      { name: "Adaptability", icon: Users, color: "#95E1D3", orbitRadius: 150, orbitSpeed: 22, size: 36 },
    ],
  },
];

// ======================== COMPONENTS ========================

const OrbitingSkill = ({ 
  skill, 
  index, 
  totalSkills,
  isPaused 
}: { 
  skill: Skill; 
  index: number;
  totalSkills: number;
  isPaused: boolean;
}) => {
  const Icon = skill.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate initial angle offset to distribute skills evenly
  const initialAngle = (360 / totalSkills) * index;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: skill.orbitRadius * 2,
        height: skill.orbitRadius * 2,
        marginLeft: -skill.orbitRadius,
        marginTop: -skill.orbitRadius,
      }}
      animate={{
        rotate: isPaused ? initialAngle : 360 + initialAngle,
      }}
      transition={{
        duration: skill.orbitSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Orbit path visualization (only shows on hover of category) */}
      <div className="absolute inset-0 rounded-full border border-white/5" />
      
      {/* Skill Icon */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.2, zIndex: 50 }}
        animate={{
          rotate: isPaused ? -initialAngle : -(360 + initialAngle),
        }}
        transition={{
          rotate: {
            duration: skill.orbitSpeed,
            repeat: Infinity,
            ease: "linear",
          },
          scale: { duration: 0.2 },
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{ backgroundColor: skill.color }}
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Icon container */}
        <div
          className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
          style={{
            width: skill.size,
            height: skill.size,
            boxShadow: isHovered ? `0 0 30px ${skill.color}60` : 'none',
          }}
        >
          <Icon 
            className="w-2/3 h-2/3" 
            style={{ color: skill.color }}
          />
        </div>
        
        {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/20 pointer-events-none"
          >
            <span className="text-xs font-medium text-white">{skill.name}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const SolarSystem = ({ 
  category, 
  index 
}: { 
  category: Category; 
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const Icon = category.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex items-center justify-center"
      style={{ minHeight: "500px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.gradient} blur-3xl`}
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Orbiting skills */}
      <div className="relative w-full h-full flex items-center justify-center">
        {category.skills.map((skill, idx) => (
          <OrbitingSkill
            key={skill.name}
            skill={skill}
            index={idx}
            totalSkills={category.skills.length}
            isPaused={isPaused}
          />
        ))}
        
        {/* Center Sun/Category */}
        <motion.button
          onClick={() => setIsPaused(!isPaused)}
          className="relative z-10 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer ring */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.gradient} blur-md`}
            animate={{
              scale: isHovered ? 1.3 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Main circle */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-2xl border-2 border-white/20 flex flex-col items-center justify-center shadow-2xl">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg mb-2`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-sm">{category.name}</span>
            <span className="text-white/40 text-xs">{category.skills.length} skills</span>
          </div>
          
          {/* Pulse ring */}
          {!isPaused && (
            <motion.div
              className={`absolute inset-0 rounded-full border-2`}
              style={{ borderColor: `${category.gradient.split(' ')[1]}40` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          
          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 font-mono">
              ⏸ paused
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

// ======================== MAIN COMPONENT ========================

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Animated background elements */}
      {mounted && !shouldReduceMotion && (
        <>
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob-pulse-1" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob-pulse-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl opacity-20" />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/80">Tech Solar System</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Skills Universe
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-mono mb-4">
            Technologies orbiting in perfect harmony
          </p>
          
          {/* Instruction */}
          <p className="text-sm text-gray-500 font-mono">
            <span className="text-purple-400">// </span>
            Hover over skills • Click center to pause
          </p>
        </motion.div>

        {/* Solar Systems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((category, index) => (
            <SolarSystem
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Technologies", value: "20+", icon: Code2, gradient: "from-purple-500 to-pink-500" },
            { label: "Categories", value: "5", icon: Sparkles, gradient: "from-cyan-500 to-blue-500" },
            { label: "Projects", value: "50+", icon: Zap, gradient: "from-green-500 to-emerald-500" },
            { label: "Coffee Cups", value: "∞", icon: Database, gradient: "from-orange-500 to-red-500" },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-colors">
                  <StatIcon className={`w-6 h-6 mx-auto mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob-pulse-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.1) translate(10px, -10px); opacity: 0.6; }
        }
        @keyframes blob-pulse-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1.15) translate(-15px, 10px); opacity: 0.5; }
        }
        .animate-blob-pulse-1 {
          animation: blob-pulse-1 8s ease-in-out infinite;
        }
        .animate-blob-pulse-2 {
          animation: blob-pulse-2 10s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
}

// "use client";

// import React, { useEffect, useRef, useState, useMemo } from "react";
// import {
//   Sparkles,
//   Rocket,
//   Database,
//   Wrench,
//   Handshake,
//   Terminal,
//   Zap,
// } from "lucide-react";

// // ======================== DATA ========================

// const categories = [
//   {
//     title: "Programming Languages",
//     icon: Rocket,
//     skills: ["JavaScript", "Python", "C/C++", "PHP", "Java"],
//     color: "from-purple-500 to-pink-500",
//     terminalColor: "text-purple-400",
//   },
//   {
//     title: "Web Development",
//     icon: Sparkles,
//     skills: [
//       "Next.js",
//       "React.js",
//       "HTML",
//       "CSS",
//       "Tailwind CSS",
//       "Bootstrap",
//       "Firebase",
//     ],
//     color: "from-cyan-500 to-blue-500",
//     terminalColor: "text-cyan-400",
//   },
//   {
//     title: "Database Technologies",
//     icon: Database,
//     skills: ["MySQL", "Firebase Realtime DB"],
//     color: "from-green-500 to-emerald-500",
//     terminalColor: "text-green-400",
//   },
//   {
//     title: "Tools & Platforms",
//     icon: Wrench,
//     skills: [
//       "Git",
//       "GitHub",
//       "VS Code",
//       "Postman",
//       "Botpress",
//       "Netlify",
//       "Vercel",
//       "Replit",
//     ],
//     color: "from-orange-500 to-red-500",
//     terminalColor: "text-orange-400",
//   },
//   {
//     title: "Soft Skills",
//     icon: Handshake,
//     skills: ["Leadership", "Teamwork", "Problem-Solving", "Adaptability"],
//     color: "from-pink-500 to-rose-500",
//     terminalColor: "text-pink-400",
//   },
// ];

// // ======================== MATRIX BACKGROUND ========================

// const MatrixRain: React.FC = React.memo(() => {
//   const columns = 30;
//   const chars = "01アイウエオカキクケコサシスセソ";

//   return (
//     <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
//       {Array.from({ length: columns }).map((_, i) => (
//         <div
//           key={i}
//           className="matrix-column absolute top-0 text-green-400 font-mono text-xs"
//           style={{
//             left: `${(i / columns) * 100}%`,
//             animationDelay: `${Math.random() * 5}s`,
//             animationDuration: `${10 + Math.random() * 10}s`,
//           }}
//         >
//           {Array.from({ length: 20 }).map((_, j) => (
//             <div key={j} className="opacity-50">
//               {chars[Math.floor(Math.random() * chars.length)]}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// });
// MatrixRain.displayName = "MatrixRain";

// // ======================== SKILL CHIP ========================

// interface SkillChipProps {
//   skill: string;
//   index: number;
//   categoryColor: string;
// }

// const SkillChip: React.FC<SkillChipProps> = React.memo(
//   ({ skill, index, categoryColor }) => {
//     return (
//       <div
//         className="skill-chip-wrapper"
//         style={{ animationDelay: `${index * 0.08}s` }}
//       >
//         <div className="group relative">
//           <div
//             className={`
//             skill-chip
//             relative px-3 py-1.5 rounded-md
//             bg-black/40 border border-white/10
//             font-mono text-sm text-white/90
//             transition-all duration-300
//             hover:border-white/30 hover:bg-black/60
//             hover:scale-105 hover:-translate-y-0.5
//             cursor-default
//             backdrop-blur-sm
//           `}
//           >
//             <span className="relative z-10">{skill}</span>
            
//             {/* Glow on hover */}
//             <div
//               className={`
//               absolute inset-0 rounded-md opacity-0 group-hover:opacity-100
//               bg-gradient-to-r ${categoryColor}
//               blur-md -z-10 transition-opacity duration-300
//             `}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );
// SkillChip.displayName = "SkillChip";

// // ======================== TERMINAL WINDOW ========================

// interface TerminalWindowProps {
//   category: typeof categories[0];
//   index: number;
//   isVisible: boolean;
// }

// const TerminalWindow: React.FC<TerminalWindowProps> = React.memo(
//   ({ category, index, isVisible }) => {
//     const [compiled, setCompiled] = useState(false);
//     const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
//     const Icon = category.icon;

//     useEffect(() => {
//       if (!isVisible) return;

//       // Trigger compile animation
//       const compileTimer = setTimeout(() => {
//         setCompiled(true);
//       }, 300 + index * 150);

//       return () => clearTimeout(compileTimer);
//     }, [isVisible, index]);

//     useEffect(() => {
//       if (!compiled) return;

//       // Stagger skill appearance
//       if (currentSkillIndex < category.skills.length) {
//         const timer = setTimeout(() => {
//           setCurrentSkillIndex((prev) => prev + 1);
//         }, 100);
//         return () => clearTimeout(timer);
//       }
//     }, [compiled, currentSkillIndex, category.skills.length]);

//     return (
//       <div
//         className={`
//         terminal-window
//         relative rounded-lg overflow-hidden
//         bg-black/30 backdrop-blur-xl
//         border border-white/10
//         transition-all duration-700 ease-out
//         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//       `}
//         style={{
//           transitionDelay: `${index * 100}ms`,
//         }}
//       >
//         {/* Terminal Header */}
//         <div className="terminal-header flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10">
//           <div className="flex items-center gap-2">
//             <div className="flex gap-1.5">
//               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
//               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
//               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
//             </div>
//           </div>
//           <code className="text-xs text-gray-500 font-mono">
//             {category.title.toLowerCase().replace(/\s+/g, "_")}.tsx
//           </code>
//           <div className="w-16" />
//         </div>

//         {/* Terminal Content */}
//         <div className="p-5 space-y-3">
//           {/* Command Line */}
//           <div className="flex items-center gap-2 font-mono text-sm">
//             <Icon className={`w-4 h-4 ${category.terminalColor}`} />
//             <span className="text-green-400">$</span>
//             <span className="text-gray-400">npm install</span>
//             <span className={category.terminalColor}>{category.title}</span>
//             {!compiled && (
//               <span className="inline-block w-2 h-4 bg-white/80 ml-1 terminal-cursor" />
//             )}
//           </div>

//           {/* Compile Output */}
//           {compiled && (
//             <div className="compile-output space-y-1.5">
//               <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
//                 <Zap className="w-3 h-3 text-yellow-400" />
//                 <span>Compiling...</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs font-mono text-green-400">
//                 <span>✓</span>
//                 <span>Compiled successfully in {(Math.random() * 2 + 1).toFixed(2)}s</span>
//               </div>
//             </div>
//           )}

//           {/* Skills Grid */}
//           <div className="skills-grid flex flex-wrap gap-2 pt-2">
//             {category.skills.slice(0, currentSkillIndex).map((skill, idx) => (
//               <SkillChip
//                 key={skill}
//                 skill={skill}
//                 index={idx}
//                 categoryColor={category.color}
//               />
//             ))}
//           </div>

//           {/* Loading indicator during compilation */}
//           {compiled && currentSkillIndex < category.skills.length && (
//             <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
//               <div className="loading-dots">
//                 <span>.</span>
//                 <span>.</span>
//                 <span>.</span>
//               </div>
//               <span>Loading modules...</span>
//             </div>
//           )}
//         </div>

//         {/* Gradient border glow */}
//         <div
//           className={`
//           absolute inset-0 rounded-lg opacity-0 hover:opacity-100
//           bg-gradient-to-r ${category.color}
//           blur-xl -z-10 transition-opacity duration-500
//         `}
//         />
//       </div>
//     );
//   }
// );
// TerminalWindow.displayName = "TerminalWindow";

// // ======================== MAIN COMPONENT ========================

// export default function Skills() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   // Intersection Observer for scroll trigger
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "50px",
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       id="skills"
//       ref={sectionRef}
//       className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
//     >
//       {/* Matrix Background */}
//       <MatrixRain />

//       {/* Grid Pattern */}
//       <div
//         className="absolute inset-0 opacity-[0.02] pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
//           `,
//           backgroundSize: "50px 50px",
//         }}
//       />

//       {/* Gradient Orbs */}
//       <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow-delayed" />

//       {/* Content Container */}
//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* Header */}
//         <div
//           className={`
//           mb-12 transition-all duration-1000 ease-out
//           ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//         `}
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <Terminal className="w-8 h-8 text-green-400" />
//             <div className="flex items-center gap-2 font-mono text-sm text-gray-500">
//               <span className="text-green-400">~/portfolio</span>
//               <span>/</span>
//               <span className="text-purple-400">skills</span>
//             </div>
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
//             <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
//               Tech Stack
//             </span>
//           </h2>

//           <p className="text-gray-400 font-mono text-sm max-w-2xl">
//             <span className="text-gray-600">||</span>
//             Compiling skills and dependencies...
//           </p>
//         </div>

//         {/* Terminal Windows Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {categories.map((category, index) => (
//             <TerminalWindow
//               key={category.title}
//               category={category}
//               index={index}
//               isVisible={isVisible}
//             />
//           ))}
//         </div>

//         {/* Footer Command */}
//         <div
//           className={`
//           mt-12 transition-all duration-1000 ease-out delay-500
//           ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//         `}
//         >
//           <div className="rounded-lg bg-black/30 backdrop-blur-xl border border-white/10 px-4 py-3">
//             <div className="flex items-center gap-2 font-mono text-sm">
//               <span className="text-green-400">$</span>
//               <span className="text-gray-400">skills --list</span>
//               <span className="text-white/60 ml-2">
//                 | Total: {categories.reduce((acc, cat) => acc + cat.skills.length, 0)} modules installed
//               </span>
//               <span className="inline-block w-2 h-4 bg-white/80 ml-1 terminal-cursor" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         /* Matrix Rain */
//         @keyframes matrix-fall {
//           0% {
//             transform: translateY(-100%);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100vh);
//             opacity: 0;
//           }
//         }

//         .matrix-column {
//           animation: matrix-fall linear infinite;
//         }

//         /* Terminal Cursor Blink */
//         @keyframes blink {
//           0%,
//           50% {
//             opacity: 1;
//           }
//           51%,
//           100% {
//             opacity: 0;
//           }
//         }

//         .terminal-cursor {
//           animation: blink 1s step-end infinite;
//         }

//         /* Skill Chip Fade In */
//         @keyframes skill-fade-in {
//           0% {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .skill-chip-wrapper {
//           animation: skill-fade-in 0.4s ease-out forwards;
//           opacity: 0;
//         }

//         /* Compile Animation */
//         @keyframes compile-slide {
//           0% {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .compile-output {
//           animation: compile-slide 0.3s ease-out;
//         }

//         /* Loading Dots */
//         @keyframes loading-dot {
//           0%,
//           20% {
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             opacity: 0;
//           }
//         }

//         .loading-dots span:nth-child(1) {
//           animation: loading-dot 1.4s infinite;
//         }
//         .loading-dots span:nth-child(2) {
//           animation: loading-dot 1.4s infinite 0.2s;
//         }
//         .loading-dots span:nth-child(3) {
//           animation: loading-dot 1.4s infinite 0.4s;
//         }

//         /* Pulse Animations */
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 0.3;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.5;
//             transform: scale(1.05);
//           }
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 8s ease-in-out infinite;
//         }

//         .animate-pulse-slow-delayed {
//           animation: pulse-slow 8s ease-in-out infinite 4s;
//         }

//         /* Performance optimizations */
//         .terminal-window,
//         .skill-chip,
//         .matrix-column {
//           will-change: transform, opacity;
//         }

//         /* Smooth transforms */
//         * {
//           transform: translate3d(0, 0, 0);
//         }
//       `}</style>
//     </section>
//   );
// }