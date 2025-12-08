'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
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

/* ---------------------- Types ---------------------- */
interface FloatingParticle {
  id: number;
  left: number; // percent
  top: number; // percent
  size: number; // scale
  durX: number; // seconds
  durY: number; // seconds
  delay: number; // seconds
  rotationDur: number; // seconds
  opacity: number;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  gradient: string;
  hoverGradient?: string;
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
  location?: React.ReactNode;
  className?: string;
}


/* ------------------ Optimized helpers ------------------ */

/**
 * Particles: memoized static data only.
 * Animations performed in CSS (no React state updates).
 */
const useFloatingParticles = (count = 40) => {
  return useMemo<FloatingParticle[]>(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.round(Math.random() * 100);
        const top = Math.round(Math.random() * 100);
        const size = +(Math.random() * 2 + 0.5).toFixed(2);
        const durX = +(6 + Math.random() * 10).toFixed(2); // seconds
        const durY = +(6 + Math.random() * 10).toFixed(2);
        const delay = +(Math.random() * 6).toFixed(2);
        const rotationDur = +(6 + Math.random() * 10).toFixed(2);
        const opacity = +(Math.random() * 0.45 + 0.05).toFixed(2);
        return { id: i, left, top, size, durX, durY, delay, rotationDur, opacity };
      }),
    [count]
  );
};

const useMouseTracking = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [pos, setPos] = useState({ x: 50, y: 50 }); // default center
  useEffect(() => {
    if (!elementRef.current) return;
    let rafId: number | null = null;

    const handle = (e: MouseEvent) => {
      if (!elementRef.current) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = elementRef.current!.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setPos({ x, y });
        rafId = null;
      });
    };

    const el = elementRef.current;
    el.addEventListener('mousemove', handle, { passive: true });

    const leave = () => setPos({ x: 50, y: 50 });
    el.addEventListener('mouseleave', leave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handle);
      el.removeEventListener('mouseleave', leave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [elementRef]);

  return pos;
};

