'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data for your projects
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A web application for task management with a sleek UI. Built with Next.js, this project leverages server-side rendering for improved performance and SEO, and is styled with a custom, component-based Tailwind CSS approach.',
    image: '/images/project-1.jpg',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'An IoT dashboard for monitoring smart home devices. It features real-time data visualization and an intuitive interface for controlling connected devices, utilizing a robust backend with Three.js for 3D data representation.',
    image: '/images/project-2.jpg',
    tech: ['Python', 'Django', 'Three.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'A mobile app for social media content creation. This app provides users with unique filters and a streamlined editing process, built with a focus on a fluid user experience and offline capabilities using React Native and Firebase.',
    image: '/images/project-3.jpg',
    tech: ['React Native', 'Firebase', 'Expo'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'An AI-powered recommendation engine for movies. The model is trained on a large dataset of user preferences and movie features, providing personalized suggestions with high accuracy. The front-end is a clean, modern interface for a great user experience.',
    image: '/images/project-4.jpg',
    tech: ['Python', 'TensorFlow', 'Flask', 'Pandas'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -15, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const expandedVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const selectedProject = projects.find((project) => project.id === selectedId);

  return (
    <section id="projects" className="w-full min-h-screen py-20 overflow-hidden text-white relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <motion.h2
          className="text-center text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          My Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] transform hover:-rotate-1"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                boxShadow: "0 10px 25px rgba(255, 105, 180, 0.4), 0 0 40px rgba(171, 95, 230, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Project Image */}
              <div className="relative w-full h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2 py-1 rounded-full bg-electric-blue/20 text-electric-blue border border-electric-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            layoutId={`card-container-${selectedId}`}
            className="fixed inset-0 z-[100] p-4 flex items-center justify-center bg-black/80 backdrop-blur-lg"
            variants={expandedVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-y-auto">
              <motion.button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="relative w-full h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </div>

              <motion.div className="p-8">
                <motion.h3
                  className="text-3xl md:text-4xl font-bold font-montserrat mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple"
                >
                  {selectedProject.title}
                </motion.h3>
                <motion.p className="text-gray-300 text-lg mb-6">{selectedProject.description}</motion.p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-electric-blue/20 text-electric-blue border border-electric-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href={selectedProject.liveUrl} className="px-6 py-3 text-lg font-semibold text-white rounded-full transition-all duration-300 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple">
                    View Live
                  </Link>
                  <Link href={selectedProject.githubUrl} className="px-6 py-3 text-lg font-semibold text-white rounded-full transition-all duration-300 border border-white/30 hover:border-white hover:bg-white/10">
                    GitHub
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
