'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Home,
  User,
  FolderOpen,
  Zap,
  MessageCircle,
  FileText,
  Heart,
  Coffee,
  Code,
  ExternalLink,
  Send
} from 'lucide-react';

// Shared Types
interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  gradient: string;
  hoverGradient: string;
}

interface ContactMethod {
  icon: React.ElementType;
  title: string;
  value: string;
  href: string;
  gradient: string;
}

interface FooterProps {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  className?: string;
}

// Custom Hook for Floating Particles (DRY principle)
const useFloatingParticles = (count: number = 40) => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const newParticles: FloatingParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev: FloatingParticle[]) => {
        if (prev.length === 0) return prev;
        return prev.map((particle: FloatingParticle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
          rotation: particle.rotation + particle.rotationSpeed,
        }));
      });
    }, 60);
    
    return () => clearInterval(interval);
  }, []);

  return particles;
};

// Custom Hook for Mouse Tracking (DRY principle)
const useMouseTracking = (elementRef: React.RefObject<HTMLElement>) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [elementRef]);

  return mousePosition;
};

// Custom Hook for Visibility Detection (DRY principle)
const useVisibility = (elementRef: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3, rootMargin: '0px' }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [elementRef]);

  return isVisible;
};

const Footer: React.FC<FooterProps> = ({
  name = "Your Name",
  email = "hello@yourname.com",
  phone = "+1 (555) 123-4567",
  location = "Your City, Country",
  className = ""
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const footerRef = useRef<HTMLElement>(null);
  
  // Use custom hooks to eliminate duplication
  const particles = useFloatingParticles(40);
  const mousePosition = useMouseTracking(footerRef);
//   const isVisible = useVisibility(footerRef);

  // Scroll tracking for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        timeZone: 'Asia/Kolkata'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigationLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/projects', label: 'Projects', icon: FolderOpen },
    { href: '/skills', label: 'Skills', icon: Zap },
    { href: '/contact', label: 'Contact', icon: MessageCircle },
    { href: '/resume', label: 'Resume', icon: FileText }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Github,
      href: 'https://github.com/yourusername',
      label: 'GitHub',
      gradient: 'from-gray-600 to-gray-800',
      hoverGradient: 'hover:from-gray-700 hover:to-black'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
      gradient: 'from-blue-600 to-blue-800',
      hoverGradient: 'hover:from-blue-700 hover:to-blue-900'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
      gradient: 'from-sky-500 to-blue-600',
      hoverGradient: 'hover:from-sky-600 hover:to-blue-700'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/yourusername',
      label: 'Instagram',
      gradient: 'from-pink-500 to-purple-600',
      hoverGradient: 'hover:from-pink-600 hover:to-purple-700'
    }
  ];

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      title: 'Email',
      value: email,
      href: `mailto:${email}`,
      gradient: 'from-blue-600 via-purple-600 to-blue-800'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\D/g, '')}`,
      gradient: 'from-green-600 via-teal-600 to-cyan-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: location,
      href: '#location',
      gradient: 'from-orange-600 via-red-600 to-pink-600'
    }
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.footer
        ref={footerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={footerVariants}
        className={`
          relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden
          font-['Poppins',_sans-serif] mt-auto ${className}
        `}
      >
        {/* Consolidated Background Effects */}
        <div className="absolute inset-0">
          {/* Floating Particles */}
          {particles.map((particle: FloatingParticle) => (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                transform: `rotate(${particle.rotation}deg)`,
                opacity: particle.opacity,
              }}
            >
              <div
                className="w-1 h-1 bg-blue-400 rounded-full animate-glow"
                style={{
                  transform: `scale(${particle.size})`,
                  filter: 'blur(0.5px)',
                }}
              />
            </div>
          ))}

          {/* Geometric Background Elements */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-800/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-600/20 to-pink-800/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        {/* Interactive Mouse Gradient */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                        rgba(59, 130, 246, 0.1), 
                        rgba(147, 51, 234, 0.05), 
                        transparent 60%)`
          }}
        />

        {/* Animated Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg 
            className="relative block w-full h-20" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              className="fill-gray-800/50 animate-wave"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
          
          {/* Main Footer Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            
            {/* Enhanced Branding Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="relative inline-block">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-4">
                  {name}
                </h2>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-xl opacity-75" />
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Full-Stack Developer passionate about creating innovative digital experiences 
                with cutting-edge technologies and creative problem-solving.
              </p>

              {/* Real-time Status */}
              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div>
                  <p className="text-white font-medium">Currently Available</p>
                  <p className="text-gray-400 text-sm">Local time: {currentTime} IST</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">
                Navigation
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
              </h3>
              <nav className="space-y-3">
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 group-hover:bg-purple-300 transition-all duration-300" />
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">
                Contact
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.href}
                      className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                          {method.title}
                        </p>
                        <p className="text-sm font-medium">{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Social Media & Newsletter Section */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 py-12 border-t border-gray-700/50"
          >
            {/* Social Media Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`group relative overflow-hidden bg-gradient-to-r ${social.gradient} ${social.hoverGradient} rounded-2xl border border-gray-700/50 transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-3 p-4">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-white font-medium">{social.label}</span>
                        <ExternalLink className="w-4 h-4 text-white/70 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Stay Updated</h3>
              
              <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/30 backdrop-blur-xl">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Newsletter
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Get notified about new projects and tech insights.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-gray-700/50"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400">
                <p>&copy; 2025 {name}. All rights reserved.</p>
                <span className="text-gray-600">|</span>
                <div className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>and</span>
                  <Coffee className="w-4 h-4 text-yellow-600 animate-bounce" />
                </div>
              </div>

              {/* Additional Links */}
              <div className="flex items-center space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Version & Build Info */}
            <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Version 2.1.0</span>
                <span>•</span>
                <span>Built with Next.js & TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-20 blur-lg transition-opacity duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Consolidated Custom Animations */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-wave { animation: wave 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </>
  );
};

export default Footer;