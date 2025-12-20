'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Terminal, Award, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
  logo: string;
  credentialUrl?: string;
}

interface ConsoleCommand {
  command: string;
  output: string | ReactNode;
  type: 'success' | 'info' | 'warning' | 'error';
}

const profileImages = [
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/photo.jpg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/vs.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/group.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/ISA.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/abc.jpg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/apollo.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/ctech00.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/ultron.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/aaruush.jpg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/rNepal.jpeg',
  'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/ctech.jpeg'
];

const certificates: Certificate[] = [
  {
    id: 'Oracle',
    title: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle',
    logo: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/oracleFA-logo.png',
    image: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/OFA.png',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DC20044A811377F383050F00CFD2B25E83908AC5DD1EF0C1F9FB4406C4824495'
  },
  {
    id: 'AWS',
    title: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS',
    logo: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/awsML-logo.png',
    image: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/ML.png',
    credentialUrl: 'https://www.credly.com/badges/7f79acd9-cd98-43e3-9dda-be64dde688da/public_url'
  },
  {
    id: 'Cisco',
    title: 'Cisco Networking Basics',
    issuer: 'Cisco',
    logo: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/ciscoNB-logo.png',
    image: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/NB.png',
    credentialUrl: 'https://www.credly.com/badges/e1db1d55-0387-4127-b04e-896718586e8f/public_url'
  },
  {
    id: 'Cisco',
    title: 'Ethical Hacker',
    issuer: 'Cisco',
    logo: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/EH-logo.jpg',
    image: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/EH.png',
    credentialUrl: 'https://www.credly.com/badges/53ab07f5-eeff-4c01-95b2-80448aca61c1/public_url'
  },
  {
    id: 'NPTEL',
    title: 'NPTEL - Communication Networks',
    issuer: 'NPTEL',
    logo: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/nptelCN-logo.png',
    image: 'https://sdvpl1b3ic9gmobr.public.blob.vercel-storage.com/public/images/NPTEL.png',
    credentialUrl: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/117/noc25-ee12/Course/NPTEL25EE12S24330345804507064.pdf'
  }
  
];

// Memoized to prevent re-creation on every render
const preDefinedCommands: { [key: string]: ConsoleCommand } = {
  'motivate': {
    command: 'motivate',
    output: '"Keep coding until the keyboard begs for mercy ⚡"',
    type: 'success'
  },
  'meme': {
    command: 'meme',
    output: '404: Too many tabs open 🤯',
    type: 'warning'
  },
  'status': {
    command: 'status',
    output: '99% debugging, 1% coding',
    type: 'info'
  },
  'coffee': {
    command: 'coffee',
    output: '☕ Coffee ready! [████████████████████] 100%',
    type: 'success'
  },
  'ping portfolio.site': {
    command: 'ping portfolio.site',
    output: 'Reply from localhost: time=0ms',
    type: 'success'
  },
  'run motivation.exe': {
    command: 'run motivation.exe',
    output: '"Keep coding until the keyboard begs for mercy ⚡"',
    type: 'success'
  },
  'open memes/': {
    command: 'open memes/',
    output: '404: Too many tabs open 🤯',
    type: 'warning'
  },
  'launch creativity --force': {
    command: 'launch creativity --force',
    output: '🚀 Idea deployed successfully!',
    type: 'success'
  }
};

