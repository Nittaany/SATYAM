"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  Download,
  Coffee,
  Zap,
  Sparkles,
  Award,
  Briefcase,
  Monitor,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactMe = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [terminalText, setTerminalText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Terminal animation
  useEffect(() => {
    const commands = [
      '> npm install satyam-dev',
      '> Portfolio installed successfully 🚀',
      '> Available for opportunities... 📣',
      '> Ready to collaborate 💫'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    
    const typeWriter = () => {
      if (commandIndex < commands.length) {
        if (charIndex < commands[commandIndex].length) {
          setTerminalText(prev => prev + commands[commandIndex][charIndex]);
          charIndex++;
          setTimeout(typeWriter, 100);
        } else {
          setTimeout(() => {
            setTerminalText(prev => prev + '\n');
            commandIndex++;
            charIndex = 0;
            if (commandIndex < commands.length) {
              setTimeout(typeWriter, 500);
            }
          }, 1000);
        }
      } else {
        // Reset after completion
        setTimeout(() => {
          setTerminalText('');
          commandIndex = 0;
          charIndex = 0;
          setTimeout(typeWriter, 2000);
        }, 5000);
      }
    };
    
    const timer = setTimeout(typeWriter, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for interactive background
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
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 2000);
  };

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '/path-to-your-cv.pdf'; // Replace with actual CV path
    link.download = 'Satyam_Developer_Resume.pdf';
    link.click();
  };

  const stats = [
    { icon: <Award className="w-5 h-5" />, label: "10+ Projects Completed", color: "text-blue-400" },
    { icon: <Briefcase className="w-5 h-5" />, label: "2 Internships", color: "text-green-400" },
    { icon: <Monitor className="w-5 h-5" />, label: "Frontend Focused", color: "text-purple-400" }
  ];

  return (
    <section 
      id='contact'
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20 px-6 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(139, 92, 246, 0.15), 
                      rgba(59, 130, 246, 0.1), 
                      transparent 50%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Side - Visual/Intro */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            
            {/* Main Headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
                <Coffee className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Available for opportunities</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
                  Let&apos;s Build Something
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                I&apos;m a passionate frontend developer who loves creating smooth UX and modern designs. 
                Always open to discussing exciting roles, collaborations, and innovative projects.
              </p>
              
              <p className="text-lg text-gray-400 max-w-lg">
                Looking for a developer who&apos;s passionate about clean code, pixel-perfect designs, 
                and cutting-edge technologies? Let&apos;s connect and create something extraordinary.
              </p>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 px-4 py-3 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 delay-${index * 100}`}
                >
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                  <span className="text-gray-300 font-medium text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Terminal Animation */}
            <div className="relative">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 font-mono overflow-hidden">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-500 text-sm ml-2">terminal</span>
                </div>
                <div className="text-green-400 text-sm leading-relaxed min-h-[100px]">
                  <pre className="whitespace-pre-wrap">{terminalText}</pre>
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadCV}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-2">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </div>
              </button>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
                  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-3 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            
            {/* Collaboration Pitch */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Let&apos;s Collaborate</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Looking for a frontend developer passionate about clean code, smooth UX, and modern design? 
                Let&apos;s build something amazing together.
              </p>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-30 animate-pulse" />
              
              <form 
                onSubmit={handleSubmit}
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Get In Touch</h2>
                  <p className="text-gray-400">Ready to start a conversation? Drop me a message!</p>
                </div>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="group relative">
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                        focusedField === 'name' || formData.name ? 'text-purple-400 scale-110' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 text-white placeholder-gray-400 focus:outline-none ${
                          errors.name ? 'border-red-500 shake' : 
                          focusedField === 'name' || formData.name ? 'border-purple-500 shadow-lg shadow-purple-500/25 bg-white/10' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center animate-slide-down">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="group relative">
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                        focusedField === 'email' || formData.email ? 'text-blue-400 scale-110' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 text-white placeholder-gray-400 focus:outline-none ${
                          errors.email ? 'border-red-500 shake' : 
                          focusedField === 'email' || formData.email ? 'border-blue-500 shadow-lg shadow-blue-500/25 bg-white/10' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400 flex items-center animate-slide-down">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="group relative">
                    <div className="relative">
                      <Zap className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                        focusedField === 'subject' || formData.subject ? 'text-yellow-400 scale-110' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 text-white placeholder-gray-400 focus:outline-none ${
                          errors.subject ? 'border-red-500 shake' : 
                          focusedField === 'subject' || formData.subject ? 'border-yellow-500 shadow-lg shadow-yellow-500/25 bg-white/10' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="What's this about?"
                      />
                    </div>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-400 flex items-center animate-slide-down">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="group relative">
                    <div className="relative">
                      <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-all duration-300 ${
                        focusedField === 'message' || formData.message ? 'text-green-400' : 'text-gray-500'
                      }`} />
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 text-white placeholder-gray-400 focus:outline-none resize-none ${
                          errors.message ? 'border-red-500 shake' : 
                          focusedField === 'message' || formData.message ? 'border-green-500 shadow-lg shadow-green-500/25 bg-white/10' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="Tell me about your project, collaboration idea, or just say hi!"
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400 flex items-center animate-slide-down">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-900/30 border border-green-500/30 py-4 px-6 rounded-2xl animate-slide-up backdrop-blur-sm">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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

        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </section>
  );
};

export default ContactMe;