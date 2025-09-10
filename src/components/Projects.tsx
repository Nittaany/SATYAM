"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink,
  Github,
  Code,
  Globe,
  Zap,
  Database,
  Smartphone,
  Monitor,
  Server,
  Palette,
  ShoppingCart,
  User,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Lock,
  Rocket
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: Array<{
    name: string;
    color: string;
    bgColor: string;
  }>;
  liveDemo: string;
  sourceCode: string;
  category: string;
  featured: boolean;
}

const ProjectShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample project data
  const projects: Project[] = [
    {
      id: '1',
      title: 'ExpenseLedger',
      description: 'A comprehensive budget tracking system built with PHP & MySQL to manage income, expenses, and savings with detailed analytics.',
      image: '/api/placeholder/400/300',
      techStack: [
        { name: 'PHP', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
        { name: 'MySQL', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
        { name: 'Bootstrap', color: 'text-violet-400', bgColor: 'bg-violet-500/20' },
        { name: 'JavaScript', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' }
      ],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Full Stack',
      featured: true
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with React, Next.js, and Stripe integration. Features include cart management, user authentication, and payment processing.',
      image: '/api/placeholder/400/300',
      techStack: [
        { name: 'React', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
        { name: 'Next.js', color: 'text-white', bgColor: 'bg-gray-700/20' },
        { name: 'Stripe', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
        { name: 'Tailwind', color: 'text-teal-400', bgColor: 'bg-teal-500/20' }
      ],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Web Apps',
      featured: true
    },
    {
      id: '3',
      title: 'Task Management Dashboard',
      description: 'Intuitive project management tool with real-time collaboration, task tracking, and team analytics built during my internship.',
      image: '/api/placeholder/400/300',
      techStack: [
        { name: 'Vue.js', color: 'text-green-400', bgColor: 'bg-green-500/20' },
        { name: 'Node.js', color: 'text-lime-400', bgColor: 'bg-lime-500/20' },
        { name: 'MongoDB', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
        { name: 'Socket.io', color: 'text-gray-400', bgColor: 'bg-gray-500/20' }
      ],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Internship',
      featured: false
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing my projects and skills with modern animations and responsive design.',
      image: '/api/placeholder/400/300',
      techStack: [
        { name: 'React', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
        { name: 'Next.js', color: 'text-white', bgColor: 'bg-gray-700/20' },
        { name: 'Framer Motion', color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
        { name: 'Tailwind', color: 'text-teal-400', bgColor: 'bg-teal-500/20' }
      ],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Web Apps',
      featured: false
    },
    {
      id: '5',
      title: 'Restaurant Booking App',
      description: 'Full-stack restaurant reservation system with table management, menu display, and customer reviews functionality.',
      image: '/api/placeholder/400/300',
      techStack: [
        { name: 'React', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
        { name: 'Express', color: 'text-gray-400', bgColor: 'bg-gray-500/20' },
        { name: 'PostgreSQL', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
        { name: 'Redux', color: 'text-purple-400', bgColor: 'bg-purple-500/20' }
      ],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Full Stack',
      featured: true
    },
    {
      id: '6',
      title: 'Freelance Client Site',
      description: 'Custom business website with CMS integration, SEO optimization, and mobile-first responsive design for local business.',
      image: '/api/placeholder/400/300',
      techStack: [
        { name: 'WordPress', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
        { name: 'PHP', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
        { name: 'CSS3', color: 'text-blue-300', bgColor: 'bg-blue-300/20' },
        { name: 'jQuery', color: 'text-blue-500', bgColor: 'bg-blue-600/20' }
      ],
      liveDemo: '#',
      sourceCode: '#',
      category: 'Freelance',
      featured: false
    }
  ];

  const filterTabs = [
    { name: 'All', icon: <Globe className="w-4 h-4" /> },
    { name: 'Web Apps', icon: <Monitor className="w-4 h-4" /> },
    { name: 'Full Stack', icon: <Server className="w-4 h-4" /> },
    { name: 'Internship', icon: <User className="w-4 h-4" /> },
    { name: 'Freelance', icon: <Rocket className="w-4 h-4" /> }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20 px-6 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(139, 92, 246, 0.15), 
                      rgba(236, 72, 153, 0.1), 
                      rgba(6, 182, 212, 0.1),
                      transparent 60%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
            My Projects 🚀
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of projects that showcase my passion for frontend, full-stack development, 
            and building creative web solutions that solve real-world problems.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            {[
              { number: '10+', label: 'Projects' },
              { number: '6', label: 'Tech Stacks' },
              { number: '2', label: 'Internships' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
            {filterTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveFilter(tab.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === tab.name
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-lg">
                  Featured
                </div>
              )}

              {/* Project Card */}
              <div className="relative h-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group-hover:bg-white/15">
                
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                
                <div className="relative z-10">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-800/50">
                    <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-cyan-900/20 flex items-center justify-center">
                      <Code className="w-16 h-16 text-gray-600" />
                    </div>
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`${tech.bgColor} ${tech.color} px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-white/10 hover:scale-105 transition-transform duration-200`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.liveDemo}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      
                      <a
                        href={project.sourceCode}
                        className="flex-1 flex items-center justify-center space-x-2 border border-purple-500 hover:border-purple-400 px-4 py-2 rounded-xl text-purple-400 hover:text-white hover:bg-purple-500/20 font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">
              Interested in collaborating? Let&apos;s build something amazing together!
            </span>
          </div>
        </div>

        {/* Floating Dev Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-purple-500/20 text-4xl animate-pulse">{'</>'}</div>
          <div className="absolute top-40 right-20 text-cyan-500/20 text-3xl animate-pulse delay-500">{'{ }'}</div>
          <div className="absolute bottom-40 left-20 text-pink-500/20 text-5xl animate-pulse delay-1000">{'<>'}</div>
          <div className="absolute bottom-20 right-10 text-blue-500/20 text-3xl animate-pulse delay-700">{'[]'}</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;