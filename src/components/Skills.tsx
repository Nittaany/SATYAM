// "use client";

// import React, { useMemo, useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   type MotionValue,
// } from "framer-motion";
// import { Sparkles, Rocket, Database, Wrench, Handshake } from "lucide-react";

// // ------------------------
// // Data
// // ------------------------
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

// // ------------------------
// // Utilities (stable seeded offsets)
// // ------------------------
// function hashSeed(str: string): number {
//   // FNV-1a-ish 32-bit
//   let h = 2166136261;
//   for (let i = 0; i < str.length; i++) {
//     h ^= str.charCodeAt(i);
//     h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
//   }
//   // ensure positive uint32
//   return (h >>> 0);
// }

// function seededOffset(label: string) {
//   const h = hashSeed(label);
//   // deterministic pseudo-randoms in [-1, 1]
//   const rx = ((h & 0xff) / 127.5) - 1;          // -1..1
//   const ry = (((h >> 8) & 0xff) / 127.5) - 1;   // -1..1
//   const rotUnit = (((h >> 16) & 0xff) / 127.5) - 1; // -1..1

//   const dist = 140 + ((h >> 24) & 0xff) * 0.6;  // ~140..292
//   const x = rx * dist;
//   const y = ry * (dist * 0.6);                  // constrain Y a bit
//   const rot = rotUnit * 28;                     // -28..28 deg

//   return { x, y, rot };
// }

// // ------------------------
// // Chip
// // ------------------------
// function SkillChip({
//   label,
//   progress,
//   animStart = 0,
//   animEnd = 0.5, // finish early so chips are settled while still in view
// }: {
//   label: string;
//   progress: MotionValue<number>;
//   animStart?: number;
//   animEnd?: number;
// }) {
//   const { x, y, rot } = useMemo(() => seededOffset(label), [label]);

//   // map per-row progress to chip transforms
//   const translateX = useTransform(progress, [animStart, animEnd], [x/1.2, 0]);
//   const translateY = useTransform(progress, [animStart, animEnd], [y/1.2, 0]);
//   const rotate = useTransform(progress, [animStart, animEnd], [rot, 0]);
//   const scale = useTransform(progress, [animStart, animEnd], [0.82, 1]);
//   const blur = useTransform(progress, [animStart, animEnd], [6, 0]);
//   const opacity = useTransform(progress, [animStart, animEnd * 0.85], [0, 1]);
//   const blurFilter = useTransform(blur, (b: number) => `blur(${b}px)`);

//   return (
//     <motion.span
//       style={{ translateX, translateY, rotate, scale, filter: blurFilter, opacity }}
//       whileHover={{ y: -4, scale: 1.03 }}
//       whileTap={{ scale: 0.98 }}
//       className="select-none rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
//       aria-label={label}
//     >
//       {label}
//     </motion.span>
//   );
// }

// // ------------------------
// // Category card (its own scroll progress)
// // ------------------------
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

//   // Per-row scroll progress — triggers when the row is visible
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 80%", "end 25%"], // tighter window → faster settle
//   });

//   // subtle card motion
//   const parallax = useTransform(scrollYProgress, [0, 1], [index * 6, 0]);
//   const lift = useTransform(scrollYProgress, [0, 1], [2, -2]);
//   const glow = useTransform(scrollYProgress, [0, 1], [0.18, 0.6]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y: parallax }}
//       className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl"
//     >
//       {/* glow */}
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

// // ------------------------
// // Ambient background
// // ------------------------
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

// // ------------------------
// // Main
// // ------------------------
// export default function Skills() {
//   // Optional: section-level entrance (separate from per-row)
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start 85%", "end 30%"],
//   });

//   const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
//   const sectionY = useTransform(scrollYProgress, [0, 0.2], [24, 0]);

//   return (
//     <section ref={sectionRef} className="relative mx-auto max-w-6xl px-4 py-20">
//       <motion.div style={{ opacity: sectionOpacity, y: sectionY }}>
//         <header className="mb-10 flex items-end justify-between gap-6">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight text-white">Skills & Tech I Use</h2>
//             <p className="mt-2 max-w-prose text-white/70">
//               As you scroll, each skill flies in and locks into its place — categorized and ready for action.
//             </p>
//           </div>
//           <div className="hidden sm:block rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur">
//             Auto-animated · Scroll reactive · Accessible
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
// // ------------------------

"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Sparkles, Rocket, Database, Wrench, Handshake } from "lucide-react";

