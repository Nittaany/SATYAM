'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ChevronUp,
  User,
  FolderOpen,
  Zap,
  MessageCircle,
  FileText,
  Heart,
  Coffee,
  ArrowRight,
} from 'lucide-react';

/* ---------------------- Types ---------------------- */
interface FloatingParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  dur: number;
  delay: number;
  opacity: number;
}

interface SocialCard {
  id: string;
  platform: string;
  icon: React.ElementType;
  username: string;
  href: string;
  gradient: string;
  tagline: string;
}

interface FooterProps {
  name?: string;
  email?: string;
  className?: string;
}

/* ------------------ Optimized helpers ------------------ */

const useFloatingParticles = (count = 15) => {
  return useMemo<FloatingParticle[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 100),
        size: +(Math.random() * 1.5 + 0.5).toFixed(2),
        dur: +(8 + Math.random() * 12).toFixed(2),
        delay: +(Math.random() * 4).toFixed(2),
        opacity: +(Math.random() * 0.35 + 0.05).toFixed(2)
      })),
    [count]
  );
};

const useDeviceOptimization = () => {
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('high');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    if (isMobile && isLowEnd) setTier('low');
    else if (isMobile || isLowEnd) setTier('medium');
  }, []);
  
  return tier;
};

/* ------------------ Tinder Card Component ------------------ */
const TinderCard: React.FC<{
  card: SocialCard;
  index: number;
  isActive: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
  exiting: 'left' | 'right' | null;
}> = ({ card, index, isActive, onSwipe, exiting }) => {
  const Icon = card.icon;
  
  const handleVisit = () => {
    onSwipe('right');
    setTimeout(() => {
      window.open(card.href, '_blank', 'noopener,noreferrer');
    }, 250);
  };

  return (
    <div
      className={`
        absolute inset-0 w-full h-full
        transition-all duration-500 ease-out
        ${exiting === 'right' && isActive ? 'translate-x-[500px] rotate-12 opacity-0' : ''}
        ${exiting === 'left' && isActive ? '-translate-x-[500px] -rotate-12 opacity-0' : ''}
        ${!isActive ? 'pointer-events-none' : ''}
      `}
      style={{
        zIndex: 10 - index,
        transform: !exiting && !isActive 
          ? `scale(${1 - index * 0.05}) translateY(${-index * 12}px)`
          : undefined,
        opacity: !exiting && !isActive ? 0.6 : 1
      }}
    >
      <div className={`
        relative w-full h-full
        bg-gradient-to-br ${card.gradient}
        rounded-3xl border border-white/10
        backdrop-blur-xl
        shadow-2xl
        transition-all duration-300
        ${isActive ? 'hover:border-white/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]' : ''}
      `}>
        {/* Card Content */}
        <div className="flex flex-col items-center justify-center h-full p-8 ">
          <Icon className="w-20 h-20 text-white mb-6" strokeWidth={1.5} />
          
          <h3 className="text-3xl font-bold text-white mb-2">
            {card.platform}
          </h3>
          
          <p className="text-gray-300 text-lg mb-4">
            {card.username}
          </p>
          
          <p className="text-sm text-gray-400 italic">
            {card.tagline}
          </p>
        </div>

        {/* Action Buttons - Only on active card */}
        {isActive && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 px-4">
             <button
              onClick={handleVisit}
              className="
                group flex items-center gap-2
                px-5 py-3 rounded-full
                bg-gradient-to-r from-pink-500 to-red-500
                hover:from-pink-600 hover:to-red-600
                text-white font-semibold
                transition-all duration-200
                hover:scale-110 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
              "
              aria-label="Connect"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Connect</span>
            </button>
            <button
              onClick={() => onSwipe('left')}
              className="
                group flex items-center gap-2
                px-6 py-3 rounded-full
                bg-gray-800/50 hover:bg-gray-700/70
                border border-white/10 hover:border-white/20
                text-gray-300 hover:text-white
                transition-all duration-200
                hover:scale-70
              "
              aria-label="Arrow Right"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="text-sm font-medium">Next</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------ Simple Grid Fallback ------------------ */
const SimpleIconGrid: React.FC<{ cards: SocialCard[] }> = ({ cards }) => (
  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
    {cards.map(card => {
      const Icon = card.icon;
      return (
        <a
          key={card.id}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative
            flex flex-col items-center justify-center
            h-32 rounded-2xl
            bg-gradient-to-br ${card.gradient}
            border border-white/10
            hover:border-white/30
            transition-all duration-200
            hover:scale-105
            hover:shadow-lg
          `}
        >
          <Icon className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-white font-medium">{card.platform}</span>
        </a>
      );
    })}
  </div>
);

/* ------------------ Main Footer Component ------------------ */
const Footer: React.FC<FooterProps> = ({
  name = 'S A T Y A M',
  email = 'nitantsatyam123@gmail.com',
  className = ''
}) => {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement | null>(null);
  const deviceTier = useDeviceOptimization();

  // Optimized particle count based on device
  const particleCount = { high: 15, medium: 10, low: 6 }[deviceTier];
  const particles = useFloatingParticles(particleCount);

  // Card stack state
  const [activeIndex, setActiveIndex] = useState(0);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);

  const socialCards: SocialCard[] = [
    {
      id: 'github',
      platform: 'GitHub',
      icon: Github,
      username: 'Nittaany',
      href: 'https://github.com/Nittaany',
      gradient: 'from-neutral-700 via-neutral-800 to-neutral-900',
      tagline: "Let's build together"
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      icon: Linkedin,
      username: 'satyam-c',
      href: 'http://linkedin.com/in/satyam-c/',
      gradient: 'from-blue-700 to-blue-900',
      tagline: "Let's connect professionally"
    },
    {
      id: 'twitter',
      platform: 'Twitter',
      icon: Twitter,
      username: '@nittaany',
      href: 'https://x.com/nittaany',
      gradient: 'from-sky-500 to-blue-700',
      tagline: "Let's share ideas"
    },
    {
      id: 'email',
      platform: 'Email',
      icon: Mail,
      username: email,
      href: `mailto:${email}`,
      gradient: 'from-purple-600 to-pink-600',
      tagline: "Let's have a conversation"
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    setExiting(direction);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % socialCards.length);
      setExiting(null);
    }, 500);
  };

  // Back-to-top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (typeof window !== 'undefined') setShowBackToTop(window.scrollY > 400);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    if (reduceMotion) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    { href: '#aboutme', label: 'About', icon: User },
    { href: '#projects', label: 'Projects', icon: FolderOpen },
    { href: '#skills', label: 'Skills', icon: Zap },
    { href: '#contact', label: 'Contact', icon: MessageCircle },
    { href: `mailto:${email}`, label: 'Email Me', icon: Mail },
    { href: 'https://drive.google.com/file/d/1mgVZBLUCuAtVY_QhzuJLOWosUOJqUE1V/view?usp=sharing', label: 'Resume', icon: FileText }
  ];

  const footerMotion = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <>
      <motion.footer
        ref={footerRef}
        id="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        variants={footerMotion}
        className={`relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden font-['Poppins'] mt-auto ${className}`}
      >
        {/* Optimized particle layer */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map(p => {
            const style: React.CSSProperties = {
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              transform: `scale(${p.size})`,
              animation: reduceMotion
                ? 'none'
                : `floatCombined ${p.dur}s ease-in-out ${p.delay}s infinite`
            };
            return (
              <div key={p.id} className="absolute" style={style}>
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Top wave divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-800/50" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            
            {/* Left Column - Identity & Navigation */}
            <div className="space-y-8">
              {/* Branding */}
              <div className="space-y-6">
                <div className="relative inline-block">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                    {name}
                  </h2>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  I build for the web and beyond. <br />
                  <span className="text-gray-400 text-base"> Still exploring and committed to doing things well.</span>
                </p>

                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-green-300 font-medium">
                    Based in Nepal 🇳🇵 <br className='m-0.5' /> Open to good problems, wherever they are 🌍
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                <nav className="grid grid-cols-2 gap-2">
                  {navigationLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 py-1"
                      >
                        <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 group-hover:bg-purple-300 transition-all duration-200" />
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Right Column - Tinder Cards or Simple Grid */}
            <div className="flex flex-col items-center justify-center pt-8 lg:pt-4">
              <h3 className="text-2xl md:text-4xl font-bold  mb-8 text-center bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  My Endpoints
              </h3>

              {deviceTier === 'low' ? (
                <SimpleIconGrid cards={socialCards} />
              ) : (
                <div className="relative w-full max-w-[320px] mx-auto" style={{ height: '400px' }}>
                  {socialCards.map((card, i) => (
                    <TinderCard
                      key={card.id}
                      card={card}
                      index={(i - activeIndex + socialCards.length) % socialCards.length}
                      isActive={i === activeIndex}
                      onSwipe={handleSwipe}
                      exiting={i === activeIndex ? exiting : null}
                    />
                  ))}

                  {/* Progress indicator */}
                  <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                    {socialCards.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === activeIndex
                            ? 'bg-blue-500 w-6'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom credits */}
            <div className="flex flex-col items-center gap-6 text-gray-500 text-sm border-t border-white/10 pt-10 mt-12">

              {/* Tech Stack */}
              <div className="flex flex-col items-center">
                <span className="text-sm uppercase tracking-wide text-gray-400">
                  CRAFTED WITH
                </span>

                <div className="flex items-center gap-2 flex-wrap justify-center">

                  {/* Next.js – primary */}
                  <div className="">
                    <Image
                      src="/next.svg"
                      alt="Next.js"
                      width={75}
                      height={54}
                      className="filter invert opacity-75"
                    />
                  </div>

                  {/* Secondary stack */}
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className='text-3xl text-gray-600'>·</span>

                    <div className="flex items-center gap-1">
                      <Image src="/typescript.svg" alt="TypeScript" width={32} height={32} className='opacity-75'/>
                    </div>

                    <span className='text-3xl text-gray-600'>·</span>

                    <div className="flex items-center gap-1">
                      <Image src="/tailwind.svg" alt="Tailwind CSS" width={32} height={32} className='opacity-70'/>
                    </div>

                    <span className='text-3xl text-gray-600'>·</span>

                    <div className="flex items-center gap-1">
                      <Image src="/vercel.svg" alt="Vercel" width={54} height={32} className=' invert opacity-75' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personality */}
              <div className="flex items-center gap-1 text-xs text-gray-500 opacity-60">
                <span> © 2025  { name } </span>
                <span className="text-xs m-1">·</span>
                <Coffee className="w-3 h-3 text-yellow-500 animate-bounce" />
                <span>first</span>
                <span>·</span>
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span>anytime</span>

              </div>

              {/* Copyright */}
              <p className="text-xs text-gray-600">
               
              </p>

            </div>

         </div>
      </motion.footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={!reduceMotion ? { scale: 1.06 } : {}}
            whileTap={!reduceMotion ? { scale: 0.96 } : {}}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg flex items-center justify-center group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Optimized keyframes */}
      <style jsx>{`
        @keyframes floatCombined {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -15px); }
          50% { transform: translate(-10px, 10px); }
          75% { transform: translate(15px, 20px); }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </>
  );
};

export default Footer;