const AboutMe = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [consoleHistory, setConsoleHistory] = useState<ConsoleCommand[]>([
    { command: 'whoami', output: 'sat_dev@portfolio:~$ Ready to explore!', type: 'info' }
  ]);
  const [consoleInput, setConsoleInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  
  // Track which images have loaded (for shimmer effect only)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // CRITICAL FIX: Carousel autoplay is completely independent of image loading
  // This ensures the carousel never gets stuck waiting for slow images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []); // No dependencies - runs forever, never blocked

  // Auto-scroll console to bottom when new commands appear
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  // Demo commands - runs periodically to show interactivity
  useEffect(() => {
    const demoCommands = ['ping portfolio.site', 'run motivation.exe', 'open memes/', 'launch creativity --force'];
    let commandIndex = 0;

    const runDemo = () => {
      const command = demoCommands[commandIndex];
      const result = preDefinedCommands[command];
      
      if (result) {
        setIsTyping(true);
        setTimeout(() => {
          setConsoleHistory(prev => [...prev, result]);
          setIsTyping(false);
          commandIndex = (commandIndex + 1) % demoCommands.length;
        }, 1500);
      }
    };

    const demoInterval = setInterval(runDemo, 8000);
    return () => clearInterval(demoInterval);
  }, []);

  // ESC key closes drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isDrawerOpen]);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleConsoleSubmit = useCallback((e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const command = consoleInput.trim().toLowerCase();
    const result = preDefinedCommands[command];

    if (result) {
      setConsoleHistory(prev => [...prev, result]);
    } else {
      setConsoleHistory(prev => [...prev, {
        command: consoleInput,
        output: `Command not found: ${consoleInput}. Try 'motivate', 'meme', 'status', or 'coffee'`,
        type: 'error'
      }]);
    }
    
    setConsoleInput('');
  }, [consoleInput]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  // Check if current image has loaded (for shimmer display only)
  const currentImageLoaded = loadedImages.has(currentImageIndex);

  return (
    <>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
      
      <section id="aboutme" className="relative min-h-screen py-20 overflow-hidden">
      {/* Static gradient background - no animations to save GPU */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Terminal Header - entry animation only */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 font-mono">
            <div className="flex items-center gap-2 text-green-400 text-lg">
              <Terminal className="w-3 h-7 lg:w-5 lg:h-5" />
              <span>Satyam-portfolio:~$</span>
              <span className="text-white">./whoami</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Story & Console */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Personal Story */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white font-mono relative">
                  <span className="text-purple-400">|-|</span> Not Another Boring Bio
                </h3>
                <span className="text-gray-400 text-xs mt-1 font-mono">
                  In Short (Because You&apos;re Busy)
                </span>
              </div>

              <div className="text-gray-300 space-y-3 leading-relaxed mt-4">
                <p>
                  Computer Science student building things that click, scroll, and occasionally impress.
                </p>
                <p>
                  Writes code. Breaks less. Learns fast.
                </p>
                <p>
                  Trained through internships, fueled by curiosity. Backend, Frontend, and everything in between, I&apos;ve done a bit of it all.
                </p>

                {/* Internship Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-lg border border-gray-700/30 backdrop-blur-sm">
                    <h4 className="font-semibold text-white text-sm">Backend Intern</h4>
                    <p className="text-purple-400 text-xs">1Stop.ai (Oct-Dec 2024)</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-700/30 backdrop-blur-sm">
                    <h4 className="font-semibold text-white text-sm">Full Stack Intern</h4>
                    <p className="text-purple-400 text-xs">AICTE Virtual Internship (Oct-Dec 2024)</p>
                  </div>
                </div>

                {/* Extra-curricular Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-lg border border-gray-700/30 backdrop-blur-sm">
                    <h4 className="font-semibold text-white text-sm">Vice Secretary</h4>
                    <p className="text-purple-400 text-xs">Futurix, SRMIST</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-700/30 backdrop-blur-sm">
                    <h4 className="font-semibold text-white text-sm">Technical Member</h4>
                    <p className="text-purple-400 text-xs">CSI SRM & Aaruush</p>
                  </div>
                </div>

                <p className="text-purple-400 font-semibold mt-4 font-mono">
                  Dependencies = [Laptop, Curiosity, Caffeine]
                </p>
              </div>
            </div>

            {/* Interactive Console */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden h-max">
              <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-gray-400 font-mono text-sm">sat_dev@console</span>
              </div>
              
              <div 
                ref={consoleRef}
                className="h-64 overflow-y-auto p-4 font-mono text-sm space-y-2"
              >
                {consoleHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1"
                  >
                    <div className="text-green-400">
                      $ {item.command}
                    </div>
                    <div className={`pl-4 ${
                      item.type === 'success' ? 'text-green-300' :
                      item.type === 'warning' ? 'text-yellow-300' :
                      item.type === 'error' ? 'text-red-300' : 'text-blue-300'
                    }`}>
                      {item.output}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="text-green-400 flex items-center gap-2">
                    $ <span className="animate-pulse">_</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">$</span>
                  <input
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleConsoleSubmit(e);
                      }
                    }}
                    placeholder="Try: motivate, meme, status, coffee"
                    className="flex-1 bg-transparent text-white font-mono outline-none placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Photo Carousel */}
            <div className="relative group">
              <div className="relative h-80 rounded-xl overflow-hidden bg-gray-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full"
                  >
                    {/* Shimmer shows only while current image is loading */}
                    {!currentImageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                    )}
                    
                    <Image
                      src={profileImages[currentImageIndex]}
                      alt="Profile"
                      fill
                      sizes="(max-width: 768px) 90vw, 600px"
                      quality={80}
                      priority={currentImageIndex === 0}
                      loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
                      className="object-cover"
                      onLoad={() => handleImageLoad(currentImageIndex)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons - only hover animations */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Evidence Drawer Trigger - Interactive Badge Showcase */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 overflow-hidden relative">
              {/* Animated circuit lines background */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50 L100 50 L100 100" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-400" />
                  <path d="M200 0 L200 50 L300 50" stroke="currentColor" strokeWidth="2" fill="none" className="text-purple-400" />
                  <circle cx="100" cy="50" r="3" fill="currentColor" className="text-green-400" />
                  <circle cx="200" cy="50" r="3" fill="currentColor" className="text-purple-400" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-400 animate-pulse" />
                      Certifications
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 font-mono">
                      {`// ${certificates.length} verified achievements`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">Live</span>
                  </div>
                </div>
                
                {/* Interactive badge grid with hover effects */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="aspect-square rounded-lg bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 p-2 cursor-pointer hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group relative"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-purple-500/0 group-hover:from-green-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300" />
                      
                      <Image
                        src={cert.logo}
                        alt={cert.title}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain relative z-10 group-hover:brightness-110 transition-all duration-300"
                      />
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {cert.issuer}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button with animated gradient border */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-purple-500 to-green-500 rounded-lg opacity-30 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur animate-gradient-x" />
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="relative w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium font-mono flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-200"
                  >
                    <span className="text-green-400">&gt;_</span>
                    View Full Credentials
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.span>
                  </button>
                </div>

                {/* Achievement stats */}
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-700/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 font-mono">{certificates.length}</div>
                    <div className="text-xs text-gray-400">Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 font-mono">100%</div>
                    <div className="text-xs text-gray-400">Verified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 font-mono">2025</div>
                    <div className="text-xs text-gray-400">Latest</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Evidence Drawer - slides in from right (desktop) or bottom (mobile) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gray-900 border-l border-gray-700/50 z-50 overflow-y-auto md:block hidden"
            >
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white font-mono">Evidence of Skills</h2>
                  <p className="text-gray-400 text-sm mt-1">Official certifications & credentials</p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:text-red-400 transition-colors p-2"
                  aria-label="Close drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6 hover:border-green-500/50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-900/50 border border-gray-700/30 p-2 flex-shrink-0">
                        <Image
                          src={cert.logo}
                          alt={cert.issuer}
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-green-400 text-sm mb-3">
                          Issued by {cert.issuer}
                        </p>
                        
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors duration-200"
                          >
                            View Credential
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Lazy loaded thumbnail */}
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-700/30">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mobile drawer (slides from bottom) */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] bg-gray-900 border-t border-gray-700/50 z-50 overflow-y-auto md:hidden rounded-t-2xl"
            >
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 p-4">
                <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white font-mono">Credentials</h2>
                    <p className="text-gray-400 text-xs mt-1">{certificates.length} certifications</p>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-400 hover:text-red-400 transition-colors p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-900/50 border border-gray-700/30 p-1.5 flex-shrink-0">
                        <Image
                          src={cert.logo}
                          alt={cert.issuer}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white mb-1 truncate">
                          {cert.title}
                        </h3>
                        <p className="text-green-400 text-xs">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-green-600 text-white text-sm rounded-lg"
                      >
                        View Credential
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
    </>
  );
};

export default AboutMe;