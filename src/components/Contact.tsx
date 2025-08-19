"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle, AlertCircle, Loader, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

// Type definitions
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactMe = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [typingEffect, setTypingEffect] = useState<string>('');
  const [particlePositions, setParticlePositions] = useState<Particle[]>([]);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const textToType = "Let's build something extraordinary together...";

  // Initialize particles
  useEffect(() => {
    const particles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticlePositions(particles);
  }, []);

  // Animate particles with better cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setParticlePositions((prev: Particle[]) => {
        if (prev.length === 0) return prev;
        return prev.map((particle: Particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }));
      });
    }, 50);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Mouse tracking with cleanup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Intersection Observer for scroll animations with cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      observer.disconnect();
    };
  }, []);

  // Typing effect 
  useEffect(() => {
    if (isVisible && typingEffect.length < textToType.length) {
      const timer = setTimeout(() => {
        setTypingEffect(textToType.slice(0, typingEffect.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, typingEffect, textToType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with realistic timing
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'your.email@example.com',
      href: 'mailto:your.email@example.com',
      gradient: 'from-blue-600 via-purple-600 to-blue-800',
      delay: '0s'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      gradient: 'from-green-600 via-teal-600 to-cyan-600',
      delay: '0.2s'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Your City, Country',
      href: '#location',
      gradient: 'from-orange-600 via-red-600 to-pink-600',
      delay: '0.4s'
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#github', color: 'hover:from-gray-700 hover:to-black' },
    { icon: Linkedin, href: '#linkedin', color: 'hover:from-blue-600 hover:to-blue-800' },
    { icon: Twitter, href: '#twitter', color: 'hover:from-sky-500 hover:to-blue-600' },
    { icon: Instagram, href: '#instagram', color: 'hover:from-pink-500 hover:to-purple-600' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particlePositions.map((particle: Particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              filter: 'blur(0.5px)',
              animation: `twinkle ${particle.id % 3 + 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(59, 130, 246, 0.15), 
                      rgba(147, 51, 234, 0.1), 
                      transparent 50%)`
        }}
      />

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-800/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-600/20 to-pink-800/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-600/10 to-blue-800/10 rounded-full blur-2xl animate-float" />
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-600/30 to-transparent animate-shimmer" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent animate-shimmer delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header with Advanced Typography */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-6 relative">
              Get In Touch
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl animate-glow" />
            </h1>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
              {typingEffect}
              <span className="animate-blink text-blue-400">|</span>
            </p>
            <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded animate-shimmer" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Contact Form */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-75 animate-gradient-shift" />
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Send a Message</h2>
                <p className="text-gray-400">Let&#39;s start a conversation about your next project</p>
              </div>

              <div className="space-y-6">
                {/* Enhanced Input Fields */}
                {[
                  { name: 'name' as keyof FormData, icon: User, placeholder: 'Your Full Name', type: 'text' },
                  { name: 'email' as keyof FormData, icon: Mail, placeholder: 'your.email@example.com', type: 'email' },
                  { name: 'phone' as keyof FormData, icon: Phone, placeholder: 'Your Phone (Optional)', type: 'tel' },
                  { name: 'subject' as keyof FormData, icon: MessageSquare, placeholder: 'Project Subject', type: 'text' }
                ].map((field, index) => (
                  <div key={field.name} className="relative group">
                    <div className="relative">
                      <field.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                        focusedField === field.name || formData[field.name] ? 'text-blue-400 scale-110' : 'text-gray-500'
                      }`} />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField('')}
                        className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 rounded-2xl transition-all duration-300 text-white placeholder-gray-500 focus:outline-none backdrop-blur-sm ${
                          errors[field.name] 
                            ? 'border-red-500 focus:border-red-400 focus:shadow-red-500/25' 
                            : focusedField === field.name || formData[field.name]
                            ? 'border-blue-500 focus:border-blue-400 focus:shadow-blue-500/25 bg-gray-800/70'
                            : 'border-gray-600 hover:border-gray-500 focus:border-blue-400'
                        } focus:shadow-lg`}
                        placeholder={field.placeholder}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                        focusedField === field.name ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10' : ''
                      }`} />
                    </div>
                    {errors[field.name] && (
                      <p className="mt-2 text-sm text-red-400 flex items-center animate-shake">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                {/* Enhanced Message Field */}
                <div className="relative group">
                  <div className="relative">
                    <MessageSquare className={`absolute left-4 top-4 w-4 h-4 transition-all duration-300 ${
                      focusedField === 'message' || formData.message ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 rounded-2xl transition-all duration-300 text-white placeholder-gray-500 focus:outline-none resize-none backdrop-blur-sm ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-400' 
                          : focusedField === 'message' || formData.message
                          ? 'border-blue-500 focus:border-blue-400 bg-gray-800/70'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      placeholder="Tell me about your project, ideas, or just say hello!"
                    />
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10' : ''
                    }`} />
                  </div>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400 flex items-center animate-shake">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Enhanced Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed bg-size-200 animate-gradient-x"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-900/30 border border-green-500/30 py-3 px-4 rounded-xl animate-slide-up backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden"
                    style={{ animationDelay: method.delay }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur" />
                    <a
                      href={method.href}
                      className="relative flex items-center space-x-4 p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 transform hover:scale-[1.02] group"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 text-lg">
                          {method.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {method.value}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30" />
              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`group relative w-14 h-14 bg-gradient-to-r from-gray-700 to-gray-800 ${social.color} rounded-2xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg overflow-hidden`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="relative w-6 h-6 z-10" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-50" />
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <h4 className="font-semibold text-white">Quick Response Time</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I typically respond to messages within 24 hours. For urgent projects, 
                  feel free to reach out via phone or LinkedIn for faster communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { opacity: 0.3; transform: translateX(-100%); }
          50% { opacity: 1; }
          100% { opacity: 0.3; transform: translateX(100%); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 3s ease infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .delay-1000 { animation-delay: 1s; }
        .delay-500 { animation-delay: 0.5s; }
        .bg-size-200 { background-size: 200% 200%; }
      `}</style>
    </section>
  );
};

export default ContactMe;