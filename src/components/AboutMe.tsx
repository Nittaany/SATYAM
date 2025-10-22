'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Terminal } from 'lucide-react';


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
  output: string | JSX.Element;
  type: 'success' | 'info' | 'warning' | 'error';
}


const profileImages = [
  '/images/photo.jpg',
  '/images/vs.jpeg',
  '/images/group.jpeg',
  '/images/ISA.jpeg',
  '/images/abc.jpg',
  '/images/apollo.jpeg',
  '/images/ctech00.jpeg',
  '/images/ultron.jpg',
  '/images/aaruush.jpg',
  '/images/rNepal.JPG',
  '/images/ctech.jpeg'
];

const certificates: Certificate[] = [
  {
    id: 'Oracle',
    title: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle',
    logo: '/images/oracleFA-logo.png',
    image: '/images/OFA.png',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DC20044A811377F383050F00CFD2B25E83908AC5DD1EF0C1F9FB4406C4824495'
  },
  {
    id: 'AWS',
    title: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS',
    logo: '/images/awsML-logo.png',
    image: '/images/ML.png',
    credentialUrl: 'https://www.credly.com/badges/7f79acd9-cd98-43e3-9dda-be64dde688da/public_url'
  },
  {
    id: 'Cisco',
    title: 'Cisco Networking Basics',
    issuer: 'Cisco',
    logo: '/images/ciscoNB-logo.png',
    image: '/images/NB.png',
    credentialUrl: 'https://www.credly.com/badges/e1db1d55-0387-4127-b04e-896718586e8f/public_url'
  },
  {
    id: 'NPTEL',
    title: 'NPTEL - Communication Networks',
    issuer: 'NPTEL',
    logo: '/images/nptelCN-logo.png',
    image: '/images/NPTEL.png',
    credentialUrl: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/117/noc25-ee12/Course/NPTEL25EE12S24330345804507064.pdf'
  }
];

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
    output: (
      <div className="flex items-center gap-2">
        <span>☕ Brewing coffee...</span>
        <div className="w-20 h-2 bg-gray-700 rounded">
          <motion.div 
            className="h-full bg-amber-500 rounded"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
          />
        </div>
      </div>
    ),
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
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [consoleHistory, setConsoleHistory] = useState<ConsoleCommand[]>([
    { command: 'whoami', output: 'sat_dev@portfolio:~$ Ready to explore!', type: 'info' }
  ]);
  const [consoleInput, setConsoleInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-carousel for images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll console
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  // Auto-typing demo commands
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

  const handleConsoleSubmit = (e: React.FormEvent) => {
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
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  };

  return (
    <section id="aboutme" className="relative min-h-screen py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 font-mono">
            <div className="flex items-center gap-2 text-green-400 text-lg">
              <Terminal className="w-5 h-5" />
              <span>sat_dev@portfolio:~$</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-white"
              >
                ./whoami
              </motion.span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Story & Code */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Personal Story */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                {/* Heading */}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white font-mono relative">
                    <span className="text-purple-400">|-|</span> Not Another Boring Bio
                  </h3>
                  <span className="text-gray-400 text-xs mt-1 font-mono ">
                    In Short (Because You&apos;re Busy)
                  </span>
                </div>

                <div className="text-gray-300 space-y-3 leading-relaxed mt-4">
                  <p>
                    Computer Science student  building things that click, scroll, and occasionally impress.
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
                      <p className="text-purple-400 text-xs">1Stop.ai (Oct–Dec 2024)</p>
                    </div>
                    <div className="p-3 rounded-lg border border-gray-700/30 backdrop-blur-sm">
                      <h4 className="font-semibold text-white text-sm">Full Stack Intern</h4>
                      <p className="text-purple-400 text-xs">AICTE Virtual Internship (Oct–Dec 2024)</p>
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
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
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
                    $ <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  </div>
                )}
              </div>

              <form onSubmit={handleConsoleSubmit} className="border-t border-gray-700/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">$</span>
                  <input
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    placeholder="Try: motivate, meme, status, coffee"
                    className="flex-1 bg-transparent text-white font-mono outline-none placeholder-gray-500"
                  />
                </div>
              </form>
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
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full"
                  >
                    <Image
                      src={profileImages[currentImageIndex]}
                      alt="Profile"
                      fill
                      className="object-cover"
                      quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
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
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Section */}
<div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 py-4">
  <h4 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
    <span className="text-green-400">#</span> Certifications
  </h4>

  {/* Logo Cloud */}
  <div className="relative w-full flex flex-wrap justify-center gap-10 py-2">
    {certificates.map((cert) => {
      const rotation = (Math.random() - 0.5) * 1.2; // initial rotation
      const floatDuration = 4 + Math.random() * 1.1; // random float speed

      return (
        <motion.div
          key={cert.id}
          onClick={() => setSelectedCertificate(cert)}
          className="w-20 flex flex-col items-center cursor-pointer"
          initial={{ y: 0, rotate: rotation }}
          animate={{ y: [0, -6, 0], rotate: [rotation, rotation + 3, rotation] }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.15, rotate: 0, zIndex: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Logo */}
          <div className="w-25 h-25 rounded-lg backdrop-blur-[2px] border border-gray-700/30 flex items-center justify-center shadow-md bg-gray-800/40">
            <Image
              src={cert.logo}
              alt={cert.title}
              width={100}
              height={100}
              className="object-cover rounded-lg"
            />
          </div>
          {/* Title */}
          <div className="text-white text-xs text-center mt-1">{cert.title}</div>
        </motion.div>
      );
    })}
  </div>
</div>

{/* Certificate Modal */}
<AnimatePresence>
  {selectedCertificate && (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedCertificate(null)}
    >
      <motion.div
        className="bg-gray-900 rounded-xl border border-gray-700/50 w-full max-w-2xl p-6 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedCertificate(null)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-lg"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-white mb-4 text-center">{selectedCertificate.title}</h3>

        <div className="w-full max-h-[400px] flex items-center justify-center overflow-hidden rounded-lg mb-4">
          <Image
            src={selectedCertificate.image}
            alt={selectedCertificate.title}
            width={600}
            height={400}
            className="object-contain"
          />
        </div>

        <p className="text-gray-300 mb-2 text-center">
          Issued by: <span className="text-green-400">{selectedCertificate.issuer}</span>
        </p>

        {selectedCertificate.credentialUrl && (
          <a
            href={selectedCertificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto block w-max px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-500 transition-colors"
          >
            View Credential
            <ExternalLink className="w-4 h-4 ml-1 inline-block" />
          </a>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



          </motion.div>
        </div>
      </div>

      
    </section>
  );
};
export default AboutMe;