// ------------------------
// Data
// ------------------------
const categories: { title: string; icon: React.ReactNode; skills: string[] }[] = [
  {
    title: "Programming Languages",
    icon: <Rocket className="w-5 h-5" aria-hidden />,
    skills: ["JavaScript", "Python", "C/C++", "PHP", "Java"],
  },
  {
    title: "Web Development",
    icon: <Sparkles className="w-5 h-5" aria-hidden />,
    skills: [
      "Next.js",
      "React.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Firebase",
    ],
  },
  {
    title: "Database Technologies",
    icon: <Database className="w-5 h-5" aria-hidden />,
    skills: ["MySQL", "Firebase Realtime DB"],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-5 h-5" aria-hidden />,
    skills: ["Git", "GitHub", "VS Code", "Postman", "Botpress", "Netlify", "Vercel", "Replit"],
  },
  {
    title: "Soft Skills",
    icon: <Handshake className="w-5 h-5" aria-hidden />,
    skills: ["Leadership", "Teamwork", "Problem-Solving", "Adaptability"],
  },
];

// ------------------------
// Utilities
// ------------------------
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0);
}

function seededOffset(label: string) {
  const h = hashSeed(label);
  const rx = ((h & 0xff) / 127.5) - 1;
  const ry = (((h >> 8) & 0xff) / 127.5) - 1;
  const rotUnit = (((h >> 16) & 0xff) / 127.5) - 1;

  const dist = 140 + ((h >> 24) & 0xff) * 0.6;
  const x = rx * dist;
  const y = ry * (dist * 0.6);
  const rot = rotUnit * 28;

  return { x, y, rot };
}

// ------------------------
// Chip
// ------------------------
function SkillChip({
  label,
  progress,
  animStart = 0,
  animEnd = 0.5,
}: {
  label: string;
  progress: MotionValue<number>;
  animStart?: number;
  animEnd?: number;
}) {
  const { x, y, rot } = useMemo(() => seededOffset(label), [label]);

  // Original transforms
  const translateX = useTransform(progress, [animStart, animEnd], [x / 1.2, 0]);
  const translateY = useTransform(progress, [animStart, animEnd], [y / 1.2, 0]);
  const rotate = useTransform(progress, [animStart, animEnd], [rot, 0]);
  const scale = useTransform(progress, [animStart, animEnd], [0.82, 1]);
  const blur = useTransform(progress, [animStart, animEnd], [6, 0]);
  const opacity = useTransform(progress, [animStart, animEnd * 0.85], [0, 1]);

  // Smooth everything with springs
  const springConfig = { stiffness: 260, damping: 26 };
  const springX = useSpring(translateX, springConfig);
  const springY = useSpring(translateY, springConfig);
  const springRotate = useSpring(rotate, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springOpacity = useSpring(opacity, springConfig);
  const springBlur = useSpring(blur, springConfig);

  const blurFilter = useTransform(springBlur, (b: number) => `blur(${b}px)`);

  return (
    <motion.span
      style={{
        translateX: springX,
        translateY: springY,
        rotate: springRotate,
        scale: springScale,
        filter: blurFilter,
        opacity: springOpacity,
      }}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="select-none rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
      aria-label={label}
    >
      {label}
    </motion.span>
  );
}

// ------------------------
// Category card
// ------------------------
function CategoryCard({
  title,
  icon,
  skills,
  index,
}: {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 25%"],
  });

  const parallax = useTransform(scrollYProgress, [0, 1], [index * 6, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [2, -2]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.18, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ y: parallax }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl"
    >
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute -inset-24 -z-10 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(168,85,247,0.16),rgba(59,130,246,0.16),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <motion.header style={{ y: lift }} className="mb-4 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10 shadow-inner">
          {icon}
        </span>
        <h3 className="text-base font-semibold tracking-wide text-white/90">{title}</h3>
      </motion.header>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <SkillChip key={s} label={s} progress={scrollYProgress} />
        ))}
      </div>
    </motion.div>
  );
}

// ------------------------
// Ambient background
// ------------------------
function AmbientBG({ progress }: { progress: MotionValue<number> }) {
  const skew = useTransform(progress, [0, 1], [4, 0]);
  const opacity = useTransform(progress, [0, 1], [0.4, 0.15]);
  return (
    <motion.div
      aria-hidden
      style={{ skewY: skew, opacity }}
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </motion.div>
  );
}

// ------------------------
// Main
// ------------------------
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.2], [24, 0]);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-6xl px-4 py-20">
      <motion.div style={{ opacity: sectionOpacity, y: sectionY }}>
        <header className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Skills & Tech I Use</h2>
            <p className="mt-2 max-w-prose text-white/70">
              As you scroll, each skill flies in and locks into its place — categorized and ready for action.
            </p>
          </div>
          <div className="hidden sm:block rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur">
            Auto-animated · Scroll reactive · Accessible
          </div>
        </header>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              icon={cat.icon}
              skills={cat.skills}
              index={i}
            />
          ))}
        </div>
      </motion.div>
      <AmbientBG progress={scrollYProgress} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-cyan-500/10 via-purple-500/10 to-transparent blur-2xl" />
    </section>
  );
}