/* ------------------ Small isolated clock component ------------------ */
/* This ensures only the clock re-renders every second, not the whole footer. */
const Clock: React.FC = React.memo(() => {
  const [time, setTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' });
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p className="text-gray-400 text-sm">Local time: {time} IST</p>;
});
Clock.displayName = 'Clock';

/* ------------------ Footer component ------------------ */

const Footer: React.FC<FooterProps> = ({
  name = 'S A T Y A M',
  email = 'nitantsatyam123@gmail.com',
  location = 'NEPAL 🇳🇵 ⎸⎹ INDIA 🇮🇳',
  className = ''
}) => {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement | null>(null);

  // particles and mouse position (memoized and throttled)
  const particles = useFloatingParticles(typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 40);
  const mousePos = useMouseTracking(footerRef);

  // Back-to-top visibility (rAF-throttled)
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
    // on load evaluate once
    if (typeof window !== 'undefined') setShowBackToTop(window.scrollY > 400);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    if (reduceMotion) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
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
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub', gradient: 'from-gray-600 to-gray-800', hoverGradient: 'hover:from-gray-700 hover:to-black' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-800', hoverGradient: 'hover:from-blue-700 hover:to-blue-900' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter', gradient: 'from-sky-500 to-blue-600', hoverGradient: 'hover:from-sky-600 hover:to-blue-700' },
    { icon: Instagram, href: 'https://instagram.com/yourusername', label: 'Instagram', gradient: 'from-pink-500 to-purple-600', hoverGradient: 'hover:from-pink-600 hover:to-purple-700' }
  ];

  const contactMethods: ContactMethod[] = [
    { icon: Mail, title: 'Email', value: email, href: `mailto:${email}`, gradient: 'from-blue-600 via-purple-600 to-blue-800' },
    { icon: MapPin, title: 'Location', value: location, href: '#location', gradient: 'from-orange-600 via-red-600 to-pink-600' }
  ];

  /* entrance motion for the footer (lightweight) */
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
        {/* Particle layer (pure CSS animations, no React updates) */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map(p => {
            const style: React.CSSProperties = {
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              transform: `scale(${p.size})`,
              // Compose per-particle animation timings for variety:
              animation: reduceMotion
                ? 'none'
                : `floatX ${p.durX}s ease-in-out ${p.delay}s infinite alternate, floatY ${p.durY}s ease-in-out ${p.delay}s infinite alternate, spin ${p.rotationDur}s linear ${p.delay}s infinite`
            };
            return (
              <div key={p.id} className="absolute" style={style}>
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
              </div>
            );
          })}

          {/* Large soft blobs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-70" style={{ background: 'linear-gradient(90deg,#2563eb20,#7c3aed20)' }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-70" style={{ background: 'linear-gradient(135deg,#7c3aed20,#ec489920)' }} />
        </div>

        {/* Mouse-driven radial */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.1), rgba(147,51,234,0.05), transparent 60%)`
          }}
        />

        {/* top wave divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-800/50" />
          </svg>
        </div>

        {/* content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            {/* Branding */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative inline-block">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-4">{name}</h2>
                <div className="absolute -inset-2 rounded-lg blur-xl opacity-75" style={{ background: 'linear-gradient(90deg,#2563eb20,#7c3aed20)' }} />
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Full-Stack Developer. <br />
                creating innovative digital experiences with cutting-edge technologies and creative problem-solving skills.
              </p>

              <div className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div>
                  <p className="text-white font-medium">Currently Available</p>
                  <Clock />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">Navigation<div className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)' }} /></h3>
              <nav className="space-y-3">
                {navigationLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href} className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-transform duration-200 hover:translate-x-1">
                      <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 group-hover:bg-purple-300 transition-all duration-200" />
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">Contact<div className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,#fb7185,#8b5cf6)' }} /></h3>
              <div className="space-y-4">
                {contactMethods.map((method, idx) => {
                  const Icon = method.icon;
                  return (
                    <a key={idx} href={method.href} className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-200">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-105`} style={{ background: `linear-gradient(90deg, ${method.gradient})` }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{method.title}</p>
                        <p className="text-sm font-medium">{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="grid md:grid-cols-2 gap-12 py-12 border-t border-gray-700/50">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 transition-all duration-200`} style={{ background: `linear-gradient(90deg, ${social.gradient})` }}>
                      <div className="flex items-center p-4 space-x-3">
                        <Icon className="w-6 h-6 text-white" />
                        <span className="text-white font-medium">{social.label}</span>
                        <ExternalLink className="w-4 h-4 text-white/70 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Stay Updated</h3>

              <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/30 backdrop-blur-xl">
                <h4 className="text-white font-semibold mb-3 flex items-center"><Zap className="w-5 h-5 mr-2 text-yellow-400" />Newsletter</h4>
                <p className="text-gray-300 text-sm mb-4">Get notified about new projects and tech insights.</p>
                <div className="flex space-x-2">
                  <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200" />
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-transform duration-200 transform hover:scale-105 flex items-center"><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
                <span className="text-gray-600">|</span>
                <div className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>and</span>
                  <Coffee className="w-4 h-4 text-yellow-600 animate-bounce" />
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">Privacy Policy</a>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">Terms of Service</a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-2"><Code className="w-4 h-4" /><span>Version 2.1.0 • Built with Next.js & TypeScript</span></div>
              <div className="flex items-center space-x-2"><span>Last updated: {useMemo(() => new Date().toLocaleDateString(), [])}</span></div>
            </div>
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

      {/* Local styles and keyframes */}
      <style jsx>{`
        @keyframes floatX { to { transform: translateX(40px); } }
        @keyframes floatY { to { transform: translateY(30px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes glow { 0%, 100% { opacity: 0.3 } 50% { opacity: 0.8 } }
        @keyframes wave { 0% { transform: translateX(0); } 100% { transform: translateX(-50px); } }
        @keyframes pulse-slow { 0%,100% { opacity:0.3; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.05); } }

        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-wave { animation: wave 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        /* Respect reduced motion preference: disable non-essential animations */
        @media (prefers-reduced-motion: reduce) {
          .animate-glow, .animate-wave, .animate-pulse-slow { animation: none !important; }
        }
      `}</style>
    </>
  );
};

export default Footer;
