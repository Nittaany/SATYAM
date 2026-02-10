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

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  SiJavascript, SiPython, SiCplusplus, SiPhp,
  SiReact, SiHtml5, SiCss3, SiTailwindcss,
  SiBootstrap, SiMysql, SiGit, SiGithub,
  SiPostman, SiNetlify, SiVercel, SiReplit
} from "react-icons/si";
import { BiLogoFirebase, BiLogoJava } from "react-icons/bi";
import { TbBrandNextjs, TbBrandVscode } from "react-icons/tb";
import { Code2, Sparkles, Database, Wrench, Users, Zap } from "lucide-react";
import type { IconType } from "react-icons";

// ======================== DATA ========================

interface Skill {
  name: string;
  icon: IconType;
  category: string;
  color: string;
  level: number;
}

interface Category {
  name: string;
  icon: React.ElementType;
  gradient: string;
  description: string;
}

const categories: Category[] = [
  {
    name: "Languages",
    icon: Code2,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    description: "Core programming languages",
  },
  {
    name: "Frontend",
    icon: Sparkles,
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    description: "Modern UI/UX technologies",
  },
  {
    name: "Backend",
    icon: Database,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    description: "Server & database systems",
  },
  {
    name: "Tools",
    icon: Wrench,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    description: "Development workflow",
  },
  {
    name: "Soft Skills",
    icon: Users,
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    description: "Professional competencies",
  },
];

const skills: Skill[] = [
  // Languages
  { name: "JavaScript", icon: SiJavascript, category: "Languages", color: "#F7DF1E", level: 95 },
  { name: "Python", icon: SiPython, category: "Languages", color: "#3776AB", level: 85 },
  { name: "C/C++", icon: SiCplusplus, category: "Languages", color: "#00599C", level: 75 },
  { name: "PHP", icon: SiPhp, category: "Languages", color: "#777BB4", level: 80 },
  { name: "Java", icon: BiLogoJava, category: "Languages", color: "#007396", level: 70 },
  
  // Frontend
  { name: "Next.js", icon: TbBrandNextjs, category: "Frontend", color: "#000000", level: 95 },
  { name: "React", icon: SiReact, category: "Frontend", color: "#61DAFB", level: 95 },
  { name: "HTML5", icon: SiHtml5, category: "Frontend", color: "#E34F26", level: 95 },
  { name: "CSS3", icon: SiCss3, category: "Frontend", color: "#1572B6", level: 90 },
  { name: "Tailwind", icon: SiTailwindcss, category: "Frontend", color: "#06B6D4", level: 95 },
  { name: "Bootstrap", icon: SiBootstrap, category: "Frontend", color: "#7952B3", level: 85 },
  
  // Backend
  { name: "MySQL", icon: SiMysql, category: "Backend", color: "#4479A1", level: 80 },
  { name: "Firebase", icon: BiLogoFirebase, category: "Backend", color: "#FFCA28", level: 85 },
  
  // Tools
  { name: "Git", icon: SiGit, category: "Tools", color: "#F05032", level: 90 },
  { name: "GitHub", icon: SiGithub, category: "Tools", color: "#181717", level: 90 },
  { name: "VS Code", icon: TbBrandVscode, category: "Tools", color: "#007ACC", level: 95 },
  { name: "Postman", icon: SiPostman, category: "Tools", color: "#FF6C37", level: 85 },
  { name: "Netlify", icon: SiNetlify, category: "Tools", color: "#00C7B7", level: 85 },
  { name: "Vercel", icon: SiVercel, category: "Tools", color: "#000000", level: 90 },
  { name: "Replit", icon: SiReplit, category: "Tools", color: "#F26207", level: 80 },
];

const softSkills = [
  { name: "Leadership", level: 90 },
  { name: "Teamwork", level: 95 },
  { name: "Problem Solving", level: 95 },
  { name: "Adaptability", level: 90 },
];

// ======================== COMPONENTS ========================

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)` }}
      />
      
      {/* Card */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
              border: `1px solid ${skill.color}30`
            }}
          >
            <Icon className="w-6 h-6" style={{ color: skill.color }} />
          </div>
          
          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{skill.name}</p>
            
            {/* Level bar */}
            <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                  boxShadow: isHovered ? `0 0 10px ${skill.color}60` : 'none'
                }}
              />
            </div>
          </div>
          
          {/* Level percentage - shows on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0
            }}
            className="flex-shrink-0 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <span className="text-xs font-mono font-semibold" style={{ color: skill.color }}>
              {skill.level}%
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SoftSkillCard = ({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-medium">{skill.name}</h4>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className={`w-2 h-2 rounded-full ${
                  i < Math.round(skill.level / 20)
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, categorySkills, index }: { 
  category: Category; 
  categorySkills: Skill[]; 
  index: number;
}) => {
  const Icon = category.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-4"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
          <p className="text-sm text-gray-400">{category.description}</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="text-xs font-mono text-gray-400">{categorySkills.length} skills</span>
        </div>
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categorySkills.map((skill, idx) => (
          <SkillCard key={skill.name} skill={skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

// ======================== MAIN COMPONENT ========================

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCategories = activeCategory === "all" 
    ? categories.filter(cat => cat.name !== "Soft Skills")
    : categories.filter(cat => cat.name === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Animated background elements */}
      {mounted && !shouldReduceMotion && (
        <>
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob-pulse-1 opacity-40" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob-pulse-2 opacity-30" />
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
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/80">Tech Arsenal</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Skills & Expertise
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-mono">
            Building modern web experiences with cutting-edge technologies
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-white/10 border-2 border-white/30 text-white"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              All Skills
            </span>
            {activeCategory === "all" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
          
          {categories.filter(cat => cat.name !== "Soft Skills").map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-white/10 border-2 border-white/30 text-white"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {category.name}
                </span>
                {activeCategory === category.name && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-20 rounded-xl -z-10`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filteredCategories.map((category, index) => {
            const categorySkills = skills.filter(skill => skill.category === category.name);
            return (
              <CategorySection
                key={category.name}
                category={category}
                categorySkills={categorySkills}
                index={index}
              />
            );
          })}
        </div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Soft Skills</h3>
                  <p className="text-sm text-gray-400">Professional competencies that drive collaboration</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {softSkills.map((skill, index) => (
                  <SoftSkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Technologies", value: skills.length, gradient: "from-purple-500 to-pink-500" },
            { label: "Years Experience", value: "3+", gradient: "from-cyan-500 to-blue-500" },
            { label: "Projects Built", value: "50+", gradient: "from-green-500 to-emerald-500" },
            { label: "Lines of Code", value: "100K+", gradient: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
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
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
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